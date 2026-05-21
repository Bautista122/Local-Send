import { contextBridge, ipcRenderer } from 'electron'

// Exponer métodos específicos al Renderer de forma segura
contextBridge.exposeInMainWorld('localSendAPI', {
  // Escuchar estado del servidor (Para el LED virtual)
  onServerStatus: (callback: (status: string) => void) =>
    ipcRenderer.on('server-status', (_, status) => callback(status)),

  // Escuchar cuando aparece un nuevo miembro en la red
  onDeviceDiscovered: (callback: (device: any) => void) =>
    ipcRenderer.on('device-discovered', (_, device) => callback(device)),

  // Canales para el Monitor de Transferencia
  onTransferProgress: (callback: (data: any) => void) =>
    ipcRenderer.on('transfer-started', (_, data) => callback(data)),

  onTransferFinished: (callback: (data: any) => void) =>
    ipcRenderer.on('transfer-finished', (_, data) => callback(data))
})
