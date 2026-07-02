// componentes/controladores/ControladorParaAjustes.tsx
import React, { useState } from "react";
import { useConfiguracionGlobal } from "../../hooks/useConfiguracionGlobal";
import { ServicioParaFeedback } from "../../servicios/ServicioParaFeedback";
import { InputParaAlias } from "../contenidos/InputParaAlias";
import { BotonBase } from "../contenidos/BotonBase";

export const ControladorParaAjustes = () => {
  const { config, setConfig } = useConfiguracionGlobal();
  const [nuevoAlias, setNuevoAlias] = useState(config.nombreDispositivo);

  const guardarCambios = () => {
    if (nuevoAlias.trim().length < 3) {
      return ServicioParaFeedback.mostrarError("El alias es muy corto");
    }
    // Actualizamos el estado global que consumen los servicios de red
    setConfig({ ...config, nombreDispositivo: nuevoAlias });
    ServicioParaFeedback.mostrarExito("Configuración guardada");
  };

  return (
    <>
      <InputParaAlias valor={nuevoAlias} alCambiar={setNuevoAlias} />
      <BotonBase etiqueta="Guardar Cambios" alPresionar={guardarCambios} />
    </>
  );
};
