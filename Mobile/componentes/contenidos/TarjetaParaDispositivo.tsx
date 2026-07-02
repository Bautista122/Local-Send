import React, { memo } from "react";
import { TouchableOpacity, Text } from "react-native";

// Usamos memo para que el componente solo se re-renderice si cambian sus props [1]
export const TarjetaParaDispositivo = memo(
  ({ nombre, ip, alPresionar }: any) => (
    <TouchableOpacity onPress={alPresionar} style={{ padding: 15 }}>
      <Text>{nombre}</Text>
      <Text style={{ color: "gray" }}>{ip}</Text>
    </TouchableOpacity>
  ),
);
