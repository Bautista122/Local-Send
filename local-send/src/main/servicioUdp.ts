import * as dgram from 'dgram' 
import { BrowserWindow } from 'electron'

const PUERTO_UDP = 53317
const MI_ID_UNICO = `pc-${process.platform}-${process.arch}`
const ALIAS_PC = 'PC-Escritorio-Aula'
const TIPO_DISPOSITIVO = 'desktop'

let socketUdp: dgram.Socket | null = null

export function iniciarServidorUdp(ventanaPrincipal: BrowserWindow | null) {
  if (socketUdp) socketUdp.close()

  socketUdp = dgram.createSocket({ type: 'udp4', reuseAddr: true })

  socketUdp.on('listening', () => {
    const direccion = socketUdp!.address()
    console.log(`[UDP] Servidor escuchando en ${direccion.address}:${direccion.port}`)
  })

  socketUdp.on('message', (mensaje, infoRemota) => {
    try {
      const datos = JSON.parse(mensaje.toString())

      // 🛡️ FILTRO: Ignorar nuestros propios paquetes si rebotan en la red
      if (datos.id === MI_ID_UNICO) return

      // 🔄 CASO A: El celular u otra PC está buscando dispositivos activos
      if (datos.evento === 'BUSCAR_DISPOSITIVOS' || datos.event === 'DISCOVER') {
        console.log(`[UDP] Petición de escaneo recibida de ${infoRemota.address}`)

        const respuesta = Buffer.from(
          JSON.stringify({
            evento: 'RESPONDER_BUSQUEDA',
            id: MI_ID_UNICO,
            nombre: ALIAS_PC,
            tipo: TIPO_DISPOSITIVO
          })
        )

        // Respondemos directo (Unicast) al puerto e IP de origen
        socketUdp?.send(respuesta, 0, respuesta.length, infoRemota.port, infoRemota.address)
      }

      // 📥 CASO B: Recibimos una respuesta de búsqueda o un anuncio periódico
      if (datos.evento === 'RESPONDER_BUSQUEDA' || datos.id) {
        if (ventanaPrincipal && !ventanaPrincipal.isDestroyed()) {
          ventanaPrincipal.webContents.send('dispositivo-detectado', {
            id: datos.id || infoRemota.address,
            alias: datos.nombre || datos.alias || 'Dispositivo Desconocido',
            tipo: datos.tipo || 'computadora',
            direccionIp: infoRemota.address
          })
        }
      }
    } catch (error) {
      // Ignorar paquetes corruptos o ajenos
    }
  })

  socketUdp.bind(PUERTO_UDP, () => {
    if (socketUdp) {
      socketUdp.setBroadcast(true)
    }
    // Dejamos configurado el anuncio automático para que otras PCs nos vean
    setInterval(enviarAnuncioPeriodico, 4000)
  })
}

function enviarAnuncioPeriodico(): void {
  if (!socketUdp) return

  const anuncio = JSON.stringify({
    id: MI_ID_UNICO,
    alias: ALIAS_PC,
    tipo: TIPO_DISPOSITIVO
  })

  const buffer = Buffer.from(anuncio)
  socketUdp.send(buffer, 0, buffer.length, PUERTO_UDP, '255.255.255.255')
}

// Función limpia para cerrar el socket cuando la app termine
export function cerrarServidorUdp() {
  if (socketUdp) {
    socketUdp.close()
    socketUdp = null
  }
}
