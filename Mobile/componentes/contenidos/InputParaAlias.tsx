// componentes/contenidos/InputParaAlias.tsx
import React from "react";
import { TextInput, View, Text } from "react-native";
import { Tipografia } from "./TokensDeDiseno";

interface Props {
  valor: string;
  alCambiar: (txt: string) => void;
}

export const InputParaAlias = ({ valor, alCambiar }: Props) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={Tipografia.detalle}>Alias del Dispositivo</Text>
    <TextInput
      value={valor}
      onChangeText={alCambiar}
      style={{ borderBottomWidth: 1, paddingVertical: 8, fontSize: 16 }}
      placeholder="Ej: Mi Android"
    />
  </View>
);
