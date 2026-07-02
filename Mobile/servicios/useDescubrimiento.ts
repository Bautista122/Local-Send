// hooks/useDescubrimiento.ts
import { useState, useEffect } from 'react';
import { ServicioParaDescubrimiento } from '../servicios/ServicioParaDescubrimiento';

export const useDescubrimiento = (nombrePropio: string) => {
  const [dispositivos, setDispositivos] = useState<any[]>([]);
  const PUERTO_UDP = 53317;

  const iniciarEscaneo = () => {
    // 1. Anunciamos que estamos conectados
    ServicioParaDescubrimiento.enviarAnuncioDePresencia(nombrePropio, PUERTO_UDP);
    
    // 2. Escuchamos quién más responde
    const limpiarEscucha = ServicioParaDescubrimiento.escucharNuevosDispositivos(
      PUERTO_UDP, 
      (nuevo) => {
        setDispositivos(prev => {
          // Evitamos duplicados por IP
          if (prev.find(d => d.ip === nuevo.ip)) return prev;
          return [...prev, nuevo];
        });
      }
    );

    return limpiarEscucha;
  };

  return { dispositivos, iniciarEscaneo };
};