import { useState, useEffect, useCallback } from 'react';
import ServidorUdp de 'react-native-udp';

const PUERTO_UDP = 53317;
const DIRECCION_BROADCAST = '255.255.255.255';
const ALIAS_DISPOSITIVO = "Celular de Alumno"; 
const TIPO_DISPOSITIVO = "mobile";

export interface DispositivoRemoto {
  id: string;
  nombre: string;
  tipo: 'desktop' | 'mobile';
  ip: string;
}

export function useDescubrimientoDispositivos() {
  const [dispositivos, setDispositivos] = useState<DispositivoRemoto[]>([]);
  const [buscando, setBuscando] = useState(false);

  const iniciarEscaneoDeRed = useCallback(() => {
    setBuscando(true);
    setDispositivos([]); 

    const socket = ServidorUdp.createSocket({ type: 'udp4', reuseAddress: true });
    
    socket.bind(PUERTO_UDP, (error) => {
      if (error) console.error('Error al enlazar el socket UDP:', error);
    });

    socket.once('listening', () => {
      socket.setBroadcast(true);

      const paqueteDeBusqueda = JSON.stringify({
        evento: 'BUSCAR_DISPOSITIVOS',
        nombre: ALIAS_DISPOSITIVO,
        tipo: TIPO_DISPOSITIVO
      });

      socket.send(paqueteDeBusqueda, 0, paqueteDeBusqueda.length, PUERTO_UDP, DIRECCION_BROADCAST, (error) => {
        if (error) console.error('Error al enviar el broadcast:', error);
      });
    });

    socket.on('message', (mensaje, infoRemota) => {
      try {
        const datos = JSON.parse(mensaje.toString());
        
        if (datos.evento === 'RESPONDER_BUSQUEDA') {
          setDispositivos((listaPrevia) => {
            if (listaPrevia.some((disp) => disp.ip === infoRemota.address)) return listaPrevia;
            
            return [...listaPrevia, {
              id: infoRemota.address,
              nombre: datos.nombre,
              tipo: datos.tipo,
              ip: infoRemota.address
            }];
          });
        }
      } catch (error) {
        console.error('Error al procesar respuesta UDP:', error);
      }
    });

    setTimeout(() => {
      socket.close();
      setBuscando(false);
    }, 4000);

  }, []);

  return {
    dispositivos,
    buscando,
    iniciarEscaneoDeRed
  };
}