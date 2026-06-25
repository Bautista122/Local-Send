// Mobile/componentes/controladores/ControladorDeEnvioMovil.tsx
import React, { useState } from "react";
import { Alert, Vibration } from "react-native";
import { ContenedorDePantallaDeEnvio } from "../contenedores/ContenedorDePantallaDeEnvio";
import { useDescubrimiento } from "../../hooks/useDescubrimiento";
import { useTransferencia } from "../../hooks/useTransferencia";

interface ArchivoSeleccionado {
  id: string;
  nombre: string;
  tamanio: string;
  uri?: string; // Añadidos opcionales para cumplir con la interfaz ArchivoLanzar
  esImagen?: boolean;
}

interface DispositivoRemoto {
  id: string;
  nombre: string;
  ip: string;
}

export function ControladorDeEnvioMovil() {
  const [miIp, setMiIp] = useState<string>("192.168.1.45");
  const [archivosAEnviar, setArchivosAEnviar] = useState<ArchivoSeleccionado[]>(
    [],
  );
  const [dispositivoSeleccionadoId, setDispositivoSeleccionadoId] = useState<
    string | null
  >(null);
  const [cantidadEnviados, setCantidadEnviados] = useState<number>(0);
  const [mostrarCartelExito, setMostrarCartelExito] = useState<boolean>(false);

  const { dispositivos, estaBuscando } = useDescubrimiento();
  const { enProgreso, progresoTransferencia, transferirArchivosPorBloques } =
    useTransferencia();

  const seleccionarDocumentoDelSistema = () => {
    setMostrarCartelExito(false);
    const numeroAleatorio = Math.floor(Math.random() * 100);
    const nuevoArchivo: ArchivoSeleccionado = {
      id: Math.random().toString(36).substring(7),
      nombre: `documento_catedra_tic_${numeroAleatorio}.pdf`,
      tamanio: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
      uri: "file://simulated_path/document.pdf",
      esImagen: false,
    };
    setArchivosAEnviar((prev) => [...prev, nuevoArchivo]);
  };

  const eliminarArchivoDeCola = (id: string) => {
    setArchivosAEnviar((prev) => prev.filter((item) => item.id !== id));
  };

  const alternarSeleccionDispositivo = (id: string) => {
    setMostrarCartelExito(false);
    setDispositivoSeleccionadoId((prevId) => (prevId === id ? null : id));
  };

  const iniciarVinculacionConDispositivo = () => {
    if (archivosAEnviar.length === 0) {
      Alert.alert(
        "⚠️ Operación inválida",
        "Cargá al menos un archivo antes de iniciar el envío.",
      );
      return;
    }

    const dispositivo = dispositivos.find(
      (d) => d.id === dispositivoSeleccionadoId,
    );
    if (!dispositivo) {
      Alert.alert(
        "⚠️ Operación inválida",
        "Por favor, selecciona un dispositivo de destino de la lista.",
      );
      return;
    }

    Alert.alert(
      "🔄 Petición de Conexión",
      `¿Deseas solicitar vinculación con "${dispositivo.nombre}" para transmitir tus archivos?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Conectar y Enviar",
          onPress: () => conectarYTransmitir(dispositivo),
        },
      ],
    );
  };

  const conectarYTransmitir = async (dispositivo: DispositivoRemoto) => {
    try {
      const respuesta = await fetch(`http://${dispositivo.ip}:4000/conectar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: "📱 Dispositivo Móvil Escolar" }),
      });

      const resultado = await respuesta.json();

      if (resultado.aceptado) {
        const totalAEnviar = archivosAEnviar.length;

        // Se castea como any temporalmente si persisten sutiles diferencias estructurales en tu hook local
        transferirArchivosPorBloques(
          archivosAEnviar as any,
          dispositivo.ip,
          () => {
            Vibration.vibrate(100);
            setCantidadEnviados(totalAEnviar);
            setMostrarCartelExito(true);
            setArchivosAEnviar([]);
            setDispositivoSeleccionadoId(null);
          },
        );
      }
    } catch (err) {
      Alert.alert(
        "⚠️ Error de Red",
        "No se pudo conectar con el servidor. Revisá que estén en la misma red Wi-Fi.",
      );
    }
  };

  return (
    <ContenedorDePantallaDeEnvio
      miIp={miIp}
      archivos={archivosAEnviar}
      dispositivos={dispositivos}
      dispositivoSeleccionadoId={dispositivoSeleccionadoId}
      buscando={estaBuscando || enProgreso}
      progreso={progresoTransferencia}
      transfiriendo={enProgreso}
      mostrarExito={mostrarCartelExito}
      cantidadEnviados={cantidadEnviados}
      onSeleccionarDocumento={seleccionarDocumentoDelSistema}
      onQuitarArchivo={eliminarArchivoDeCola}
      onAlternarDispositivo={alternarSeleccionDispositivo}
      onEnviarConfirmado={iniciarVinculacionConDispositivo}
    />
  );
}
