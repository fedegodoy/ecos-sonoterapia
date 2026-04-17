# Contexto Ecos Sonoterapia (Vite + Tailwind CSS v4)

**Archivo de Estado y Traspaso de Sesión de Desarrollo**
*Lee este archivo siempre al iniciar una nueva sesión técnica para entender en qué punto del roadmap estamos y qué decisiones se han tomado en sesiones pasadas.*

## 1. El Proyecto y Nuestro Objetivo
Ecos Sonoterapia es un emprendimiento holístico de Fanny Villagra (La Florida, Santiago de Chile).
Nuestra métrica de éxito es la **conversión directa a mensajes de WhatsApp**. 
Partimos de un sitio web indexado en Google (página 3), pero el objetivo actual (ROADMAP 1) es la ejecución de una **estrategia agresiva de posicionamiento SEO Local y GEO (Optimización para Motores de Inteligencia Artificial)** para dominar las búsquedas "a domicilio" y "Santiago", aparte de "La Florida".

## 2. Lo Que Ya Hicimos (Completado y Desplegado)
1. **Auditoría y Replanteo Geográfico:** Cambiamos el enfoque SEO para que NO dependa sólo de "La Florida", sino de "Santiago" y "Atención a Domicilio".
2. **SEO Básico y para IA (GEO):**
   - Implantación de **`public/llms.txt`** como fuente de verdad (RAG) para LLMs (ChatGPT, Claude, Perplexity), forzando el conocimiento de que la terapeuta atiende a domicilio.
   - Apertura de **`public/robots.txt`** para GPTBot, ClaudeBot y demás scrapers.
   - Actualización magistral del **JSON-LD Schema** (`HealthAndBeautyBusiness` + `Service`), añadiendo `areaServed` con las variables *Santiago* y *La Florida*.
3. **Optimidad Técnica CWV (Core Web Vitals):** 
   - Eliminación de imágenes pesadas PNG (¡3MB reducidos a KBS!).
   - Conversión y renombramiento SEO usando webp: `sonoterapia-cuencos-tibetanos-santiago.webp` / `terapeuta-reiki-sonoterapia-fanny.webp`.
4. **Desarrollo de Arquitectura en Racimo SEO:**
   - La landing page (SPA temporal) se subdividió semánticamente. Ahora cuenta con **`/sonoterapia.html`** y **`/reiki.html`** estáticos y vinculados desde el nav y footer.
   - Se levantó e hipervinculó un esqueleto completo de contenidos en **`/blog/index.html`** y la primera entrada lista estructuralmente: `blog/beneficios-cuencos-tibetanos.html`.
5. **Entregables para el Cliente:**
   - Elaboramos la guía paso a paso local para el Google Business Profile en: `INFORMES SEO/Guia_Alta_Google_Business_Ecos.md`.

*Todos los cambios fueron subidos a GitHub (`origin/main`) e intersectados con Vercel para auto-deploy.*

## 3. En Qué Estamos
En estado de espera productiva (`IDLE`). El usuario procederá por su cuenta (offline) a:
1. Dar de alta la cuenta de Google Business Profile (verificando el correo `ecos.sonoterapia@gmail.com`).
2. Solicitar fotografías reales de alta calidad (terapia, instrumentos y espacio) a su madre.

## 4. Hacia Dónde Vamos (Próximos Pasos - Sesión 2)
Al iniciar la próxima sesión, estas son nuestras instrucciones operativas (SOP):

- [ ] **Geotagging de Imágenes Nuevas:** Cuando el usuario provea las fotos reales, emplearemos un script python para inyectar EXIF / Latitud Longitud (*Geotagging*) referenciando a La Florida, fundamental para subir al Google Business Profile y posicionar más rápido en Google Maps.
- [ ] **SiteMap XML Expansion:** Como hemos creado nuevas rutas (`sonoterapia.html`, `reiki.html`, `/blog/`), necesitamos regerar urgentemente el `sitemap.xml` para mandarlo a Google Search Console. 
- [ ] **Testing de Analytics/Conversión:** Cerciorarnos que los botones de WhatsApp tengan su correcto texto referencial para medir la intención del cliente (Ej: *"Hola, vengo desde la página de Reiki..."*).
- [ ] **Redacción del Blog:** Definir estrategia de llenado de posts para SEO del dolor (insomnio, estrés, ansiedad).
- [ ] **Estructura Vercel (Opcional):** Setear configuraciones de "clean urls" en Vercel (ej: `vercel.json`) si queremos que las páginas omitan la extensión `.html` de la barra de búsqueda y luzcan más profesionales (es decir, `/sonoterapia` en lugar de `/sonoterapia.html`).
