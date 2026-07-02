// hooks/useEstadoDeRed.ts
import { useState, useEffect } from "react";
import { ServicioParaEstadoDeRed } from "../servicios/ServicioParaEstadoDeRed";

export const useEstadoDeRed = () => {
  const [hayRedLocal, setHayRedLocal] = useState(true);

  useEffect(() => {
    // Regla 8: Estado local para prevenir intentos de envío sin red
    const interval = setInterval(async () => {
      const estado = await ServicioParaEstadoDeRed.verificarConectividadLocal();
      setHayRedLocal(estado);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { hayRedLocal };
};
