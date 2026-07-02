import React from 'react'
import { useDescubrimiento } from '../../hooks/useDescubrimiento'
import { ContenidoLedDeDisponibilidad } from '../contenidos/ContenidoLedDeDisponibilidad'

/**
 * Controlador que orquestra la lógica del estado del servidor.
 * Sigue la Regla 2: Separación por responsabilidad [5].
 */
export const ControladorBarraEstado: React.FC = () => {
  const { estaActivo } = useDescubrimiento()

  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
      <ContenidoLedDeDisponibilidad activo={estaActivo} />
    </div>
  )
}
