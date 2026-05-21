import { useDispositivosDeRed } from './hooks/useDispositivosDeRed'
import { ContenedorDePanelDeControl } from './componentes/contenedores/ContenedorDePanelDeControl'
import { IndicadorDeEstadoServidor } from './componentes/contenidos/IndicadorDeEstadoServidor'
import { TarjetaParaDispositivoRemoto } from './componentes/contenidos/TarjetaParaDispositivoRemoto'

export default function App() {
  const { estadoServidor, listaDispositivos } = useDispositivosDeRed()

  return (
    <ContenedorDePanelDeControl
      seccionIndicador={<IndicadorDeEstadoServidor estado={estadoServidor} />}
      seccionListaDeDispositivos={
        <section>
          <h2 style={{ fontSize: '18px', marginBottom: '12px', color: '#9ca3af' }}>
            Dispositivos Activos Detectados ({listaDispositivos.length})
          </h2>
          <ul style={{ padding: 0, margin: 0 }}>
            {listaDispositivos.map((dispositivo) => (
              <TarjetaParaDispositivoRemoto key={dispositivo.ip} dispositivo={dispositivo} />
            ))}
          </ul>
        </section>
      }
    />
  )
}
