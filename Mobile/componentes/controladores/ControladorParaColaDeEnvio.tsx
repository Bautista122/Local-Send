// componentes/controladores/ControladorParaColaDeEnvio.tsx
import React from "react";
import { View } from "react-native";
import { useCola } from "../../hooks/useCola";
import { ListaDeArchivosSeleccionados } from "../contenidos/ListaDeArchivosSeleccionados"; 
import { BotonBase } from "../contenidos/BotonBase";

export const ControladorParaColaDeEnvio = () => {
  const { cola, agregarALaCola, tamanioTotal } = useCola();

  const manejarSeleccionMultiple = async () => {
    // Aquí llamarías al ServicioParaArchivos.seleccionarMultiples()
    console.log("Seleccionando múltiples archivos...");
  };

  return (
    <View>
      <ListaDeArchivosSeleccionados items={cola} />
      {cola.length > 0 && (
        <BotonBase
          etiqueta={`Enviar ${cola.length} archivos (${(tamanioTotal / 1024 / 1024).toFixed(2)} MB)`}
          alPresionar={() =>
            console.log("Iniciando transferencia por lotes...")
          }
        />
      )}
      <BotonBase
        etiqueta="Añadir archivos"
        alPresionar={manejarSeleccionMultiple}
        variante="secundario"
      />
    </View>
  );
};
