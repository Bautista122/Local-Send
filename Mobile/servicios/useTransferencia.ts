// hooks/useTransferencia.ts
import { ServicioParaTareasEnSegundoPlano } from "../servicios/ServicioParaTareasEnSegundoPlano";

export const useTransferencia = () => {
  const enviarLote = async (archivos: any[]) => {
    // Regla 5: Nivel de Dominio/Acción
    await ServicioParaTareasEnSegundoPlano.iniciar("Transferencia múltiple");

    try {
      // Lógica de envío ya implementada anteriormente
    } finally {
      ServicioParaTareasEnSegundoPlano.detener();
    }
  };

  return { enviarLote };
};
