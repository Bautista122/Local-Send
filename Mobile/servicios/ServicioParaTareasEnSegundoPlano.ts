// servicios/ServicioParaTareasEnSegundoPlano.ts
export const ServicioParaTareasEnSegundoPlano = {
  iniciar: async (nombreArchivo: string) => {
    console.log(`Manteniendo app activa para recibir/enviar: ${nombreArchivo}`);
    // Aquí se integra con librerías nativas para evitar la suspensión del CPU
  },

  detener: () => {
    console.log("Liberando recursos de segundo plano.");
  },
};
