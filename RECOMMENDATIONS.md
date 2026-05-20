# Recomendaciones para MarkdownFlow

Este documento detalla las posibles mejoras para futuras versiones de la aplicación, clasificadas por impacto y área.

## 🚀 Funcionalidad y UX
- **Buscador de Archivos:** Implementar una barra de búsqueda en la barra lateral para filtrar archivos `.md` en tiempo real.
- **Auto-recarga (Hot Reload):** Detectar cambios en el archivo abierto (usando `fs.watch`) para actualizar la previsualización automáticamente.
- **Persistencia de Estado:** Recordar la última carpeta abierta y el último archivo visualizado al reiniciar la aplicación.
- **Tabla de Contenidos (TOC):** Generar un índice interactivo basado en los encabezados del documento.

## 🎨 Estética y Personalización
- **Selector de Temas:** Permitir alternar entre modo oscuro (Ink) y modo claro (Notion Light).
- **Temas de Código:** Ofrecer diferentes estilos de resaltado para bloques de código (Dracula, GitHub, Monokai).
- **Configuración de Tipografía:** Permitir ajustar el tamaño de fuente y el interlineado para mejorar la accesibilidad.

## 📄 Exportación Avanzada
- **Opciones de PDF:** Diálogo previo a la exportación para elegir tamaño de página (A4/Letter), márgenes y numeración.
- **Exportación en Lote:** Opción para exportar todos los archivos de una carpeta a PDF de una sola vez.

## 🛠️ Robustez Técnica
- **Manejo de Enlaces:** Abrir enlaces externos (`http/https`) en el navegador predeterminado del sistema.
- **Seguridad:** Implementar una Content Security Policy (CSP) más estricta para el renderizador.
- **Logs de Error:** Sistema de captura de errores para facilitar el diagnóstico en producción.
