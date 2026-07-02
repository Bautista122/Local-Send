// componentes/contenedores/ContenedorDePantallaPrincipal.tsx
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { ControladorParaDescubrimiento } from "../controladores/ControladorParaDescubrimiento";
import { ControladorParaTransferencia } from "../controladores/ControladorParaTransferencia";

export const ContenedorDePantallaPrincipal = () => {
  return (
    <SafeAreaView style={estilos.contenedorSano}>
      <View style={estilos.seccionSuperior}>
        {/* Orquestamos los controladores que manejan la lógica */}
        <ControladorParaDescubrimiento />
      </View>
      <View style={estilos.seccionInferior}>
        <ControladorParaTransferencia />
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  contenedorSano: { flex: 1, backgroundColor: "#f5f5f5" },
  seccionSuperior: { flex: 2, padding: 20 },
  seccionInferior: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 20,
  },
});
