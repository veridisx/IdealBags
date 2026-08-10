# Ideal Bags — Catálogo Web MVP

Proyecto base HTML + CSS + JavaScript para Ideal Bags.

## Estructura
- `index.html`: página principal.
- `css/styles.css`: identidad visual y diseño responsive.
- `js/app.js`: buscador, filtros y WhatsApp.
- `data/productos.json`: catálogo editable.
- `img/logo-ideal-bags.jpeg`: logo proporcionado.
- `img/productos/`: coloca aquí las imágenes reales.

## Para probarlo
No abras `index.html` directamente si quieres que `productos.json` cargue correctamente.
En VS Code instala Live Server y abre el proyecto con "Open with Live Server".

## Para cargar los 100 productos
Edita `data/productos.json` y agrega objetos siguiendo el mismo formato.
Después coloca las imágenes en `img/productos/`.

## WhatsApp
En `js/app.js`, cambia:
const WHATSAPP = "525500000000";
por el número real del cliente, en formato internacional y sin +, espacios ni guiones.

También cambia los enlaces WhatsApp del `index.html` por el número real.

## Nota
Las imágenes de ejemplo no están incluidas. El diseño muestra un marcador cuando todavía no existe la fotografía.
