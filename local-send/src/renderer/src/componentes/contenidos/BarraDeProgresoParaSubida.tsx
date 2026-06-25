// local-send/src/renderer/src/componentes/contenidos/BarraDeProgresoParaSubida.tsx
import React from 'react'

interface Props {
  progreso: number
}

export function BarraDeProgresoParaSubida({ progreso }: Props) {
  return (
    <div style={estilos.contenedorSeccion}>
      <div style={estilos.cabeceraBarra}>
        <span style={estilos.textoCarga}>Subiendo archivos...</span>
        <span style={estilos.textoPorcentaje}>{progreso}%</span>
      </div>
      <div style={estilos.contenedorBarra}>
        <div style={{ ...estilos.rellenoBarra, width: `${progreso}%` }}></div>
      </div>
    </div>
  )
}

const estilos: Record<string, React.CSSProperties> = {
  contenedorSeccion: {
    border: '1px solid #00adb5',
    borderRadius: '10px',
    padding: '18px',
    marginTop: '20px'
  },
  cabeceraBarra: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '12px'
  },
  textoCarga: { color: '#00adb5', fontWeight: 600 },
  textoPorcentaje: { color: '#00adb5', fontWeight: 'bold' },
  contenedorBarra: {
    width: '100%',
    height: '8px',
    backgroundColor: '#22222b',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  rellenoBarra: { height: '100%', backgroundColor: '#00adb5', transition: 'width 0.2s ease-out' }
}
