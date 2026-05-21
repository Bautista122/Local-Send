import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

type PropsRadar = {
  estaEscaneando: boolean;
  nombreRed: string;
};

export function RadarDeEscaneoDispositivos({
  estaEscaneando,
  nombreRed,
}: PropsRadar) {
  return (
    <View style={estilos.contenedor}>
      {estaEscaneando ? (
        <>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={estilos.textoPrincipal}>
            Buscando dispositivos en la red...
          </Text>
          <Text style={estilos.textoSecundario}>Conectado a: {nombreRed}</Text>
        </>
      ) : (
        <Text style={estilos.textoPrincipal}>Escaneo detenido.</Text>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e1e24",
    borderRadius: 12,
    marginVertical: 16,
  },
  textoPrincipal: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  textoSecundario: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 4,
  },
});
