import { ReactNode } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

type PropsContenedor = {
  bloqueSeleccion: ReactNode;
  bloqueRadar: ReactNode;
  bloqueDispositivosDestino: ReactNode;
};

export function ContenedorDeEnvioDirecto({
  bloqueSeleccion,
  bloqueRadar,
  bloqueDispositivosDestino,
}: PropsContenedor) {
  return (
    <ScrollView
      style={estilos.pantalla}
      contentContainerStyle={estilos.contenido}
    >
      <View style={estilos.seccion}>{bloqueSeleccion}</View>
      <View style={estilos.seccion}>{bloqueRadar}</View>
      <View style={estilos.seccion}>{bloqueDispositivosDestino}</View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  contenido: {
    padding: 20,
  },
  seccion: {
    marginBottom: 20,
  },
});
