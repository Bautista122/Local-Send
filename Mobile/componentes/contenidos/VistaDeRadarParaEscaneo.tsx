// Mobile/src/componentes/contenidos/VistaDeRadarParaEscaneo.tsx
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export function VistaDeRadarParaEscaneo() {
  return (
    <View style={estilos.contenedorRadar}>
      <View style={estilos.circuloExterior}>
        <ActivityIndicator size="large" color="#00adb5" />
      </View>
      <Text style={estilos.textoEscaneo}>
        Buscando receptores en la red local Wi-Fi...
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorRadar: {
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    marginVertical: 10,
  },
  circuloExterior: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#16161a",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#00adb5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  textoEscaneo: {
    color: "#71717a",
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
});
