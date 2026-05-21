import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import * as DocumentPicker from "expo-document-picker";

export function useEmisorDeArchivos() {
  const [estaConectadoWifi, setEstaConectadoWifi] = useState(false);
  const [nombreRed, setNombreRed] = useState("Desconocida");
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<{
    nombre: string;
    ruta: string | null;
  } | null>(null);

  useEffect(() => {
    // Validar el estado de la red Wi-Fi de forma constante
    const desuscribirNetInfo = NetInfo.addEventListener((estado) => {
      const esWifi = estado.type === "wifi" && estado.isConnected === true;
      setEstaConectadoWifi(esWifi);

      if (esWifi && estado.details && "ssid" in estado.details) {
        setNombreRed(estado.details.ssid || "Wi-Fi Local");
      } else {
        setNombreRed("Sin Wi-Fi");
      }
    });

    return () => desuscribirNetInfo();
  }, []);

  // Selector de archivos nativo
  const seleccionarArchivoNativo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
      });

      if (
        !resultado.canceled &&
        resultado.assets &&
        resultado.assets.length > 0
      ) {
        const recurso = resultado.assets[0];
        setArchivoSeleccionado({
          nombre: recurso.name,
          ruta: recurso.uri,
        });
      }
    } catch (error) {
      console.error("Error al seleccionar archivo:", error);
    }
  };

  return {
    estaConectadoWifi,
    nombreRed,
    archivoSeleccionado,
    seleccionarArchivoNativo,
  };
}
