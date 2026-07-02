// hooks/useTransferencia.ts
import { useState } from "react";
import { ServicioParaProtocolo } from "../servicios/ServicioParaProtocolo";

export const useTransferencia = () => {
  const [estado, setEstado] = useState<
    "IDLE" | "SOLICITANDO" | "ENVIANDO" | "ERROR"
  >("IDLE");

  const iniciarFlujoDeEnvio = async (ipDestino: string, archivo: any) => {
    setEstado("SOLICITANDO");

    const respuesta = await ServicioParaProtocolo.enviarPeticionDeArchivo(
      ipDestino,
      archivo,
    );

    if (respuesta === "ACEPTADO") {
      setEstado("ENVIANDO");
      // Aquí arrancaría el ServicioParaTransferencia.enviarArchivo(archivo)
    } else {
      setEstado("ERROR");
      alert("El destinatario rechazó el archivo");
    }
  };

  return { iniciarFlujoDeEnvio, estado };
};
