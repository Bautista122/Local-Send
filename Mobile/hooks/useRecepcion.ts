// Mobile/hooks/useRecepcion.ts
import { useState } from "react";

export const useRecepcion = () => {
  // Estado para la petición de archivo que llega por el socket
  const [peticionEntrante, setPeticionEntrante] = useState<any | null>(null);
  const [estaRecibiendo, setEstaRecibiendo] = useState(false);

  const aceptarTransferencia = async () => {
    setEstaRecibiendo(true);
    // Aquí iría la lógica para responder al socket TCP que aceptamos
    console.log("Transferencia aceptada");
  };

  const procesarTransferenciaEntrante = async (metadata: any, stream: any) => {
    // Esta es la función que ya tenías y que detecta el error
    setPeticionEntrante(metadata);
  };

  return {
    peticionEntrante,
    estaRecibiendo,
    aceptarTransferencia,
    procesarTransferenciaEntrante,
  };
};
