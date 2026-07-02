import { app, BrowserWindow } from 'electron'
import { join } from 'node:path'
import { is } from '@electron-toolkit/utils'
import { iniciarServidorDescubrimiento } from './descubrimientoServer'
import { iniciarServidorTransferencia } from './transferenciaServer'
import { configuracion } from './persistencia'
import { iniciarMonitoreoRed } from './monitoreoRed'

function crearVentana(): void {
  const ventanaPrincipal = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Cargamos la UI de React
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    ventanaPrincipal.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    ventanaPrincipal.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ventanaPrincipal.on('ready-to-show', () => {
    ventanaPrincipal.show()
    const alias = configuracion.obtenerAlias()
    const ruta = configuracion.obtenerCarpetaDescargas()

    // Iniciamos servicios pasando la ventana para la comunicación IPC
    iniciarServidorDescubrimiento(ventanaPrincipal, alias)
    iniciarServidorTransferencia(ventanaPrincipal, ruta)
    iniciarMonitoreoRed(ventanaPrincipal)
  })
}

app.whenReady().then(crearVentana)
