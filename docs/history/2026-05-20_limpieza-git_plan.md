# Plan de Implementación: Limpieza de Historial de Git en `visualizadorMarkdown`

Este plan detalla los pasos para resolver de forma segura el límite de tamaño de GitHub aplicando la **Solución 1** (eliminar carpetas no deseadas del historial). 

Actualmente, el repositorio local tiene un tamaño de **187.67 MiB** porque las carpetas `dist` y `node_modules` fueron registradas en el primer commit (`aa724b5`), aunque luego fueron borradas en el segundo (`557a1ea`). Para solucionar esto de raíz, limpiaremos el historial de Git de forma completamente segura y reversible.

---

## Seguridad Primero (Backup)

Antes de realizar cualquier modificación al historial de Git, crearemos una rama de respaldo (`backup-before-clean`). Si algo sale mal o deseas revertir los cambios, podremos restaurar el estado original en un segundo ejecutando:
```powershell
git reset --hard backup-before-clean
```

---

## Cambios Propuestos

### Fase 1: Creación del Respaldo
1. Crear una rama de respaldo con el estado actual del repositorio:
   ```powershell
   git branch backup-before-clean
   ```

### Fase 2: Purga del Historial de Git
1. Ejecutar el comando oficial de Git para purgar las carpetas `dist` y `node_modules` de todos los commits pasados de forma retroactiva:
   ```powershell
   git filter-branch --force --index-filter "git rm -rf --cached --ignore-unmatch dist node_modules" --prune-empty --tag-name-filter cat -- --all
   ```
2. Esto reescribirá los 11 commits locales, eliminando las carpetas pesadas pero **preservando intactos todos tus mensajes de commit, códigos de autor y fechas**.

### Fase 3: Optimización y Limpieza de la Base de Datos de Git
Para reducir físicamente el tamaño del archivo `.git` local (de 187 MB a menos de 2 MB) y que no intente subir los archivos huérfanos a GitHub, ejecutaremos comandos de recolección de basura de Git:
```powershell
# Eliminar referencias antiguas del historial
git reflog expire --expire=now --all
# Limpiar y empaquetar de nuevo la base de datos
git gc --prune=now --aggressive
```

---

## Plan de Verificación

### Pruebas Automatizadas/Manuales
1. **Verificar el tamaño de la base de datos:**
   Ejecutaremos `git count-objects -vH` para comprobar que el tamaño empaquetado del repositorio haya bajado significativamente (debería quedar en menos de 2 MB).
2. **Verificar que los archivos del proyecto siguen intactos:**
   Ejecutaremos `git status` y revisaremos que los archivos locales no hayan sufrido cambios destructivos en el directorio de trabajo.
3. **Intentar la subida (Push):**
   Una vez verificado y con tu confirmación, ejecutaremos `git push origin main` para verificar que suba correctamente a GitHub sin errores de tamaño.
