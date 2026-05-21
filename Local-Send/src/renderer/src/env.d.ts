interface Window {
  localSendAPI: {
    onServerStatus: (callback: (status: string) => void) => void
    onDeviceDiscovered: (callback: (device: any) => void) => void
    onTransferProgress: (callback: (data: any) => void) => void
    onTransferFinished: (callback: (data: any) => void) => void
  }
}
