import Versions from './componentes/Versions'
import electronLogo from './assets/electron.svg'
// Importamos tu controlador de descubrimiento nativo
import { ControladorDeDescubrimiento } from './componentes/controladores/ControladorDeDescubrimiento'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>

      {/* REEMPLAZO: En lugar de los textos de plantilla genéricos, 
        renderizamos el módulo P2P de tu aplicación nativa
      */}
      <div style={{ width: '100%', maxWidth: '600px', margin: '20px auto', padding: '0 10px' }}>
        <ControladorDeDescubrimiento />
      </div>

      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
