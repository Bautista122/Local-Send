// componentes/contenidos/NotificacionParaUsuario.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  mensaje: string;
  tipo: "error" | "exito";
}

export const NotificacionParaUsuario = ({ mensaje, tipo }: Props) => (
  <View
    style={[estilos.banner, tipo === "error" ? estilos.error : estilos.exito]}
  >
    <Text style={estilos.texto}>{mensaje}</Text>
  </View>
);

const estilos = StyleSheet.create({
  banner: {
    padding: 10,
    position: "absolute",
    top: 50,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
  },
  error: { backgroundColor: "#FF3B30" },
  exito: { backgroundColor: "#4CD964" },
  texto: { color: "white", textAlign: "center", fontWeight: "bold" },
});
