// componentes/contenidos/ListaDeDispositivosDisponibles.tsx
import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { TarjetaParaDispositivo } from "./TarjetaParaDispositivo"; // Nuestra molécula

interface Props {
  dispositivos: any[];
  cargando: boolean;
}

export const ListaDeDispositivosDisponibles = ({
  dispositivos,
  cargando,
}: Props) => {
  if (cargando) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <FlatList
      data={dispositivos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TarjetaParaDispositivo nombre={item.nombre} ip={item.ip} />
      )}
      ListEmptyComponent={<Text>No se encontraron dispositivos cercanos.</Text>}
    />
  );
};
