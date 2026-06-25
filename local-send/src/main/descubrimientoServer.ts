// local-send/src/main/servicios/descubrimientoServer.ts
import dgram from 'dgram'

const PUERTO_UDP = 41234
const socketUdp = dgram.createSocket('udp4')

export function iniciarEscuchaDescubrimiento(onDispositivoEncontrado: (dispositivo: any) => void) {
  socketUdp.on('listening', () => {
    const address = socketUdp.address()
    console.log(`📡 Servidor UDP escuchando en ${address.address}:${address.port}`)
  })

  socketUdp.on('message', (msg, rinfo) => {
    try {
      // Parseamos el paquete de datos recibido del dispositivo móvil
      const datos = JSON.parse(msg.toString())

      if (datos.tipo === 'SOLICITUD_DESCUBRIMIENTO') {
        console.log(`📱 Dispositivo detectado: ${datos.nombre} en la IP ${rinfo.address}`)

        // Devolvemos los datos estructurados al frontend de Electron
        onDispositivoEncontrado({
          id: datos.id,
          nombre: datos.nombre,
          ip: rinfo.address // Usamos la IP real desde donde vino el paquete
        })
      }
    } catch (error) {
      console.error('⚠️ Error al procesar paquete UDP anónimo:', error)
    }
  })

  // Enlazamos el socket al puerto para empezar a escuchar en toda la red local
  socketUdp.bind(PUERTO_UDP)
}
