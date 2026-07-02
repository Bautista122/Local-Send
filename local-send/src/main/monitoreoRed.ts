import { powerMonitor, BrowserWindow } from 'electron'

/**
 * Vigila el estado de la conexión y energía para informar a la UI.
 * Requisito: "Retroalimentación de Errores".
 */
export function iniciarMonitoreoRed(ventana: BrowserWindow) {
  // Detectar cuando la computadora entra en suspensión o pierde red
  powerMonitor.on('suspend', () => {
    ventana.webContents.send('error-red', 'Conexión interrumpida por suspensión')
  })

  powerMonitor.on('resume', () => {
    ventana.webContents.send('estado-servidor', true)
  })
}
