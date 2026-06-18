import React from "react";
import { Button } from "react-native";

type Props = {
  onClick: () => void;
  estaCargando: boolean;
};

export function BotonParaEscanearRed({ onClick, estaCargando }: Props) {
  return (
    <Button
      title={estaCargando ? "Buscando dispositivos..." : "Escanear Red Local"}
      onPress={onClick}
      disabled={estaCargando}
    />
  );
}
