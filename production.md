✅ PASO 1 — Exportar tu proyecto en modo web

Ejecutá esto en la carpeta del proyecto:

npx expo export 


Esto te genera:

dist/
  index.html
  assets/
  bundles/
  ...


Esa carpeta dist es tu app web lista para subir.

✅ PASO 2 — Crear un repo en GitHub

Entrá a GitHub

Hacé click en New Repository

Nombre: miapp (o el que quieras)

Público (no pasa nada)

Create repository

✅ PASO 3 — Subir tu carpeta dist/

En consola:

git init
git remote add origin https://github.com/TU_USUARIO/miapp.git


Ahora copiás todo lo de dist/ a la carpeta del repo.

Después:

git add .
git commit -m "Primera exportación"
git push -u origin main

✅ PASO 4 — Activar GitHub Pages

Andá al repo en GitHub

Settings → Pages

En Build and deployment, elegí:

Source: Deploy from a branch

Branch: main

Folder: /root (o /)

Guardar.

GitHub publica tu sitio como:

https://TU_USUARIO.github.io/miapp/


⚠️ Puede tardar 1–2 minutos.

✅ PASO 5 — Abrir tu app en el iPhone

En tu iPhone:

Abrí Safari

Entrá a la URL:

https://TU_USUARIO.github.io/miapp/


Tocá Compartir

“Agregar a la pantalla de inicio”

Esto crea un icono como una app normal, sin la barra del navegador.
Esa es la PWA.

🟢 Listo. Ya tenés tu app "instalada" sin instalar .ipa ni nada.
🔁 Cómo actualizar tu app

Cada vez que quieras subir una nueva versión:

npx expo export --platform web --output dist --experimental-bundle


Luego:

git add .
git commit -m "update"
git push


GitHub Pages actualiza solo, y tu iPhone carga la nueva versión automáticamente.

Podés repetir esto infinitas veces.