# <img src="public/logo.png" width="40" height="40" align="center"> MarkdownFlow

**MarkdownFlow** es una aplicación de escritorio minimalista y elegante diseñada para visualizar archivos Markdown y exportarlos a PDF con una fidelidad visual excepcional. Inspirada en la estética de herramientas modernas como Notion, ofrece una experiencia de lectura fluida y profesional.

---

## ✨ Características Principales

- 🎨 **Interfaz Minimalista:** Diseño limpio centrado en el contenido con una paleta de colores "Ink" (Oscura) y tipografías Poppins & Inter.
- 📄 **Visualización de Alta Fidelidad:** Soporte completo para GitHub Flavored Markdown (GFM), incluyendo tablas, listas de tareas y citas.
- 📥 **Drag & Drop:** Arrastra archivos `.md` directamente a la aplicación para una visualización instantánea.
- 🖼️ **Imágenes Locales:** Resolución automática de rutas de imágenes relativas para que tus documentos se vean completos.
- 🔢 **Ecuaciones Matemáticas:** Renderizado de fórmulas complejas mediante KaTeX.
- 💻 **Resaltado de Código:** Soporte para múltiples lenguajes con un tema oscuro tipo VS Code.
- 📤 **Exportación a PDF:** Genera documentos PDF limpios, aislados del UI de la aplicación, listos para compartir.

---

## 🚀 Instalación

### Usuarios Finales
Puedes descargar el instalador más reciente desde la sección de [Releases](https://github.com/tu-usuario/markdown-flow/releases).
- Descarga `MarkdownFlow Setup 1.1.6.exe`.
- Ejecuta el instalador y sigue los pasos.

---

## 🛠️ Desarrollo y Contribución

Si deseas ejecutar el proyecto localmente o contribuir al desarrollo:

### Requisitos
- [Node.js](https://nodejs.org/) (v18 o superior)
- npm (incluido con Node.js)

### Configuración del Entorno

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/markdown-flow.git
   cd markdown-flow
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construir el ejecutable/instalador:**
   *Nota: Para generar el instalador en Windows, se recomienda usar una terminal con privilegios de administrador.*
   ```bash
   npm run build
   ```

---

## 📁 Estructura del Proyecto

- `electron/`: Proceso principal y scripts de pre-carga (IPC).
- `src/`: Interfaz de usuario construida con React y TypeScript.
- `public/`: Recursos estáticos (Logos, favicon).
- `MEMORY.md`: Historial de decisiones técnicas y versionado para contexto de IA.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo y mejorarlo.

---

Desarrollado con ❤️ por **Experimento**
