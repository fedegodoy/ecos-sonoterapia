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
1. Replanteo geográfico: enfoque sobre "Santiago" y "Atención a Domicilio".
2. GEO/SEO para IA: `public/llms.txt`, `public/robots.txt` abierto a GPTBot/ClaudeBot, JSON-LD Schema con `areaServed`.
3. Core Web Vitals: eliminación de PNGs pesados, conversión a WebP con nombres SEO.
4. Arquitectura en Racimo SEO: páginas `/sonoterapia`, `/reiki` + esqueleto de `/blog/`.
5. Guía Google Business Profile en `INFORMES SEO/Guia_Alta_Google_Business_Ecos.md`.

### Sesión 2 — Imágenes reales + nav + fixes producción
6. **15 imágenes reales** procesadas desde `ACTUALIZACION/` con scripts en `optimize-images/`:
   - `optimize-ecos.mjs` → AVIF + JPG con nombres SEO
   - `geotag-jpgs.mjs` → script de geotagging (descartado: corrompía EXIF). JPGs en producción son limpios sin EXIF.
   - Todas en `public/assets/` con `<picture>` (AVIF + JPG fallback).
7. **Páginas nuevas:** `/reiki-online`, `/sonoterapia-acuatica`, `/ceremonias` con contenido y hero real.
8. **Nav dropdown "Servicios":** desktop hover (CSS puro `group-hover`) + mobile lista expandida. Página activa resaltada en olive. En las 6 páginas.
9. **Hero H1:** 2 líneas — *Sonoterapia y Reiki / en Santiago.*
10. **Card SonoReiki:** ícono 🔔✋ → solo ✋
11. **Clean URLs:** `vercel.json` con `cleanUrls:true` → `/sonoterapia` en lugar de `/sonoterapia.html`. Canonicals, og:url, JSON-LD y sitemap actualizados.
12. **Fix crítico Vite:** `vite.config.js` ahora declara las 6 páginas como entry points del build. Sin esto el CSS/JS no cargaba en sub-páginas en producción.
13. **Schema JSON-LD:** `image` y `priceRange` agregados a las 5 sub-páginas (resuelve warnings de Rich Results Test).
14. **Google Business Profile:** creado y en proceso de verificación por Google (hasta 5 días). Datos coinciden exacto con la web.
15. **Rich Results Test `/sonoterapia`:** ✅ 1 elemento válido, `HealthAndBeautyBusiness` detectado sin errores críticos.
16. **Sitemap** enviado a Google Search Console.

*Todos los cambios en `origin/main` → auto-deploy en Vercel.*

---

## 3. Estructura de Páginas Actuales
| Página | Ruta | Estado |
|---|---|---|
| Home | `/` | ✅ completa |
| Sonoterapia | `/sonoterapia` | ✅ completa |
| SonoReiki | `/reiki` | ✅ completa |
| Reiki Online Nocturno | `/reiki-online` | ✅ completa |
| Sonoterapia Acuática | `/sonoterapia-acuatica` | ✅ completa |
| Ceremonias Holísticas | `/ceremonias` | ✅ completa |
| Blog índice | `/blog/` | ⚠️ esqueleto sin contenido |
| Blog post 1 | `/blog/beneficios-cuencos-tibetanos` | ⚠️ esqueleto sin contenido |

---

## 4. Scripts Disponibles en `optimize-images/`
- `optimize-ecos.mjs` — regenera AVIF+JPG desde `ACTUALIZACION/` con MAPA de nombres SEO
- `geotag-jpgs.mjs` — script de geotagging (no usar: corrompe EXIF con caracteres especiales)

---

## 5. Próximos Pasos (Sesión 3)

- [ ] **Blog — contenido real:** Redactar primeros 2-3 posts SEO del dolor: insomnio, estrés, ansiedad. Son los que más tráfico orgánico generan a largo plazo.
- [ ] **Google Business Profile:** Esperar verificación (~5 días). Una vez activo: agregar horario, servicios con precios, y publicación inicial.
- [ ] **Fotos GBP:** Subir desde `public/assets/` en este orden: `terapeuta-reiki-sonoterapia-fanny.jpg` (portada), `hero-sonoterapia-cuencos-santiago.jpg`, `experiencia-sonoterapia-santiago.jpg`, `sonoreiki-fanny-villagra-santiago.jpg`, `ceremonias-holisticas-santiago.jpg`.

---

## 6. Ideas para Optimizar Más (backlog)
- **Google Ads locales** (cuando el GBP esté verificado): campaña pequeña de $5.000-$10.000 CLP/día para "sonoterapia Santiago" y "reiki a domicilio Santiago".
- **Reseñas Google:** Pedirle a clientas actuales que dejen reseña en el GBP — es el factor #1 de ranking local.
- **WhatsApp Business:** Migrar el número a WA Business para tener perfil verificado, catálogo de servicios y respuestas automáticas.
- **Instagram vinculado al GBP:** Conectar `@ecos.sonoterapia` al perfil de Google Business.
- **Blog:** Primeros posts sugeridos: "Qué es la sonoterapia y para qué sirve", "Beneficios del Reiki para el insomnio", "Sonoterapia a domicilio en Santiago: qué esperar".
