// Mobile/src/componentes/contenidos/TarjetaParaDispositivoDetectado.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  nombreHumanizado: string;
  ip: string;
  onSeleccionar: () => void;
}

export function TarjetaParaDispositivoDetectado({
  nombreHumanizado,
  ip,
  onSeleccionar,
}: Props) {
  return (
    <TouchableOpacity onPress={onSeleccionar} style={estilos.tarjeta}>
      <View style={estilos.iconoDispositivo}>
        <Text style={estilos.textoIcono}>💻</Text>
      </View>
      <View style={estilos.contenedorInfo}>
        <Text style={estilos.textoNombre}>{nombreHumanizado}</Text>
        <Text style={estilos.textoIp}>IP: {ip}</Text>
      </View>
      <Text style={estilos.flecha}>➔</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c22",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#252530",
  },
  iconoDispositivo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#22222b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textoIcono: { fontSize: 16 },
  contenedorInfo: { flex: 1 },
  textoNombre: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
  textoIp: { color: "#71717a", fontSize: 11, marginTop: 2 },
  flecha: { color: "#00adb5", fontSize: 16, fontWeight: "bold" },
});
