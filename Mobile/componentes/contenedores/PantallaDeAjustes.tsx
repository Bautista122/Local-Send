// componentes/contenedores/PantallaDeAjustes.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ControladorParaAjustes } from "../controladores/ControladorParaAjustes";
import { Colores, Tipografia } from "../contenidos/TokensDeDiseno";

export const PantallaDeAjustes = () => (
  <View style={estilos.pantalla}>
    <Text style={Tipografia.titulo}>Configuración del Dispositivo</Text>
    <Text style={estilos.subtitulo}>
      Personaliza cómo te ven otros nodos en la red.
    </Text>

    <View style={estilos.seccion}>
      <ControladorParaAjustes />
    </View>
  </View>
);

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colores.fondo, padding: 20 },
  subtitulo: { ...Tipografia.detalle, marginBottom: 20 },
  seccion: { backgroundColor: "#fff", padding: 15, borderRadius: 10 },
});
