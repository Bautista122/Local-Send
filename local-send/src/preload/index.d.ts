export interface InterfazApiElectron {
  pedirIp: () => Promise<string>
  onDispositivoDetectado: (callback: (datos: any) => void) => void
}
declare global {
  interface Window {
    api: InterfazApiElectron
  }
}
