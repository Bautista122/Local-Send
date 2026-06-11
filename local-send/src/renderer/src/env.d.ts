export interface InterfazApiElectron {
  onDispositivoDetectado: (callback: (dispositivo: any) => void) => void
  onEstadoServidor: (callback: (estado: boolean) => void) => void
  onProgresoTransferencia: (callback: (datos: any) => void) => void
  enviarArchivos: (idDispositivo: string, rutasDeArchivos: string[]) => void
}

declare global {
  interface Window {
    api: InterfazApiElectron
  }
}
