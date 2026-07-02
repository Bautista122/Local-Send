// componentes/contenidos/BotonBase.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// Regla 8: Tipado de props para prevenir errores
interface Props {
  etiqueta: string;
  alPresionar: () => void;
  variante?: "primario" | "secundario";
}

export const BotonBase = ({
  etiqueta,
  alPresionar,
  variante = "primario",
}: Props) => (
  <TouchableOpacity
    onPress={alPresionar}
    style={[
      estilos.boton,
      variante === "primario" ? estilos.primario : estilos.secundario,
    ]}
  >
    <Text style={estilos.texto}>{etiqueta}</Text>
  </TouchableOpacity>
);

const estilos = StyleSheet.create({
  boton: { padding: 12, borderRadius: 8, alignItems: "center" },
  primario: { backgroundColor: "#007AFF" },
  secundario: { backgroundColor: "#5856D6" },
  texto: { color: "#fff", fontWeight: "600" },
});
