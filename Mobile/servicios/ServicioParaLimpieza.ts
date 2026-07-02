// servicios/ServicioParaLimpieza.ts
export const ServicioParaLimpieza = {
  // Regla 1: Nombre con intención clara
  borrarArchivosIncompletos: async (ruta: string) => {
    console.log(`Eliminando archivo corrupto en: ${ruta}`);
    // Lógica para borrar archivos parciales del FileSystem
  },
};
