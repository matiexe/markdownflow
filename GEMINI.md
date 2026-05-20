# MarkdownFlow

Aplicación de escritorio para visualizar archivos Markdown y exportarlos a PDF.

## Requisitos
- Node.js
- npm

## Desarrollo
Para iniciar la aplicación en modo desarrollo:
```bash
npm run dev
```

## Construcción
Para generar el ejecutable:
```bash
npm run build
```

*Nota: La construcción del instalador puede requerir privilegios de administrador para la creación de enlaces simbólicos durante el empaquetado.*

## Características Implementadas
- **Visualización de Markdown:** Renderizado fiel con soporte para GFM (tablas, checklists).
- **Exportación a PDF:** Exportación nativa desde el menú superior.
- **Acceso al Sistema de Archivos:** Navegación por carpetas y archivos locales.
- **Soporte de Imágenes Locales:** Resolución automática de imágenes relativas al archivo `.md`.
- **Drag & Drop:** Arrastra archivos `.md` directamente a la aplicación para visualizarlos.
- **Resaltado de Código:** Soporte para múltiples lenguajes con estilos modernos.
- **Ecuaciones Matemáticas:** Soporte para fórmulas en formato Katex.

## Estructura del Proyecto
- `electron/`: Proceso principal y preload de Electron.
- `src/`: Interfaz de usuario en React + TypeScript.
- `dist-electron/`: Salida de compilación del proceso principal.
- `dist/`: Salida de compilación del frontend.
