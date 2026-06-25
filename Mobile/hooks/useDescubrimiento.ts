// Mobile/hooks/useDescubrimiento.ts
import { useState, useEffect } from "react";
import Zeroconf from "react-native-zeroconf";

interface DispositivoRemoto {
  id: string;
  nombre: string;
  ip: string;
}

const zeroconf = new Zeroconf();

export function useDescubrimiento() {
  const [dispositivos, setDispositivos] = useState<DispositivoRemoto[]>([]);
  const [estaBuscando, setEstaBuscando] = useState<boolean>(false);

  const escanearRedLocal = async () => {
    zeroconf.on("resolved", (service) => {
      console.log("Found service:", service.name);
      console.log("IP addresses:", service.addresses);
      console.log("Port:", service.port);
      setDispositivos([
        ...dispositivos,
        {
          id: service.name,
          nombre: service.name,
          ip: service.addresses[0],
        },
      ]);
    });

    // Start scanning for HTTP services
    zeroconf.scan("http", "tcp", "local.");
    setEstaBuscando(true);
  };

  useEffect(() => {
    escanearRedLocal();
    return () => {
      setEstaBuscando(false);
      zeroconf.stop();
    };
  }, []);

  return {
    dispositivos,
    estaBuscando,
    reiniciarEscaneo: escanearRedLocal,
  };
}
