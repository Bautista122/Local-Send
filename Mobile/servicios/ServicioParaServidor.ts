// servicios/ServicioParaServidor.ts
import { MetadataArchivo } from "./ServicioParaTransferencia";

export const ServicioParaServidor = {
  // Inicia el servidor TCP para recibir datos
  iniciarServidor: async (puerto: number) => {
    console.log(`Servidor escuchando en el puerto ${puerto}...`);
    // Lógica para aceptar conexiones entrantes
  },

  // Detiene el servidor cuando la app se cierra o se pausa
  detenerServidor: () => {
    console.log("Servidor detenido.");
  },
};
