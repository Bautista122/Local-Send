import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    // Definimos nuestra API personalizada para que TypeScript la reconozca
    apiRed: {
      alCambiarEstadoServidor: (callback: (estaActivo: boolean) => void) => void
      alDescubrirDispositivo: (callback: (dispositivo: any) => void) => void
      alActualizarProgreso: (callback: (datos: any) => void) => void
    }
  }
}
