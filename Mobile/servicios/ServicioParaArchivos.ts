// servicios/ServicioParaArchivos.ts
export interface InfoArchivo {
  nombre: string;
  uri: string;
  tamanio: number;
}

export const ServicioParaArchivos = {
  seleccionarArchivo: async (): Promise<InfoArchivo | null> => {
    // Aquí integrarías una librería como expo-document-picker
    console.log("Abriendo selector nativo...");
    return {
      nombre: "foto_vacaciones.jpg",
      uri: "file:///storage/emulated/0/Download/foto.jpg",
      tamanio: 2048576, // en bytes
    };
  },
};
