// componentes/controladores/ControladorParaRecepcionDeArchivo.tsx
import React from "react";
import { useRecepcion } from "../../hooks/useRecepcion";
import { TarjetaDeProgresoDeDescarga } from "../contenidos/TarjetaDeProgresoDeDescarga";

export const ControladorParaRecepcionDeArchivo = ({
  metadata,
  stream,
}: any) => {
  const { progresoRecibido } = useRecepcion();

  // Orquestamos la escritura al montar el componente o al recibir el stream
  React.useEffect(() => {
    // procesarTransferenciaEntrante(metadata, stream);
  }, []);

  return (
    <TarjetaDeProgresoDeDescarga
      nombre={metadata.nombre}
      bytesRecibidos={progresoRecibido}
      totalBytes={metadata.tamanio}
    />
  );
};
