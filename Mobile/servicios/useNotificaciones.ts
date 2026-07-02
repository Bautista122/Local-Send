// hooks/useNotificaciones.ts
import { useState, useCallback } from "react";
import { ServicioParaFeedback } from "../servicios/ServicioParaFeedback";

export const useNotificaciones = () => {
  const [ultimoMensaje, setUltimoMensaje] = useState<string | null>(null);

  const notificarError = useCallback((mensaje: string) => {
    setUltimoMensaje(mensaje);
    ServicioParaFeedback.mostrarError(mensaje);
  }, []);

  const notificarExito = useCallback((mensaje: string) => {
    ServicioParaFeedback.mostrarExito(mensaje);
  }, []);

  return { notificarError, notificarExito, ultimoMensaje };
};
