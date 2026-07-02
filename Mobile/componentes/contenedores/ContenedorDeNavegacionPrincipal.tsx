import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ControladorParaRecepcion } from "../controladores/ControladorParaRecepcion";
import { Colores, Tipografia } from "../contenidos/TokensDeDiseno";

/**
 * PantallaDeRecepcion: Contenedor principal para el flujo de entrada.
 * Cumple Regla 2 (Contenedor) y Regla 1 (Nombres con significado).
 */
export const PantallaDeRecepcion = () => {
  return (
    <View style={estilos.contenedor}>
      <Text style={Tipografia.titulo}>Recibir Archivos</Text>
      <Text style={estilos.subtitulo}>
        Tu dispositivo es visible para otros en la red local.
      </Text>

      {/* Orquestamos la lógica a través del controlador correspondiente */}
      <View style={estilos.zonaAccion}>
        <ControladorParaRecepcion />
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: Colores.fondo,
    padding: 20,
    justifyContent: "center",
  },
  subtitulo: {
    ...Tipografia.detalle,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  zonaAccion: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
