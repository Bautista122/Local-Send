import { useDescubrimiento } from '../../hooks/useDescubrimiento'
import { ContenedorDeListaDeDispositivos } from '../contenedores/ContenedorDeListaDeDispositivos'
import { IndicadorDeDisponibilidad } from '../contenidos/IndicadorDeDisponibilidad'

interface PropiedadesControladorDescubrimiento {
  onSeleccionarDestino: (id: string) => void
  idDispositivoSeleccionado: string | null
}

export function ControladorDeDescubrimiento({
  onSeleccionarDestino,
  idDispositivoSeleccionado
}: PropiedadesControladorDescubrimiento) {
  const { dispositivos, estaServidorActivo } = useDescubrimiento()

  return (
    <fieldset style={{ border: '1px solid #444', borderRadius: '8px', padding: '16px' }}>
      <legend style={{ color: '#aaa', padding: '0 8px' }}>Conectividad P2P</legend>
      <IndicadorDeDisponibilidad estaActivo={estaServidorActivo} />

      <ContenedorDeListaDeDispositivos
        dispositivos={dispositivos}
        renderizarAccionParaDispositivo={(id) => (
          <button
            onClick={() => onSeleccionarDestino(id)}
            style={{
              backgroundColor: idDispositivoSeleccionado === id ? '#4CAF50' : '#007acc',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {idDispositivoSeleccionado === id ? '✓ Seleccionado' : 'Seleccionar'}
          </button>
        )}
      />
    </fieldset>
  )
}
