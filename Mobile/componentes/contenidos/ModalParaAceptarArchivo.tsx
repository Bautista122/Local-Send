// componentes/contenidos/ModalParaAceptarArchivo.tsx
import React from "react";
import { View, Text, Modal, Button } from "react-native";

interface Props {
  nombreArchivo: string;
  tamanio: number;
  alAceptar: () => void;
  estaProcesando: boolean;
}

export const ModalParaAceptarArchivo = ({
  nombreArchivo,
  tamanio,
  alAceptar,
  estaProcesando,
}: Props) => (
  <Modal visible={true} transparent={true}>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
      }}
    >
      <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
        <Text style={{ fontWeight: "bold" }}>¿Recibir archivo?</Text>
        <Text>
          {nombreArchivo} ({Math.round(tamanio / 1024)} KB)
        </Text>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Button
            title="Aceptar"
            onPress={alAceptar}
            disabled={estaProcesando}
          />
          <Button title="Rechazar" color="red" onPress={() => {}} />
        </View>
      </View>
    </View>
  </Modal>
);
