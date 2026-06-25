// Mobile/src/componentes/contenidos/TarjetaParaPrevisualizacionDeMedio.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  nombre: string;
  uriOmision?: string;
  esImagen: boolean;
  onQuitar: () => void;
}

export function TarjetaParaPrevisualizacionDeMedio({
  nombre,
  uriOmision,
  esImagen,
  onQuitar,
}: Props) {
  return (
    <View style={estilos.tarjeta}>
      {esImagen && uriOmision ? (
        <Image source={{ uri: uriOmision }} style={estilos.miniatura} />
      ) : (
        <View style={estilos.iconoDocumento}>
          <Text style={estilos.textoIcono}>📄</Text>
        </View>
      )}
      <Text numberOfLines={1} style={estilos.textoNombre}>
        {nombre}
      </Text>
      <TouchableOpacity onPress={onQuitar} style={estilos.botonQuitar}>
        <Text style={estilos.textoQuitar}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c22",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#252530",
  },
  miniatura: { width: 40, height: 40, borderRadius: 4, marginRight: 12 },
  iconoDocumento: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: "#22222b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textoIcono: { fontSize: 18 },
  textoNombre: { flex: 1, color: "#e4e4e7", fontSize: 13, fontWeight: "600" },
  botonQuitar: { padding: 6 },
  textoQuitar: { color: "#ef5350", fontSize: 14, fontWeight: "bold" },
});
