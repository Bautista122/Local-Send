import { ReactNode } from 'react'

type PropsContenedor = {
  seccionIndicador: ReactNode
  seccionListaDeDispositivos: ReactNode
}

export function ContenedorDePanelDeControl({
  seccionIndicador,
  seccionListaDeDispositivos
}: PropsContenedor) {
  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#1e1e24',
        color: '#ffffff',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif'
      }}
    >
      <header
        style={{ marginBottom: '32px', borderBottom: '1px solid #333', paddingBottom: '12px' }}
      >
        <h1 style={{ margin: 0, fontSize: '24px' }}>LocalSend - Nodo Central</h1>
      </header>

      <main>
        {seccionIndicador}
        {seccionListaDeDispositivos}
      </main>
    </div>
  )
}
