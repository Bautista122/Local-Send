// componentes/controladores/ControladorParaRecepcion.tsx
import React from "react";
import { useRecepcion } from "../../hooks/useRecepcion";
import { ModalParaAceptarArchivo } from "../contenidos/ModalParaAceptarArchivo";

export const ControladorParaRecepcion = () => {
  const { peticionEntrante, estaRecibiendo, aceptarTransferencia } =
    useRecepcion();

  // Si no hay peticiones, el controlador no renderiza nada visualmente
  if (!peticionEntrante) return null;

  return (
    <ModalParaAceptarArchivo
      nombreArchivo={peticionEntrante.nombre}
      tamanio={peticionEntrante.tamanio}
      alAceptar={aceptarTransferencia}
      estaProcesando={estaRecibiendo}
    />
  );
};
