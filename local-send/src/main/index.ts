import { app, BrowserWindow, ipcMain } from 'electron'
import * as net from 'net'
import * as dgram from 'dgram'
import * as http from 'http'
import * as path from 'path'
import * as fs from 'fs'

let ventanaPrincipal: BrowserWindow | null = null
let servidorTcp: net.Server | null = null
let socketUdp: dgram.Socket | null = null
let servidorHttp: http.Server | null = null

// Variables para la gestión de la transferencia de archivos
const PUERTO_P2P = 53317
const PUERTO_HTTP = 53318
let nombreArchivoEnProgreso = ''
let descriptorEscrituraStream: fs.WriteStream | null = null

// 🛡️ Declaración de constantes de identidad global
const MI_ID_UNICO = `pc-${process.platform}-${process.arch}`
const ALIAS_PC = `PC de ${process.env.USER || 'Estudiante'}`
const TIPO_DISPOSITIVO = 'desktop'

function crearVentanaPrincipal(): void {
  ventanaPrincipal = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    ventanaPrincipal.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    ventanaPrincipal.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  ventanaPrincipal.webContents.on('did-finish-load', () => {
    inicializarServidorTcpNativo()
    inicializarDescubrimientoUdp()
    inicializarApiHttp()
  })
}

function inicializarServidorTcpNativo(): void {
  if (servidorTcp) servidorTcp.close()

  servidorTcp = net.createServer((socket) => {
    console.log('[TCP] Conexión entrante para transferencia de datos.')

    socket.on('data', (fragmento) => {
      if (!descriptorEscrituraStream) {
        const carpetaDescargas = path.join(app.getPath('home'), 'Downloads')
        const nombreFinal = nombreArchivoEnProgreso || 'archivo_recibido.bin'
        const rutaCompleta = path.join(carpetaDescargas, nombreFinal)

        console.log(`[TCP] Escribiendo stream de datos en: ${rutaCompleta}`)
        descriptorEscrituraStream = fs.createWriteStream(rutaCompleta)
      }

      const bufferCorrecto = descriptorEscrituraStream.write(fragmento)

      if (!bufferCorrecto) {
        socket.pause()
        descriptorEscrituraStream.once('drain', () => {
          socket.resume()
        })
      }

      if (ventanaPrincipal && !ventanaPrincipal.isDestroyed()) {
        ventanaPrincipal.webContents.send('bytes-recibidos', fragmento.length)
      }
    })

    socket.on('end', () => {
      console.log('[TCP] Fin del canal de datos. Archivo guardado correctamente.')
      
      if (descriptorEscrituraStream) {
        descriptorEscrituraStream.end()
        descriptorEscrituraStream = null
      }
      
      nombreArchivoEnProgreso = ''
      
      if (ventanaPrincipal && !ventanaPrincipal.isDestroyed()) {
        ventanaPrincipal.webContents.send('transferencia-completada', true)
      }
    })

    socket.on('error', (error) => {
      console.error('[TCP] Error en el socket de transferencia:', error)
      if (descriptorEscrituraStream) {
        descriptorEscrituraStream.end()
        descriptorEscrituraStream = null
      }
    })
  })

  servidorTcp.on('listening', () => {
    if (ventanaPrincipal && !ventanaPrincipal.isDestroyed()) {
      ventanaPrincipal.webContents.send('estado-servidor', true)
    }
  })

  servidorTcp.listen(PUERTO_P2P, '0.0.0.0')
}

function inicializarDescubrimientoUdp(): void {
  if (socketUdp) socketUdp.close()

  socketUdp = dgram.createSocket({ type: 'udp4', reuseAddr: true })

  socketUdp.on('message', (mensaje, infoRemota) => {
    try {
      const datos = JSON.parse(mensaje.toString())

      if (datos.id === MI_ID_UNICO) return

      if (datos.evento === 'BUSCAR_DISPOSITIVOS' || datos.event === 'DISCOVER') {
        const respuesta = Buffer.from(JSON.stringify({
          evento: 'RESPONDER_BUSQUEDA',
          id: MI_ID_UNICO,
          nombre: ALIAS_PC,
          tipo: TIPO_DISPOSITIVO
        }))

        socketUdp?.send(respuesta, 0, respuesta.length, infoRemota.port, infoRemota.address)
      }

      if (datos.evento === 'RESPONDER_BUSQUEDA' || datos.id) {
        if (ventanaPrincipal && !ventanaPrincipal.isDestroyed()) {
          ventanaPrincipal.webContents.send('dispositivo-detectado', {
            id: datos.id || infoRemota.address,
            alias: datos.nombre || datos.alias || 'Dispositivo Desconocido',
            tipo: datos.tipo || 'computadora',
            direccionIp: infoRemota.address
          })
        }
      }
    } catch (error) {
      // Ignorar paquetes corruptos
    }
  })

  socketUdp.bind(PUERTO_P2P, () => {
    if (socketUdp) {
      socketUdp.setBroadcast(true)
    }
    setInterval(enviarAnuncioPeriodicoUdp, 4000)
  })
}

function enviarAnuncioPeriodicoUdp(): void {
  if (!socketUdp) return

  const anuncio = JSON.stringify({
    id: MI_ID_UNICO,
    alias: ALIAS_PC,
    tipo: TIPO_DISPOSITIVO
  })

  const buffer = Buffer.from(anuncio)
  socketUdp.send(buffer, 0, buffer.length, PUERTO_P2P, '255.255.255.255')
}

function inicializarApiHttp(): void {
  if (servidorHttp) servidorHttp.close()

  servidorHttp = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }

    if (req.url === '/ping' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          id: MI_ID_UNICO,
          alias: ALIAS_PC,
          tipo: TIPO_DISPOSITIVO
        })
      )
      return
    }

    if (req.url === '/transferencia' && req.method === 'POST') {
      let cuerpo = ''
      
      req.on('data', (chunk) => {
        cuerpo += chunk.toString()
      })

      req.on('end', () => {
        try {
          const metadatosDelArchivo = JSON.parse(cuerpo)
          console.log('[HTTP] Petición de transferencia recibida:', metadatosDelArchivo)

          nombreArchivoEnProgreso = metadatosDelArchivo.nombre || metadatosDelArchivo.name

          if (ventanaPrincipal && !ventanaPrincipal.isDestroyed()) {
            ventanaPrincipal.webContents.send('peticion-transferencia', metadatosDelArchivo)
          }

          ipcMain.once('respuesta-usuario-transferencia', (_evento, respuesta: boolean) => {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ aceptado: respuesta }))
          })

        } catch (error) {
          res.writeHead(400)
          res.end(JSON.stringify({ error: 'JSON inválido' }))
        }
      })
      return
    }

    res.writeHead(404)
    res.end()
  })

  servidorHttp.listen(PUERTO_HTTP, '0.0.0.0')
}

// Inicialización limpia de los eventos del ciclo de vida de Electron
app.whenReady().then(() => {
  crearVentanaPrincipal()
})

app.on('window-all-closed', () => {
  if (servidorTcp) servidorTcp.close()
  if (socketUdp) socketUdp.close()
  if (servidorHttp) servidorHttp.close()
  if (process.platform !== 'darwin') app.quit()
})