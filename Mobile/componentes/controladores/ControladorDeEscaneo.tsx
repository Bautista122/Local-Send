// Mobile/componentes/controladores/ControladorDeEscaneo.tsx
import React from "react";
import { View, Text } from "react-native";
import {
  useDescubrimientoDispositivos,
  DispositivoRemoto,
} from "../../hooks/useDescubrimientoDispositivos";
import { useTransferenciaArchivos } from "../../hooks/useTransferenciaArchivos";
import { ContenedorDeEscaneo } from "../contenedores/ContenedorDeEscaneo";

export function ControladorDeEscaneo() {
  const { dispositivos, buscando, iniciarEscaneoDeRed } =
    useDescubrimientoDispositivos();

  // Consumimos el estado y la función para transferir desde el nuevo hook
  const { enviarArchivoADispositivo, progreso, estado } =
    useTransferenciaArchivos();

  const handleConectarConDispositivo = (dispositivo: DispositivoRemoto) => {
    console.log(
      `[Controlador] Iniciando flujo de transferencia con: ${dispositivo.nombre} (${dispositivo.ip})`,
    );
    // Iniciamos la selección del archivo y posterior envío por sockets
    enviarArchivoADispositivo(dispositivo.ip);
  };

  return (
    <View style={{ flex: 1 }}>
      <ContenedorDeEscaneo
        dispositivos={dispositivos}
        buscando={buscando}
        onIniciarBusqueda={iniciarEscaneoDeRed}
        onSeleccionarDispositivo={handleConectarConDispositivo}
      />

      {/* 📊 Indicador visual de progreso en la UI Mobile según el manual de Clean Code */}
      {estado === "enviando" && (
        <View
          style={{
            padding: 15,
            backgroundColor: "#fff3cd",
            borderTopWidth: 1,
            borderColor: "#ffeeba",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#856404" }}>
            Enviando fragmentos de archivo... {progreso}%
          </Text>
        </View>
      )}

      {estado === "negociando" && (
        <View
          style={{
            padding: 15,
            backgroundColor: "#d1ecf1",
            borderTopWidth: 1,
            borderColor: "#bee5eb",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#0c5460" }}>
            Esperando confirmación del destinatario...
          </Text>
        </View>
      )}
    </View>
  );
}
