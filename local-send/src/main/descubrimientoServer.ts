import { BrowserWindow } from 'electron'
import dgram from 'node:dgram'

/**
 * Inicia el servidor UDP para el descubrimiento de dispositivos.
 * Sigue la Regla 1: Nombres con significado y en español.
 */
export function iniciarServidorDescubrimiento(ventana: BrowserWindow, _alias: string): void {
  const servidorUdp = dgram.createSocket('udp4')

  servidorUdp.on('listening', () => {
    // Notificamos a la UI que el servidor está activo para que el LED cambie a verde
    ventana.webContents.send('estado-servidor', true)
    console.log('Servidor UDP escuchando en 0.0.0.0:42420')
  })

  servidorUdp.on('message', (_mensaje, infoRemota) => {
    ventana.webContents.send('nuevo-dispositivo', {
      ip: infoRemota.address,
      alias: 'Dispositivo detectado'
    })
  })

  servidorUdp.bind(42420)
}
