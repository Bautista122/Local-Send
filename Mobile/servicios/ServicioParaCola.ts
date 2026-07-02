// servicios/ServicioParaCola.ts
import { InfoArchivo } from "./ServicioParaArchivos";

// Regla 8: Tipado estricto para la cola [5]
export interface ItemCola {
  id: string;
  archivo: InfoArchivo;
  estado: "esperando" | "enviando" | "completado" | "error";
}

export const ServicioParaCola = {
  calcularTamanioTotal: (items: ItemCola[]): number => {
    return items.reduce((total, item) => total + item.archivo.tamanio, 0);
  },

  generarIdUnico: () => Math.random().toString(36).substr(2, 9),
};
