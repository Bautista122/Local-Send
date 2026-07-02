// componentes/controladores/ControladorParaHistorial.tsx
import React from "react";
import { useHistorial } from "../../hooks/useHistorial";
import { ListaDeHistorial } from "../contenidos/ListaDeHistorial"; //no esta 

export const ControladorParaHistorial = () => {
  const { registros } = useHistorial();

  return <ListaDeHistorial registros={registros} />;
};
