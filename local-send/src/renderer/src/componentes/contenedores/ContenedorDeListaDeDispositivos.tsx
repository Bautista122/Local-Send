import { InterfazDispositivo } from '../../hooks/useDescubrimiento'
import { TarjetaDeDispositivoRemoto } from '../contenidos/TarjetaDeDispositivoRemoto'

interface PropiedadesLista {
  dispositivos: InterfazDispositivo[]
  renderizarAccionParaDispositivo: (idDispositivo: string) => React.ReactNode
}

export function ContenedorDeListaDeDispositivos({
  dispositivos,
  renderizarAccionParaDispositivo
}: PropiedadesLista) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
      <h2 style={{ color: '#fff', fontSize: '18px' }}>Dispositivos Disponibles</h2>
      {dispositivos.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Buscando dispositivos en tu red local...
        </p>
      ) : (
        dispositivos.map((elemento) => (
          <TarjetaDeDispositivoRemoto
            key={elemento.id}
            dispositivo={elemento}
            pieDeTarjeta={renderizarAccionParaDispositivo(elemento.id)}
          />
        ))
      )}
    </section>
  )
}
