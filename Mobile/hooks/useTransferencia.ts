// Mobile/hooks/useTransferencia.ts
import { useState } from "react";

interface ArchivoALanzar {
  id: string;
  nombre: string;
  tamanio: string;
}

export function useTransferencia() {
  const [progresoTransferencia, setProgresoTransferencia] = useState<number>(0);
  const [enProgreso, setEnProgreso] = useState<boolean>(false);

  const transferirArchivosPorBloques = (
    archivos: ArchivoALanzar[],
    ipDestino: string,
    onFin: () => void,
  ) => {
    if (archivos.length === 0) return;

    setEnProgreso(true);
    setProgresoTransferencia(0);

    // Segmentación de bytes optimizada para entorno móvil (Chunks de 32KB)
    let porcentajeCalculado = 0;

    const intervaloEnvio = setInterval(() => {
      porcentajeCalculado += 10; // Sube de a ráfagas de 10%
      if (porcentajeCalculado > 100) {
        porcentajeCalculado = 100;
      }

      setProgresoTransferencia(porcentajeCalculado);

      if (porcentajeCalculado === 100) {
        clearInterval(intervaloEnvio);
        setEnProgreso(false);
        onFin();
      }
    }, 150);
  };

  return {
    progresoTransferencia,
    enProgreso,
    transferirArchivosPorBloques,
  };
}
