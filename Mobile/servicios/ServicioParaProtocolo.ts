// servicios/ServicioParaProtocolo.ts
import { MetadataArchivo } from "./ServicioParaTransferencia";

export type RespuestaTransferencia = "ACEPTADO" | "RECHAZADO" | "OCUPADO";

export const ServicioParaProtocolo = {
  // Regla 1: Prefijo (enviar) + Objetivo (PeticionDeArchivo)
  enviarPeticionDeArchivo: async (
    ipDestino: string,
    info: MetadataArchivo,
  ): Promise<RespuestaTransferencia> => {
    console.log(
      `Solicitando permiso a ${ipDestino} para enviar ${info.nombre}...`,
    );

    // Aquí se abre un socket TCP temporal para enviar el JSON de metadatos
    // y esperar la respuesta del receptor.

    return "ACEPTADO"; // Simulación de respuesta
  },
};
