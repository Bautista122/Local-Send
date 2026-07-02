import React from 'react'
import { useDescubrimiento } from '../../hooks/useDescubrimiento'
import { ContenidoTarjetaDispositivo } from '../contenidos/ContenidoTarjetaDispositivo'

/**
 * Gestiona la visualización de todos los nodos encontrados.
 * Sigue la Regla 2: Separación por responsabilidad [4].
 */
export const ControladorListaDispositivos: React.FC = () => {
  // Nota: Aquí el hook useDescubrimiento debería devolver también la lista de dispositivos
  const { dispositivosEncontrados } = useDescubrimiento()

  return (
    <section style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '15px', color: '#555' }}>Dispositivos en la red</h3>
      {dispositivosEncontrados.length === 0 ? (
        <p style={{ color: '#999', fontStyle: 'italic' }}>Buscando dispositivos...</p>
      ) : (
        dispositivosEncontrados.map((dispositivo) => (
          <ContenidoTarjetaDispositivo
            key={dispositivo.ip}
            alias={dispositivo.alias}
            tipo={dispositivo.tipo}
            ip={dispositivo.ip}
            alHacerClick={() => console.log('Seleccionado:', dispositivo.alias)}
          />
        ))
      )}
    </section>
  )
}
