// componentes/contenidos/IconoDeRadarAnimado.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Colores } from "./TokensDeDiseno";

export const IconoDeRadarAnimado = () => (
  <View style={estilos.circuloExterno}>
    <View style={estilos.circuloInterno} />
  </View>
);

const estilos = StyleSheet.create({
  circuloExterno: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colores.primario,
    justifyContent: "center",
    alignItems: "center",
  },
  circuloInterno: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colores.primario,
  },
});
