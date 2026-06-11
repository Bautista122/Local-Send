import { app, BrowserWindow, ipcMain } from 'electron'
import * as net from 'net'
import * as dgram from 'dgram'
import * as http from 'http'
import * as path from 'path'
import { networkInterfaces } from 'os'

let ventanaPrincipal: BrowserWindow | null = null
let servidorTcp: net.Server | null = null
let clienteUdp: dgram.Socket | null = null
let servidorHttp: http.Server | null = null

const PUERTO_P2P = 53317
const PUERTO_HTTP = 53318

// Generamos el ID único de ESTA máquina para poder filtrarla
const MI_ID_UNICO = `pc-${process.platform}-${process.arch}`

function crearVentana(): void {
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
    inicializarServidorNativo()
    inicializarDescubrimientoUdp()
    inicializarApiHttp()
  })
}

function inicializarServidorNativo(): void {
  if (servidorTcp) servidorTcp.close()

  servidorTcp = net.createServer((socket) => {
    socket.on('data', (fragmento) => {
      console.log(`Recibidos ${fragmento.length} bytes TCP`)
    })
  })

  servidorTcp.on('listening', () => {
    if (ventanaPrincipal && !ventanaPrincipal.isDestroyed()) {
      ventanaPrincipal.webContents.send('estado-servidor', true)
    }
  })

  servidorTcp.on('error', () => {
    if (ventanaPrincipal && !ventanaPrincipal.isDestroyed()) {
      ventanaPrincipal.webContents.send('estado-servidor', false)
    }
  })

  servidorTcp.listen(PUERTO_P2P, '0.0.0.0')
}

function inicializarDescubrimientoUdp(): void {
  if (clienteUdp) clienteUdp.close()

  clienteUdp = dgram.createSocket('udp4')

  clienteUdp.on('message', (mensaje, infoRemota) => {
    try {
      const datos = JSON.parse(mensaje.toString())

      // 🛡️ FILTRO: Si el paquete tiene id, pero es el nuestro, lo ignoramos por completo
      if (datos.id && datos.id !== MI_ID_UNICO) {
        if (ventanaPrincipal && !ventanaPrincipal.isDestroyed()) {
          ventanaPrincipal.webContents.send('dispositivo-detectado', {
            id: datos.id,
            alias: datos.alias || 'Dispositivo Desconocido',
            tipo: datos.tipo || 'computadora',
            direccionIp: infoRemota.address
          })
        }
      }
    } catch (error) {
      // Ignorar paquetes ajenos
    }
  })

  clienteUdp.bind(PUERTO_P2P, () => {
    if (clienteUdp) clienteUdp.setBroadcast(true)
    setInterval(enviarAnuncioUdp, 4000)
  })
}

function enviarAnuncioUdp(): void {
  if (!clienteUdp) return

  const anuncio = JSON.stringify({
    id: MI_ID_UNICO, // Enviamos nuestro ID único
    alias: `PC de ${process.env.USER || 'Etec'}`,
    tipo: 'computadora'
  })

  const buffer = Buffer.from(anuncio)
  clienteUdp.send(buffer, 0, buffer.length, PUERTO_P2P, '255.255.255.255')
}

function inicializarApiHttp(): void {
  if (servidorHttp) servidorHttp.close()

  servidorHttp = http.createServer((req, res) => {
    if (req.url === '/ping') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })

      res.end(
        JSON.stringify({
          id: MI_ID_UNICO,
          alias: `PC de ${process.env.USER || 'Etec'}`,
          tipo: 'computadora'
        })
      )
    } else {
      res.writeHead(404)
      res.end()
    }
  })

  servidorHttp.listen(PUERTO_HTTP, '0.0.0.0')
}

app.whenReady().then(() => {
  crearVentana()
})

app.on('window-all-closed', () => {
  if (servidorTcp) servidorTcp.close()
  if (clienteUdp) clienteUdp.close()
  if (servidorHttp) servidorHttp.close()
  if (process.platform !== 'darwin') app.quit()
})
