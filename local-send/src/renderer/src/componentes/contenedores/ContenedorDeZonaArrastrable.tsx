import { useState } from 'react'

interface PropiedadesArrastrable {
  children: React.ReactNode
  onArchivosSoltados: (rutasDeArchivos: string[]) => void
}

export function ContenedorDeZonaArrastrable({
  children,
  onArchivosSoltados
}: PropiedadesArrastrable) {
  const [estaArrastrando, setEstaArrastrando] = useState(false)

  const manejarArrastreEncima = (evento: React.DragEvent) => {
    evento.preventDefault()
    setEstaArrastrando(true)
  }

  const manejarArrastreFuera = () => {
    setEstaArrastrando(false)
  }

  const manejarSoltadoDeArchivos = (evento: React.DragEvent) => {
    evento.preventDefault()
    setEstaArrastrando(false)

    if (evento.dataTransfer.files?.length > 0) {
      // Extraemos las rutas absolutas del archivo del sistema que provee Electron
      const rutas = Array.from(evento.dataTransfer.files).map((archivo: any) => archivo.path)
      onArchivosSoltados(rutas)
    }
  }

  return (
    <div
      onDragOver={manejarArrastreEncima}
      onDragLeave={manejarArrastreFuera}
      onDrop={manejarSoltadoDeArchivos}
      style={{
        border: estaArrastrando ? '2px dashed #007acc' : '2px solid transparent',
        backgroundColor: estaArrastrando ? 'rgba(0, 122, 204, 0.05)' : 'transparent',
        minHeight: '100vh',
        transition: 'all 0.2s ease',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      {children}
    </div>
  )
}
