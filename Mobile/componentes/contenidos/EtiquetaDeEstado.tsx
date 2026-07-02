// componentes/contenidos/EtiquetaDeEstado.tsx
import React from "react";
import { Text } from "react-native";
import { Tipografia, Colores } from "./TokensDeDiseno";

interface Props {
  texto: string;
  esError?: boolean;
}

// Átomo puro de presentación (Regla 2 y 5)
export const EtiquetaDeEstado = ({ texto, esError }: Props) => (
  <Text
    style={[
      Tipografia.detalle,
      { color: esError ? Colores.error : Colores.exito },
    ]}
  >
    {texto}
  </Text>
);
