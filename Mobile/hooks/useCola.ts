// hooks/useCola.ts
import { useState } from "react";
import { ItemCola, ServicioParaCola } from "../servicios/ServicioParaCola";
import { InfoArchivo } from "../servicios/ServicioParaArchivos";

export const useCola = () => {
  const [cola, setCola] = useState<ItemCola[]>([]);

  const agregarALaCola = (archivos: InfoArchivo[]) => {
    const nuevosItems: ItemCola[] = archivos.map((a) => ({
      id: ServicioParaCola.generarIdUnico(),
      archivo: a,
      estado: "esperando",
    }));
    setCola((prev) => [...prev, ...nuevosItems]);
  };

  const limpiarCola = () => setCola([]);

  return {
    cola,
    agregarALaCola,
    limpiarCola,
    tamanioTotal: ServicioParaCola.calcularTamanioTotal(cola),
  };
};
