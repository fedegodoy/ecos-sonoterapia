# optimize-images

Script para optimizar fotos y videos antes de subirlos a cualquier proyecto web.

Convierte todo a **AVIF** (imágenes) y **MP4 H.264** (videos), renombra con slugs SEO, y redimensiona según la sección.

---

## Instalación

```bash
npm install sharp
brew install ffmpeg   # solo si tenés videos
```

Agregar en `package.json`:

```json
"scripts": {
  "fotos": "node scripts/optimize-images.mjs"
}
```

---

## Uso

1. Copiá las fotos crudas en `fotos-raw/` según la carpeta que corresponda:

```
fotos-raw/
  hero/      → imágenes de portada
  menu/      → platos, productos
  galeria/   → ambiente, detalles  +  videos
```

2. Corré el script:

```bash
npm run fotos
```

3. Las fotos optimizadas aparecen en `public/images/` y los videos en `public/videos/`.

---

## Configuración (al principio del script)

| Variable | Qué hace |
|---|---|
| `SUFIJO` | Texto que se agrega al final de cada nombre (ej: `"mi-restaurante-palermo"`) |
| `CARPETAS` | Nombre de carpeta → dimensiones de salida |
| `CALIDAD_AVIF` | Calidad 0–100. `60` es el punto dulce calidad/peso para web |
| `MAPA_NOMBRES` | Mapa de palabras clave → slug SEO final |

### Ejemplo de `MAPA_NOMBRES`

```js
const MAPA_NOMBRES = {
  "exterior":  "fachada-exterior",
  "salon":     "salon-interior",
  "milanesa":  "milanesa-casera",
};
```

Si el nombre del archivo contiene `"milanesa"`, el archivo de salida será `milanesa-casera-mi-proyecto.avif`.  
Si no hay coincidencia, usa el nombre original del archivo como slug.

---

## Dimensiones por defecto

| Carpeta | Tamaño | Uso típico |
|---|---|---|
| `hero/` | 2560×1440px | Hero / banner principal |
| `menu/` | 800×600px | Fotos de platos / productos |
| `galeria/` | 1200×900px | Galería de ambiente |

Podés agregar o cambiar carpetas editando `CARPETAS` en el script.
