// hooks/useHistorial.ts
import { useState, useEffect } from "react";
import {
  ServicioParaPersistencia,
  RegistroTransferencia,
} from "../servicios/ServicioParaPersistencia";

export const useHistorial = () => {
  const [registros, setRegistros] = useState<RegistroTransferencia[]>([]);

  const cargarDatos = async () => {
    const datos = await ServicioParaPersistencia.obtenerHistorial();
    setRegistros(datos);
  };

  const agregarRegistro = async (nuevo: RegistroTransferencia) => {
    await ServicioParaPersistencia.guardarEnHistorial(nuevo);
    setRegistros((prev) => [nuevo, ...prev]);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return { registros, agregarRegistro };
};
