import { Notification } from 'electron'

/**
 * Lanza una notificación nativa del sistema operativo.
 * Cumple con el requisito de UX: "Aceptación Silenciosa".
 */
export function mostrarSolicitudDeArchivo(nombreArchivo: string, alAceptar: () => void) {
  const notificacion = new Notification({
    title: 'Transferencia Entrante',
    body: `¿Deseas recibir el archivo "${nombreArchivo}"?`,
    // Nota: Las 'actions' funcionan principalmente en macOS.
    // Para Windows/Linux, el click en la notificación actúa como "Aceptar".
    actions: [{ type: 'button', text: 'Aceptar' }]
  })

  notificacion.on('action', (_evento, indice) => {
    if (indice === 0) alAceptar()
  })

  notificacion.on('click', () => alAceptar())

  notificacion.show()
}
