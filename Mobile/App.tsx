import { SafeAreaView, StatusBar, Text, StyleSheet, View } from "react-native";
import { useEmisorDeArchivos } from "./hooks/useEmisorDeArchivos";
import { ContenedorDeEnvioDirecto } from "./componentes/contenedores/ContenedorDeEnvioDirecto";
import { BotonParaSeleccionarArchivo } from "./componentes/contenidos/BotonParaSeleccionarArchivo";
import { RadarDeEscaneoDispositivos } from "./componentes/contenidos/RadarDeEscaneoDispositivos";

export default function App() {
  const {
    estaConectadoWifi,
    nombreRed,
    archivoSeleccionado,
    seleccionarArchivoNativo,
  } = useEmisorDeArchivos();

  return (
    <SafeAreaView style={estilos.contenedorRaiz}>
      <StatusBar barStyle="light-content" />

      {/* Encabezado semántico de la aplicación móvil */}
      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>LocalSend Móvil</Text>
      </View>

      <ContenedorDeEnvioDirecto
        bloqueSeleccion={
          <BotonParaSeleccionarArchivo
            onPresionar={seleccionarArchivoNativo}
            nombreArchivoSeleccionado={archivoSeleccionado?.nombre}
          />
        }
        bloqueRadar={
          <RadarDeEscaneoDispositivos
            estaEscaneando={estaConectadoWifi}
            nombreRed={nombreRed}
          />
        }
        bloqueDispositivosDestino={
          !estaConectadoWifi ? (
            <Text style={estilos.textoAlerta}>
              ⚠️ Por favor, conéctate a una red Wi-Fi para transmitir archivos.
            </Text>
          ) : (
            <Text style={estilos.textoInformativo}>
              Buscando receptores activos en tu red...
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedorRaiz: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  encabezado: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  textoAlerta: {
    color: "#ef4444",
    textAlign: "center",
    fontWeight: "bold",
    padding: 16,
  },
  textoInformativo: {
    color: "#9ca3af",
    textAlign: "center",
    fontStyle: "italic",
    padding: 16,
  },
});
