import { useState } from 'react'

/**
 * Hook para gestionar la lógica de arrastrar y soltar archivos.
 * Sigue la Regla 3: Hook fuera del componente para encapsular lógica [4].
 */
export const useTransferencia = () => {
  const [estaArrastrando, setEstaArrastrando] = useState(false)

  const manejarDragOver = (evento: React.DragEvent) => {
    evento.preventDefault()
    setEstaArrastrando(true)
  }

  const manejarDragLeave = () => {
    setEstaArrastrando(false)
  }

  const manejarDrop = (evento: React.DragEvent) => {
    evento.preventDefault()
    setEstaArrastrando(false)

    const archivos = Array.from(evento.dataTransfer.files)
    console.log('Archivos listos para enviar:', archivos)
    // Aquí conectaremos luego con la lógica de envío al proceso Main
  }

  return { estaArrastrando, manejarDragOver, manejarDragLeave, manejarDrop }
}
