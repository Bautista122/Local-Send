// componentes/contenidos/TarjetaDeArchivoEnCola.tsx
import React from "react";
import { View, Text } from "react-native";
import { ItemCola } from "../../servicios/ServicioParaCola";
import { Tipografia } from "./TokensDeDiseno";

export const TarjetaDeArchivoEnCola = ({ item }: { item: ItemCola }) => (
  <View
    style={{
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <Text style={Tipografia.cuerpo}>{item.archivo.nombre}</Text>
    <Text style={Tipografia.detalle}>
      {item.estado === "completado" ? "✅" : "⏳"}
    </Text>
  </View>
);
