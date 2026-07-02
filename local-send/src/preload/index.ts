import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('apiRed', {
  alCambiarEstadoServidor: (callback: (activo: boolean) => void) =>
    ipcRenderer.on('estado-servidor', (_, valor) => callback(valor)),
  alDescubrirDispositivo: (callback: (datos: any) => void) =>
    ipcRenderer.on('nuevo-dispositivo', (_, datos) => callback(datos)),
  alActualizarProgreso: (callback: (datos: any) => void) =>
    ipcRenderer.on('progreso-transferencia', (_, datos) => callback(datos))
})
