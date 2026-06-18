import { useState, useEffect, useCallback } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as Network from "expo-network";

export function useEmisorDeArchivos() {
  const [estaConectadoWifi, setEstaConectadoWifi] = useState<boolean>(false);
  const [nombreRed, setNombreRed] = useState<string>("Buscando Red...");
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<any>(null);

  // Chequear el estado del Wifi en el aula
  useEffect(() => {
    async function verificarRed() {
      const estado = await Network.getNetworkStateAsync();
      setEstaConectadoWifi(
        estado.type === Network.NetworkStateType.WIFI && estado.isConnected,
      );

      if (estado.type === Network.NetworkStateType.WIFI) {
        setNombreRed("Red Escolar Activa");
      } else {
        setNombreRed("Sin conexión Wi-Fi");
      }
    }
    verificarRed();
  }, []);

  // Función para abrir el selector de archivos nativo del celular
  const seleccionarArchivoNativo = useCallback(async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (
        !resultado.canceled &&
        resultado.assets &&
        resultado.assets.length > 0
      ) {
        setArchivoSeleccionado(resultado.assets[0]);
        console.log(
          "📌 Archivo seleccionado listo para enviar:",
          resultado.assets[0].name,
        );
      }
    } catch (error) {
      console.error("Error al seleccionar archivo:", error);
    }
  }, []);

  return {
    estaConectadoWifi,
    nombreRed,
    archivoSeleccionado,
    seleccionarArchivoNativo,
  };
}
