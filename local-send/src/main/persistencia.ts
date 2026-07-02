import { app } from 'electron'
import Store from 'electron-store'

// Blindaje técnico para evitar errores de constructor en Vite
const StoreConstructor = (Store as any).default || Store
const almacen = new StoreConstructor()

export const configuracion = {
  obtenerAlias: (): string => almacen.get('aliasDispositivo', 'Nuevo Dispositivo') as string,
  guardarAlias: (nuevoAlias: string): void => almacen.set('aliasDispositivo', nuevoAlias),
  obtenerCarpetaDescargas: (): string =>
    almacen.get('rutaDescargas', app.getPath('downloads')) as string,
  guardarCarpetaDescargas: (nuevaRuta: string): void => almacen.set('rutaDescargas', nuevaRuta)
}
