import { BrowserWindow } from 'electron'
import net from 'node:net'

/**
 * Inicia el servidor TCP para transferencia de archivos.
 * Se antepone '_' a las variables no usadas para cumplir con la Regla 8.
 */
export function iniciarServidorTransferencia(
  _ventana: BrowserWindow,
  _rutaDescargas: string
): void {
  const servidorTcp = net.createServer((_socket) => {
    // Lógica futura de recepción de archivos
    console.log('Nueva conexión de transferencia detectada')
  })

  servidorTcp.listen(42421)
}
