// componentes/contenidos/TarjetaDeRegistro.tsx
import React from "react";
import { View, Text } from "react-native";
import { RegistroTransferencia } from "../../servicios/ServicioParaPersistencia";

// Regla 8: Props tipadas [5]
export const TarjetaDeRegistro = ({
  registro,
}: {
  registro: RegistroTransferencia;
}) => (
  <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: "#ccc" }}>
    <Text style={{ fontWeight: "bold" }}>{registro.nombreArchivo}</Text>
    <Text
      style={{
        fontSize: 12,
        color: registro.tipo === "enviado" ? "blue" : "green",
      }}
    >
      {registro.tipo.toUpperCase()} - {registro.fecha}
    </Text>
  </View>
);
