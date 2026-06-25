import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  pedirIp: () => ipcRenderer.invoke('obtener-ip'),
  onDispositivoDetectado: (cb: any) => ipcRenderer.on('dispositivo-detectado', (_, d) => cb(d))
})
