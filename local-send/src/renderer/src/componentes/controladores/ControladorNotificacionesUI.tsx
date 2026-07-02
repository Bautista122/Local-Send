import React from 'react'
import { useNotificaciones } from '../../hooks/useNotificaciones'
import { ContenidoAlertaTransferencia } from '../contenidos/ContenidoAlertaTransferencia'

/**
 * Controlador que coordina la visualización de notificaciones en la interfaz.
 * Sigue la Regla 6: Nivel de abstracción de Dominio/Acciones.
 */
export const ControladorNotificacionesUI: React.FC = () => {
  const { notificacion, ocultarAlerta } = useNotificaciones()

  if (!notificacion.visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}
    >
      <ContenidoAlertaTransferencia
        mensaje={notificacion.mensaje}
        tipo={notificacion.tipo}
        alCerrar={ocultarAlerta}
      />
    </div>
  )
}
