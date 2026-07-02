import React from "react";
import { FlatList, View, Text } from "react-native";
import { TarjetaDeArchivoEnCola } from "./TarjetaDeArchivoEnCola";
import { ItemCola } from "./../../servicios/ServicioParaCola";
import { Tipografia } from "./TokensDeDiseno";

interface Props {
  items: ItemCola[];
}

/**
 * Componente de Contenido: Presentación pura de la lista.
 * Cumple Regla 2 (Contenido) y Regla 1 (Prefijo + Objetivo).
 */
export const ListaDeArchivosSeleccionados = ({ items }: Props) => {
  return (
    <View style={{ flex: 1, marginVertical: 10 }}>
      <Text style={[Tipografia.detalle, { marginBottom: 10 }]}>
        Archivos en cola ({items.length})
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TarjetaDeArchivoEnCola item={item} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#999" }}>
            No hay archivos seleccionados
          </Text>
        }
      />
    </View>
  );
};
