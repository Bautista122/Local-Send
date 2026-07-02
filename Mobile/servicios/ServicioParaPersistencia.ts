// servicios/ServicioParaPersistencia.ts
// Regla 8: Tipado de la entidad de historial [5]
export interface RegistroTransferencia {
  id: string;
  nombreArchivo: string;
  fecha: string;
  tipo: "enviado" | "recibido";
  estado: "completado" | "fallido";
}

export const ServicioParaPersistencia = {
  guardarEnHistorial: async (registro: RegistroTransferencia) => {
    // Aquí iría la lógica para persistir el dato en el disco del celular
    console.log("Guardando registro:", registro);
  },

  obtenerHistorial: async (): Promise<RegistroTransferencia[]> => {
    // Simulación de carga de datos persistidos
    return [];
  },
};
