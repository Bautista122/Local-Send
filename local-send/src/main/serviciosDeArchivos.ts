import fs from 'node:fs'
import path from 'node:path'

/**
 * Resuelve conflictos si un archivo ya existe, aplicando la opción de "Mantener ambos".
 * Sigue la regla de Nivel de Abstracción: Lógica pura de archivos [2].
 */
export function obtenerRutaSinColision(carpetaDestino: string, nombreOriginal: string): string {
  let rutaFinal = path.join(carpetaDestino, nombreOriginal)

  if (!fs.existsSync(rutaFinal)) {
    return rutaFinal
  }

  const extension = path.extname(nombreOriginal)
  const nombreBase = path.basename(nombreOriginal, extension)
  let contador = 1

  // Ciclo para encontrar un nombre disponible: archivo(1).jpg, archivo(2).jpg...
  while (fs.existsSync(rutaFinal)) {
    rutaFinal = path.join(carpetaDestino, `${nombreBase}(${contador})${extension}`)
    contador++
  }

  return rutaFinal
}
