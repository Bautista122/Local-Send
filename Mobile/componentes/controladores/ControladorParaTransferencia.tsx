// componentes/controladores/ControladorParaTransferencia.tsx
import React from "react";
import { useEstadoDeRed } from "../../hooks/useEstadoDeRed";
import { EtiquetaDeEstado } from "../contenidos/EtiquetaDeEstado";

export const ControladorParaTransferencia = () => {
  const { hayRedLocal } = useEstadoDeRed();

  // Regla 8: Prevención de errores antes de permitir la acción
  if (!hayRedLocal) {
    return (
      <EtiquetaDeEstado
        texto="Conéctate a una red Wi-Fi para enviar"
        esError={true}
      />
    );
  }

  return (
    // ... Resto de la lógica de envío de archivos ...
    <></>
  );
};
