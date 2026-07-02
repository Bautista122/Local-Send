// Mobile/servicios/ServicioParaDescubrimiento.ts
import dgram from "react-native-udp";

// Regla 8: Exportamos la interfaz para que el hook la reconozca [1]
export interface NodoRed {
  alias: string;
  ip: string;
  puerto: number;
}

const PUERTO_UDP = 53317;

export const ServicioParaDescubrimiento = {
  // Regla 1: Nombre con prefijo (anunciar) + objetivo (Presencia)
  anunciarPresencia: async (nombreDispositivo: string) => {
    // Corrección para react-native-udp@4.1.7: Usar objeto en lugar de string
    const socket = dgram.createSocket({ type: "udp4", reusePort: true });

    const mensaje = JSON.stringify({
      alias: nombreDispositivo,
      puerto: PUERTO_UDP,
      tipo: "ANUNCIO_LOCALSEND",
    });

    socket.bind(PUERTO_UDP);
    socket.once("listening", () => {
      socket.setBroadcast(true);
      socket.send(
        mensaje,
        0,
        mensaje.length,
        PUERTO_UDP,
        "255.255.255.255",
        (err) => {
          if (err) console.error("Error en broadcast:", err);
          socket.close();
        },
      );
    });
  },

  escucharNodos: (alRecibir: (nodo: NodoRed) => void) => {
    const cliente = dgram.createSocket({ type: "udp4", reusePort: true });

    cliente.bind(PUERTO_UDP);
    cliente.on("message", (msg, rinfo) => {
      try {
        const datos = JSON.parse(msg.toString());
        // Normalizamos los datos para que coincidan con la interfaz NodoRed
        alRecibir({
          alias: datos.alias,
          ip: rinfo.address,
          puerto: datos.puerto,
        });
      } catch (e) {
        console.error("Error al parsear mensaje UDP", e);
      }
    });

    return () => cliente.close(); // Función de limpieza para el useEffect
  },
};
