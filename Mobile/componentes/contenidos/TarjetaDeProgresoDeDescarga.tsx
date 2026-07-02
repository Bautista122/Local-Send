// componentes/contenidos/TarjetaDeProgresoDeDescarga.tsx
import React from "react";
import { View, Text } from "react-native";

export const TarjetaDeProgresoDeDescarga = ({
  nombre,
  bytesRecibidos,
  totalBytes,
}: any) => {
  const porcentaje = Math.round((bytesRecibidos / totalBytes) * 100);

  return (
    <View style={{ padding: 15, backgroundColor: "#fff", borderRadius: 10 }}>
      <Text style={{ fontWeight: "bold" }}>Recibiendo: {nombre}</Text>
      <View style={{ height: 5, backgroundColor: "#eee", marginTop: 10 }}>
        <View
          style={{
            width: `${porcentaje}%`,
            height: "100%",
            backgroundColor: "#4CD964",
          }}
        />
      </View>
      <Text style={{ fontSize: 12 }}>{porcentaje}% completado</Text>
    </View>
  );
};
