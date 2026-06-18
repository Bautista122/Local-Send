import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { DispositivoRemoto } from "../../hooks/useDescubrimientoDispositivos";
import { TarjetaParaDispositivoRemoto } from "../contenidos/TarjetaParaDispositivoRemoto";
import { BotonParaEscanearRed } from "../contenidos/BotonParaEscanearRed";

type Props = {
  dispositivos: DispositivoRemoto[];
  buscando: boolean;
  onIniciarBusqueda: () => void;
  onSeleccionarDispositivo: (dispositivo: DispositivoRemoto) => void;
};

export function ContenedorDeEscaneo({
  dispositivos,
  buscando,
  onIniciarBusqueda,
  onSeleccionarDispositivo,
}: Props) {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Radar LocalSend (P2P)
      </Text>

      <BotonParaEscanearRed
        onClick={onIniciarBusqueda}
        estaCargando={buscando}
      />

      {buscando && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginVertical: 20 }}
        />
      )}

      <FlatList
        data={dispositivos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaParaDispositivoRemoto
            dispositivo={item}
            onSeleccionar={onSeleccionarDispositivo}
          />
        )}
        ListEmptyComponent={
          !buscando ? (
            <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
              No se detectaron computadoras ni teléfonos activos.
            </Text>
          ) : null
        }
      />
    </View>
  );
}
