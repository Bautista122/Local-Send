import { useState } from 'react'
import { useTransferencia } from '../../hooks/useTransferencia'
import { ContenedorDeZonaArrastrable } from '../contenedores/ContenedorDeZonaArrastrable'
import { ControladorDeDescubrimiento } from './ControladorDeDescubrimiento'
import { BarraDeProgresoDeTransferencia } from '../contenidos/BarraDeProgresoDeTransferencia'

export function ControladorDeTransferencia() {
  const [idDispositivoDestino, setIdDispositivoDestino] = useState<string | null>(null)
  const { transferencia, enviarArchivosADispositivo } = useTransferencia()

  const manejarArchivosCargados = (rutasDeArchivos: string[]) => {
    if (!idDispositivoDestino) {
      alert('Por favor, selecciona primero un dispositivo de la lista para enviarle el archivo.')
      return
    }
    enviarArchivosADispositivo(idDispositivoDestino, rutasDeArchivos)
  }

  return (
    <ContenedorDeZonaArrastrable onArchivosSoltados={manejarArchivosCargados}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ControladorDeDescubrimiento
          onSeleccionarDestino={setIdDispositivoDestino}
          idDispositivoSeleccionado={idDispositivoDestino}
        />

        {transferencia.enProgreso && (
          <BarraDeProgresoDeTransferencia
            nombreArchivo={transferencia.nombreArchivo}
            progreso={transferencia.progreso}
            velocidad={transferencia.velocidad}
            tiempoEstimado={transferencia.tiempoEstimado}
          />
        )}

        {!transferencia.enProgreso && idDispositivoDestino && (
          <p style={{ color: '#007acc', textAlign: 'center', marginTop: '10px' }}>
            💡 Arrastra y suelta cualquier archivo aquí en la ventana para iniciar el envío.
          </p>
        )}
      </div>
    </ContenedorDeZonaArrastrable>
  )
}
