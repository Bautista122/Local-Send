// componentes/contenedores/PantallaDeEnvio.tsx
import React from "react";
import { View, ScrollView } from "react-native";
import { ControladorParaDescubrimiento } from "../controladores/ControladorParaDescubrimiento";
import { ControladorParaTransferencia } from "../controladores/ControladorParaTransferencia";
import { Colores } from "../contenidos/TokensDeDiseno";

export const PantallaDeEnvio = () => (
  <ScrollView style={{ flex: 1, backgroundColor: Colores.fondo }}>
    <View style={{ padding: 20 }}>
      {/* Sección de búsqueda de nodos */}
      <ControladorParaDescubrimiento />

      {/* Sección de acción de envío */}
      <View style={{ marginTop: 30 }}>
        <ControladorParaTransferencia />
      </View>
    </View>
  </ScrollView>
);
