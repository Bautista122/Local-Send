import React from 'react'
import { useTransferencia } from '../../hooks/useTransferencia'
import { ContenidoZonaDeSoltado } from '../contenidos/ContenidoZonaDeSoltado'
import { ControladorBarraEstado } from '../controladores/ControladorBarraEstado'
import { ControladorListaDispositivos } from '../controladores/ControladorListaDispositivos'
import { ControladorMonitorTransferencia } from '../controladores/ControladorMonitorTransferencia'
import { ControladorNotificacionesUI } from '../controladores/ControladorNotificacionesUI'

/**
 * Estructura y orquestación principal (Capa Contenedor). [2]
 */
export const ContenedorPrincipal: React.FC = () => {
  // Regla 3: Hook personalizado fuera del componente. [4]
  const { estaArrastrando, manejarDragOver, manejarDragLeave, manejarDrop } = useTransferencia()

  return (
    <div
      onDragOver={manejarDragOver}
      onDragLeave={manejarDragLeave}
      onDrop={manejarDrop}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <ControladorBarraEstado />
      <ControladorNotificacionesUI />

      <main style={{ flex: 1, position: 'relative' }}>
        <ContenidoZonaDeSoltado estaActivo={estaArrastrando}>
          <ControladorListaDispositivos />
        </ContenidoZonaDeSoltado>
      </main>

      <ControladorMonitorTransferencia />
    </div>
  )
}
