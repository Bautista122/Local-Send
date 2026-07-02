// Mobile/hooks/useDescubrimiento.ts
import { useState, useEffect } from "react";
import {
  ServicioParaDescubrimiento,
  NodoRed,
} from "../servicios/ServicioParaDescubrimiento";

export const useDescubrimiento = (nombrePropio: string) => {
  // Regla 8: Tipado del estado usando la interfaz exportada [1]
  const [dispositivos, setDispositivos] = useState<NodoRed[]>([]);
  const [estaEscaneando, setEstaEscaneando] = useState(false);

  const iniciarBusqueda = async () => {
    setEstaEscaneando(true);

    // 1. Enviamos nuestro anuncio a la red
    await ServicioParaDescubrimiento.anunciarPresencia(nombrePropio);

    // 2. Escuchamos a otros dispositivos
    const detenerEscucha = ServicioParaDescubrimiento.escucharNodos(
      (nuevoNodo) => {
        setDispositivos((prev) => {
          // Evitamos duplicar dispositivos por IP
          const existe = prev.find((d) => d.ip === nuevoNodo.ip);
          if (existe) return prev;
          return [...prev, nuevoNodo];
        });
      },
    );

    return detenerEscucha;
  };

  // Regla 3: El hook gestiona el ciclo de vida [4]
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    iniciarBusqueda().then((detener) => {
      cleanup = detener;
    });

    return () => {
      if (cleanup) cleanup();
      setEstaEscaneando(false);
    };
  }, []);

  return { dispositivos, estaEscaneando, iniciarBusqueda };
};
