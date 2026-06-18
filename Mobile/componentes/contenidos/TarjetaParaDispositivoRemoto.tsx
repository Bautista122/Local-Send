import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DispositivoRemoto } from "../../hooks/useDescubrimientoDispositivos";

type Props = {
  dispositivo: DispositivoRemoto;
  onSeleccionar: (dispositivo: DispositivoRemoto) => void;
};

export function TarjetaParaDispositivoRemoto({
  dispositivo,
  onSeleccionar,
}: Props) {
  const colorFondo = dispositivo.tipo === "desktop" ? "#e1f5fe" : "#e8f5e9";

  return (
    <TouchableOpacity
      onPress={() => onSeleccionar(dispositivo)}
      style={{
        padding: 15,
        backgroundColor: colorFondo,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        {dispositivo.nombre}
      </Text>
      <Text style={{ fontSize: 12, color: "#666" }}>
        Tipo: {dispositivo.tipo === "desktop" ? "Computadora" : "Celular"} | IP:{" "}
        {dispositivo.ip}
      </Text>
    </TouchableOpacity>
  );
}
