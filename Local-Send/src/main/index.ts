import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import dgram from 'node:dgram'
import net from 'node:net'
import fs from 'node:fs'

// --- CONFIGURACIÓN E INICIALIZACIÓN ---
const UDP_PORT = 53317
const TCP_PORT = 8080 // Puerto asignado para transferencias pesadas
let downloadFolder = app.getPath('downloads') // Carpeta por defecto usando paths agnósticos
let deviceAlias = 'Desktop Node'

// Instancia de la ventana para enviar eventos al Renderer
let mainWindow: BrowserWindow | null = null

// 1. INICIALIZAR SERVIDOR UDP (Service Discovery)
function startUdpServer() {
  const udpServer = dgram.createSocket({ type: 'udp4', reuseAddr: true })

  udpServer.on('listening', () => {
    udpServer.setBroadcast(true)
    console.log(`[UDP] Servidor activo en puerto ${UDP_PORT}`)
    // Notificar a la UI que el servidor está online (LED Verde)
    mainWindow?.webContents.send('server-status', 'online')
  })

  udpServer.on('message', (msg, rinfo) => {
    try {
      const data = JSON.parse(msg.toString())
      // Enviamos el dispositivo descubierto directamente al Renderer para la lista dinámica
      mainWindow?.webContents.send('device-discovered', {
        id: rinfo.address,
        alias: data.alias || 'Dispositivo Desconocido',
        ip: rinfo.address,
        deviceType: data.deviceType || 'mobile'
      })
    } catch (e) {
      // Ignorar paquetes que no coincidan con nuestro formato JSON
    }
  })

  udpServer.on('error', (err) => {
    console.error(`[UDP] Error: ${err.message}`)
    mainWindow?.webContents.send('server-status', 'offline')
  })

  udpServer.bind(UDP_PORT)
}

// 2. INICIALIZAR SERVIDOR TCP (Manejo de Streams No Bloqueantes)
function startTcpServer() {
  const tcpServer = net.createServer((socket) => {
    console.log('[TCP] Conexión entrante para transferencia...')

    // NOTA: El nombre real del archivo vendrá previamente negociado por WebSockets/IPC.
    // Usamos de ejemplo un nombre genérico gestionando separadores con path.join (Agnosticismo de rutas)
    const targetPath = path.join(downloadFolder, 'archivo_recibido.tmp')

    // Implementación de escritura en Stream No Bloqueante
    const writeStream = fs.createWriteStream(targetPath)

    socket.pipe(writeStream)

    writeStream.on('open', () => {
      mainWindow?.webContents.send('transfer-started', { speed: 0, progress: 0 })
    })

    writeStream.on('finish', () => {
      console.log(`[FS] Archivo guardado con éxito en: ${targetPath}`)
      mainWindow?.webContents.send('transfer-finished', { success: true, path: targetPath })
      socket.end()
    })

    socket.on('error', (err) => {
      console.error('[TCP] Error durante el streaming:', err)
      mainWindow?.webContents.send('transfer-error', err.message)
    })
  })

  tcpServer.listen(TCP_PORT, '0.0.0.0', () => {
    console.log(`[TCP] Servidor de transferencia escuchando en el puerto ${TCP_PORT}`)
  })
}
