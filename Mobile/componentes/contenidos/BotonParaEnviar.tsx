// componentes/contenidos/BotonParaEnviar.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const BotonParaEnviar = ({ alPresionar, deshabilitado }: any) => (
  <TouchableOpacity
    onPress={alPresionar}
    disabled={deshabilitado}
    style={{
      backgroundColor: deshabilitado ? "#ccc" : "#007AFF",
      padding: 15,
      borderRadius: 10,
    }}
  >
    <Text style={{ color: "white", textAlign: "center" }}>
      Enviar al Dispositivo
    </Text>
  </TouchableOpacity>
);
