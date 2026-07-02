// servicios/ServicioParaEstadoDeRed.ts
export const ServicioParaEstadoDeRed = {
  // Regla 2: Responsabilidad única de red
  verificarConectividadLocal: async (): Promise<boolean> => {
    console.log("Monitoreando estado del Wi-Fi...");
    // Aquí integrarías una librería como NetInfo para saber si hay red local
    return true;
  },
};
