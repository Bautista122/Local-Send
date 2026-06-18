// Mobile/App.tsx
import { SafeAreaView, StatusBar, Text, StyleSheet, View } from "react-native";
import { useEmisorDeArchivos } from "./hooks/useEmisorDeArchivos"; // Ahora sí va a existir!
import { ContenedorDeEnvioDirecto } from "./componentes/contenedores/ContenedorDeEscaneo";
import { BotonParaSeleccionarArchivo } from "./componentes/contenidos/BotonParaSeleccionarArchivo";
import { RadarDeEscaneoDispositivos } from "./componentes/contenidos/BotonParaEscanearRed";

export default function App() {
  const {
    estaConectadoWifi,
    nombreRed,
    archivoSeleccionado,
    seleccionarArchivoNativo, // Macheamos el nombre exacto acá
  } = useEmisorDeArchivos();

  return (
    <SafeAreaView style={estilos.contenedorRaiz}>
      <StatusBar barStyle="light-content" />
      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>LocalSend Móvil</Text>
        <Text style={{ color: "#aaa" }}>Red: {nombreRed}</Text>
      </View>

      {/* Tu layout de botones y radar sigue acá abajo igual... */}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedorRaiz: { flex: 1, backgroundColor: "#121212" },
  encabezado: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#fff" },
});
