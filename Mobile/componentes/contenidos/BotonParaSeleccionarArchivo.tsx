// componentes/contenidos/BotonParaSeleccionarArchivo.tsx
import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface Props {
  alPresionar: () => void;
  estaCargando: boolean;
  textoProgreso: string;
}

export const BotonParaSeleccionarArchivo = ({
  alPresionar,
  estaCargando,
  textoProgreso,
}: Props) => (
  <TouchableOpacity
    onPress={alPresionar}
    disabled={estaCargando}
    style={{
      backgroundColor: "#007AFF",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    }}
  >
    {estaCargando ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={{ color: "#fff", fontWeight: "bold" }}>{textoProgreso}</Text>
    )}
  </TouchableOpacity>
);
