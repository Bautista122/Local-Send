// Mobile/componentes/contenedores/ContenedorDePantallaDeEnvio.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { VistaDeRadarParaEscaneo } from "../contenidos/VistaDeRadarParaEscaneo";

interface ArchivoSeleccionado {
  id: string;
  nombre: string;
  tamanio: string;
}
interface DispositivoRemoto {
  id: string;
  nombre: string;
  ip: string;
}

interface Props {
  miIp: string;
  archivos: ArchivoSeleccionado[];
  dispositivos: DispositivoRemoto[];
  dispositivoSeleccionadoId: string | null;
  buscando: boolean;
  progreso: number;
  transfiriendo: boolean;
  mostrarExito: boolean;
  cantidadEnviados: number;
  onSeleccionarDocumento: () => void;
  onQuitarArchivo: (id: string) => void;
  onAlternarDispositivo: (id: string) => void;
  onEnviarConfirmado: () => void;
}

export function ContenedorDePantallaDeEnvio({
  miIp,
  archivos,
  dispositivos,
  dispositivoSeleccionadoId,
  buscando,
  progreso,
  transfiriendo,
  mostrarExito,
  cantidadEnviados,
  onSeleccionarDocumento,
  onQuitarArchivo,
  onAlternarDispositivo,
  onEnviarConfirmado,
}: Props) {
  return (
    <View style={estilos.pantalla}>
      <View style={estilos.cabecera}>
        <View style={estilos.filaTitulo}>
          <Text style={estilos.tituloApp}>
            LocalSend <Text style={estilos.badge}>Mobile</Text>
          </Text>
          <View style={estilos.bloqueIp}>
            <Text style={estilos.textoIpPropia}>{miIp}</Text>
          </View>
        </View>
        <Text style={estilos.subtitulo}>
          Módulo Emisor de Archivos en Red Local
        </Text>
      </View>

      <ScrollView contentContainerStyle={estilos.scrollArea}>
        {/* 📦 SECCIÓN ARCHIVOS */}
        <View style={estilos.cajaSeccion}>
          <View style={estilos.encabezadoSeccion}>
            <Text style={estilos.tituloSeccion}>Archivos para Enviar</Text>
            <TouchableOpacity
              onPress={onSeleccionarDocumento}
              style={estilos.botonAnadir}
            >
              <Text style={estilos.textoBotonAnadir}>➕ Añadir</Text>
            </TouchableOpacity>
          </View>

          {archivos.length === 0 ? (
            <Text style={estilos.textoVacio}>
              No hay archivos cargados para la transmisión.
            </Text>
          ) : (
            archivos.map((arc) => (
              <View key={arc.id} style={estilos.filaItem}>
                <View style={estilos.contenedorInfoArchivo}>
                  <Text numberOfLines={1} style={estilos.nombreTexto}>
                    {arc.nombre}
                  </Text>
                  <Text style={estilos.metaTexto}>{arc.tamanio}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => onQuitarArchivo(arc.id)}
                  style={estilos.botonEliminar}
                >
                  <Text style={estilos.textoEliminar}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* 💻 SECCIÓN DISPOSITIVOS CON SELECCIÓN/DESELECCIÓN */}
        <View style={[estilos.cajaSeccion, { marginTop: 16 }]}>
          <Text style={estilos.tituloSeccion}>
            Dispositivos en Espera (Toca para seleccionar/deseleccionar)
          </Text>

          {buscando && !transfiriendo && <VistaDeRadarParaEscaneo />}

          {dispositivos.length === 0 && !buscando ? (
            <Text style={estilos.textoVacio}>
              Ningún dispositivo disponible en la red.
            </Text>
          ) : (
            dispositivos.map((disp) => {
              const esSeleccionado = disp.id === dispositivoSeleccionadoId;
              return (
                <TouchableOpacity
                  key={disp.id}
                  onPress={() => onAlternarDispositivo(disp.id)}
                  style={[
                    estilos.tarjetaDispositivo,
                    esSeleccionado && estilos.tarjetaDispositivoSeleccionado,
                  ]}
                >
                  <View style={estilos.iconoDispositivo}>
                    <Text style={estilos.textoIcono}>
                      {esSeleccionado ? "✅" : "💻"}
                    </Text>
                  </View>
                  <View style={estilos.contenedorInfo}>
                    <Text style={estilos.textoNombre}>{disp.nombre}</Text>
                    <Text style={estilos.textoIp}>IP Destino: {disp.ip}</Text>
                  </View>
                  {esSeleccionado && (
                    <Text style={estilos.badgeSeleccionado}>Seleccionado</Text>
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* 🚀 BOTÓN DE ACCIÓN CENTRALIZADO */}
        {dispositivoSeleccionadoId && archivos.length > 0 && !transfiriendo && (
          <TouchableOpacity
            onPress={onEnviarConfirmado}
            style={estilos.botonEnviarAccion}
          >
            <Text style={estilos.textoBotonEnviarAccion}>
              Solicitar Conexión y Enviar
            </Text>
          </TouchableOpacity>
        )}

        {/* ⏳ BARRA DE PROGRESO */}
        {transfiriendo && (
          <View style={estilos.contenedorSeccionProgreso}>
            <View style={estilos.cabeceraBarra}>
              <Text style={estilos.textoCarga}>Subiendo archivos...</Text>
              <Text style={estilos.textoPorcentaje}>{progreso}%</Text>
            </View>
            <View style={estilos.contenedorBarra}>
              <View style={[estilos.rellenoBarra, { width: `${progreso}%` }]} />
            </View>
          </View>
        )}

        {/* 🚀 CARTEL DE ÉXITO */}
        {mostrarExito && (
          <View style={estilos.cajaExito}>
            <Text style={estilos.textoExito}>
              🚀 Transmisión completada: Los archivos se enviaron correctamente
              ({cantidadEnviados} en total).
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: "#111112", paddingTop: 50 },
  cabecera: { paddingHorizontal: 20, marginBottom: 15 },
  filaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tituloApp: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },
  badge: { fontSize: 11, color: "#00adb5", fontWeight: "bold" },
  bloqueIp: {
    backgroundColor: "#16161a",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#23232a",
  },
  textoIpPropia: {
    color: "#00adb5",
    fontFamily: "monospace",
    fontSize: 12,
    fontWeight: "bold",
  },
  subtitulo: { color: "#71717a", fontSize: 12, marginTop: 2 },
  scrollArea: { paddingHorizontal: 16, paddingBottom: 30 },
  cajaSeccion: {
    backgroundColor: "#16161a",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#23232a",
  },
  encabezadoSeccion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tituloSeccion: { color: "#e4e4e7", fontSize: 13, fontWeight: "700" },
  botonAnadir: {
    backgroundColor: "#22222b",
    borderWidth: 1,
    borderColor: "#2d2d38",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotonAnadir: { color: "#00adb5", fontSize: 12, fontWeight: "600" },
  textoVacio: {
    color: "#55555a",
    fontSize: 11,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
  },

  // Archivos
  filaItem: {
    flexDirection: "row",
    backgroundColor: "#1c1c22",
    borderColor: "#252530",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  contenedorInfoArchivo: { flex: 1, marginRight: 10 },
  nombreTexto: { fontSize: 13, fontWeight: "600", color: "#e4e4e7" },
  metaTexto: { fontSize: 11, color: "#71717a", marginTop: 2 },
  botonEliminar: { padding: 4 },
  textoEliminar: { fontSize: 14 },

  // Tarjetas de Dispositivos con estados reactivos
  tarjetaDispositivo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c22",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#252530",
  },
  tarjetaDispositivoSeleccionado: {
    borderColor: "#00adb5",
    backgroundColor: "#132224",
  },
  iconoDispositivo: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#22222b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textoIcono: { fontSize: 15 },
  contenedorInfo: { flex: 1 },
  textoNombre: { color: "#ffffff", fontSize: 13, fontWeight: "bold" },
  textoIp: { color: "#71717a", fontSize: 11, marginTop: 2 },
  badgeSeleccionado: { color: "#00adb5", fontSize: 11, fontWeight: "bold" },

  // Botón enviar flotante dentro del scroll
  botonEnviarAccion: {
    backgroundColor: "#00adb5",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
  },
  textoBotonEnviarAccion: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Carga y Éxito
  contenedorSeccionProgreso: {
    borderColor: "#00adb5",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  cabeceraBarra: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  textoCarga: { color: "#00adb5", fontSize: 12, fontWeight: "600" },
  textoPorcentaje: { color: "#00adb5", fontSize: 12, fontWeight: "bold" },
  contenedorBarra: {
    width: "100%",
    height: 6,
    backgroundColor: "#22222b",
    borderRadius: 3,
    overflow: "hidden",
  },
  rellenoBarra: { height: "100%", backgroundColor: "#00adb5" },
  cajaExito: {
    marginTop: 20,
    borderColor: "#2e7d32",
    borderWidth: 1,
    backgroundColor: "#122214",
    borderRadius: 10,
    padding: 14,
  },
  textoExito: {
    fontSize: 12,
    fontWeight: "600",
    color: "#81c784",
    textAlign: "center",
  },
});
