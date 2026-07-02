// Mobile/componentes/controladores/ControladorParaDescubrimiento.tsx
import React, { useEffect } from "react";
import { View } from "react-native";
import { useDescubrimiento } from "../../hooks/useDescubrimiento";
import { IconoDeRadarAnimado } from "../contenidos/IconoDeRadarAnimado";
import { ListaDeDispositivosDisponibles } from "../contenidos/ListaDeDispositivosDisponibles";

export const ControladorParaDescubrimiento = () => {
  // 1. Extraemos 'estaEscaneando' del hook (Regla 3)
  const { dispositivos, estaEscaneando, iniciarBusqueda } =
    useDescubrimiento("Mi Celular");

  useEffect(() => {
    let detenerFuncion: (() => void) | undefined;

    const ejecutarBusqueda = async () => {
      detenerFuncion = await iniciarBusqueda();
    };

    ejecutarBusqueda();

    return () => {
      if (detenerFuncion) detenerFuncion();
    };
  }, []);

  return (
    <View>
      <IconoDeRadarAnimado />

      {/* 2. PASAR LA PROP FALTANTE: 
          Asignamos 'estaEscaneando' a la propiedad 'cargando' que pide el componente */}
      <ListaDeDispositivosDisponibles
        dispositivos={dispositivos}
        cargando={estaEscaneando}
      />
    </View>
  );
};
