// componentes/contenidos/TokensDeDiseno.ts
export const Colores = {
  primario: "#007AFF",
  exito: "#4CD964",
  error: "#FF3B30",
  fondo: "#F2F2F7",
  texto: "#000000",
  textoSecundario: "#8E8E93",
};

export const Tipografia = {
  titulo: { fontSize: 20, fontWeight: "bold" as const },
  cuerpo: { fontSize: 16, fontWeight: "normal" as const },
  detalle: { fontSize: 12, color: Colores.textoSecundario },
};
