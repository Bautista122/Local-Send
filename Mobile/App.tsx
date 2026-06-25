// Mobile/App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { ControladorDeEnvioMovil } from "./componentes/controladores/ControladorDeEnvioMovil";

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#111112" }}>
      <StatusBar style="light" />
      <ControladorDeEnvioMovil />
    </View>
  );
}
