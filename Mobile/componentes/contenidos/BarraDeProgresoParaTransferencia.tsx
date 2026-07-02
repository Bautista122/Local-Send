// componentes/contenidos/BarraDeProgresoParaTransferencia.tsx
import React from "react";
import { View, Text } from "react-native";

interface Props {
  porcentaje: number;
}

export const BarraDeProgresoParaTransferencia = ({ porcentaje }: Props) => (
  <View style={{ marginTop: 10 }}>
    <View style={{ height: 8, backgroundColor: "#E0E0E0", borderRadius: 4 }}>
      <View
        style={{
          width: `${porcentaje}%`,
          height: "100%",
          backgroundColor: "#007AFF",
          borderRadius: 4,
        }}
      />
    </View>
    <Text style={{ fontSize: 12, textAlign: "center" }}>
      {porcentaje}% enviado
    </Text>
  </View>
);
