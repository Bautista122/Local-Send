import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  onDispositivoDetectado: (callback) =>
    ipcRenderer.on('dispositivo-detectado', (_evento, datos) => callback(datos)),

  onEstadoServidor: (callback) =>
    ipcRenderer.on('estado-servidor', (_evento, estado) => callback(estado)),

  onProgresoTransferencia: (callback) =>
    ipcRenderer.on('progreso-transferencia', (_evento, datos) => callback(datos)),

  enviarArchivos: (idDispositivo, rutasDeArchivos) =>
    ipcRenderer.send('enviar-archivos', { idDispositivo, rutasDeArchivos })
})
