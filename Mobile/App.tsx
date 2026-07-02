// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ProveedorDeConfiguracion } from "./hooks/useConfiguracionGlobal";
import { PantallaDeRecepcion } from "./componentes/contenedores/ContenedorDeNavegacionPrincipal";

export default function App() {
  return (
    // Regla 8: El estado global envuelve a toda la app
    <ProveedorDeConfiguracion>
      <NavigationContainer>
        <PantallaDeRecepcion />
      </NavigationContainer>
    </ProveedorDeConfiguracion>
  );
}
