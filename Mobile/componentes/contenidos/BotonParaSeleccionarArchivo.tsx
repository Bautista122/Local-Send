import { TouchableOpacity, Text, StyleSheet } from "react-native";

type PropsBoton = {
  onPresionar: () => void;
  nombreArchivoSeleccionado?: string;
};

export function BotonParaSeleccionarArchivo({
  onPresionar,
  nombreArchivoSeleccionado,
}: PropsBoton) {
  return (
    <TouchableOpacity style={estilos.boton} onPress={onPresionar}>
      <Text style={estilos.textoBoton}>
        {nombreArchivoSeleccionado
          ? `📄 ${nombreArchivoSeleccionado}`
          : "📁 Seleccionar Archivo"}
      </Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  boton: {
    backgroundColor: "#312e81",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4338ca",
  },
  textoBoton: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
