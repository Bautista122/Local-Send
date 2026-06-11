import { ControladorDeTransferencia } from './componentes/controladores/ControladorDeTransferencia'

export default function App() {
  return (
    <main
      style={{
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#121212',
        color: '#fff',
        minHeight: '100vh',
        margin: 0
      }}
    >
      <ControladorDeTransferencia />
    </main>
  )
}
