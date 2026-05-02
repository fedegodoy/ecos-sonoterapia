# Contexto Ecos Sonoterapia (Vite + Tailwind CSS v4)

**Archivo de Estado y Traspaso de Sesión de Desarrollo**
*Lee este archivo siempre al iniciar una nueva sesión técnica para entender en qué punto del roadmap estamos y qué decisiones se han tomado en sesiones pasadas.*

## 1. El Proyecto y Nuestro Objetivo
Ecos Sonoterapia es un emprendimiento holístico de Fanny Villagra (La Florida, Santiago de Chile).
Nuestra métrica de éxito es la **conversión directa a mensajes de WhatsApp**. 
El objetivo actual (ROADMAP 1) es una **estrategia agresiva de posicionamiento SEO Local y GEO** para dominar las búsquedas "a domicilio" y "Santiago", aparte de "La Florida".

---

## 2. Lo Que Ya Hicimos (Completado y Desplegado)

### Sesión 1 — SEO técnico base
1. **Auditoría y Replanteo Geográfico:** Enfoque SEO sobre "Santiago" y "Atención a Domicilio" (no solo "La Florida").
2. **GEO/SEO para IA:** `public/llms.txt`, `public/robots.txt` abierto a GPTBot/ClaudeBot, JSON-LD Schema con `areaServed`.
3. **Core Web Vitals:** Eliminación de PNGs pesados (3MB → KBs), conversión a WebP con nombres SEO.
4. **Arquitectura en Racimo SEO:** Páginas `/sonoterapia.html`, `/reiki.html` + esqueleto de `/blog/`.
5. **Google Business Profile:** Guía paso a paso en `INFORMES SEO/Guia_Alta_Google_Business_Ecos.md`.

### Sesión 2 — Imágenes reales + nav dropdown
6. **Imágenes reales retocadas por Fanny** procesadas desde `ACTUALIZACION/` con scripts en `optimize-images/`:
   - `optimize-ecos.mjs` → genera AVIF + JPG con nombres SEO para todas las páginas (15 imágenes × 2 formatos)
   - `geotag-jpgs.mjs` → inyecta EXIF GPS (La Florida: -33.5212, -70.5985) en todos los JPG para Google Business Profile
   - Todas las imágenes están en `public/assets/` con `<picture>` (AVIF + JPG fallback) reemplazando los placeholders
7. **Nuevas páginas:** `/reiki-online.html`, `/sonoterapia-acuatica.html`, `/ceremonias.html` con contenido y hero real
8. **Nav dropdown "Servicios":** Desktop con hover dropdown (CSS puro, `group-hover` Tailwind) + mobile con lista expandida. La página activa se resalta en olive. Disponible en las 6 páginas.
9. **Hero H1:** Ajustado a 2 líneas: *Sonoterapia y Reiki / en Santiago.*
10. **Card SonoReiki:** Ícono cambiado de 🔔✋ → solo ✋

*Todos los cambios en `origin/main` → auto-deploy en Vercel.*

---

## 3. Estructura de Páginas Actuales
| Página | Ruta | Estado |
|---|---|---|
| Home (landing) | `/` → `index.html` | ✅ completa |
| Sonoterapia | `/sonoterapia.html` | ✅ completa |
| SonoReiki | `/reiki.html` | ✅ completa |
| Reiki Online Nocturno | `/reiki-online.html` | ✅ completa |
| Sonoterapia Acuática | `/sonoterapia-acuatica.html` | ✅ completa |
| Ceremonias Holísticas | `/ceremonias.html` | ✅ completa |
| Blog índice | `/blog/index.html` | ⚠️ esqueleto sin contenido |
| Blog post 1 | `/blog/beneficios-cuencos-tibetanos.html` | ⚠️ esqueleto sin contenido |

---

## 4. Scripts Disponibles en `optimize-images/`
- `optimize-ecos.mjs` — regenera AVIF+JPG desde `ACTUALIZACION/` con MAPA de nombres SEO
- `geotag-jpgs.mjs` — inyecta GPS EXIF La Florida en todos los JPG de `public/assets/`
- `README.md` — instrucciones de uso generales

---

## 5. Próximos Pasos (Sesión 3)

- [ ] **Sitemap XML actualizado:** Agregar las 3 nuevas páginas (`/reiki-online.html`, `/sonoterapia-acuatica.html`, `/ceremonias.html`) y reenviar a Google Search Console.
- [ ] **Google Business Profile:** Verificar/avanzar el alta + subir fotos JPG geotaggeadas.
- [ ] **Google Rich Results Test:** Validar Schema JSON-LD en las páginas nuevas.
- [ ] **Clean URLs Vercel (opcional):** `vercel.json` con rewrites para servir `/sonoterapia` en lugar de `/sonoterapia.html`.
- [ ] **Blog — contenido real:** Redactar primeros 2-3 posts SEO del dolor (insomnio, estrés, ansiedad).
- [ ] **Analytics/Conversión:** Verificar que cada botón WhatsApp tenga texto de referencia distinto por página para medir intención (ya tiene textos diferenciados por página, confirmar que están todos bien).
