# 🧬 Project Constitution — Ecos Sonoterapia

## North Star
Landing Page (SPA) estática, ultrarrápida y responsive para Ecos Sonoterapia, negocio de terapias holísticas en La Florida, Santiago de Chile. Objetivo: conversión directa a WhatsApp.

## Stack
- **Core**: Vite + Vanilla HTML/JS
- **Styling**: Tailwind CSS v4
- **Fonts**: Google Fonts — Playfair Display (Serif/títulos) + Inter (Sans-serif/cuerpo)
- **Deploy**: Static export, listo para Vercel/Netlify

## Design System

### Paleta de Colores
| Token | Color | Hex |
|-------|-------|-----|
| `sage` | Verde Salvia | `#9CAF88` |
| `sage-light` | Salvia Claro | `#C5D5B5` |
| `olive` | Oliva | `#6B7F3B` |
| `olive-dark` | Oliva Oscuro | `#4A5A28` |
| `warm-gray` | Gris Cálido | `#A69F98` |
| `cream` | Crema | `#FAF8F5` |
| `warm-white` | Blanco Cálido | `#FDFCFA` |
| `gold` | Dorado | `#C5A572` |
| `gold-light` | Dorado Claro | `#D4C4A0` |
| `text-dark` | Texto Oscuro | `#2D2A26` |
| `text-body` | Texto Cuerpo | `#5A554E` |

### Tipografía
- **Headings**: Playfair Display (Serif) — h1: 3.5rem, h2: 2.5rem, h3: 1.75rem
- **Body**: Inter (Sans-serif) — base: 1rem, sm: 0.875rem

### Principios de Diseño
1. **High Key Lighting**: Fondos blancos/cremas con amplio respiro visual
2. **Minimalismo**: Menos es más, espacios generosos
3. **Orgánico**: Bordes suaves, transiciones fluidas
4. **Premium**: Detalles dorados, tipografía elegante

## Component Schema
```
├── Hero Section
│   ├── Título: "Sanación a través del sonido."
│   ├── Subtítulo: "Relaja, equilibra y armoniza..."
│   └── CTA → WhatsApp
├── Sobre la Terapeuta
│   ├── Nombre: Fanny Villagra Elías
│   ├── Roles: Sonoterapeuta, Maestra de Reiki, Terapeuta Holística
│   └── Enfoque: Visión integral cuerpo-mente-espíritu
├── Nuestras Sesiones (Cards)
│   ├── Sonoterapia (1hr) — $20.000 / Promo $15.000
│   └── Sonoterapia + Reiki (1.5hr) — $25.000 / Promo $20.000
├── Beneficios (Grid)
│   ├── Reduce tensión muscular y dolor
│   ├── Disminuye estrés y ansiedad
│   ├── Mejora calidad del sueño
│   └── Facilita conexión interior
└── Footer
    ├── Instagram: @ecos.sonoterapia
    ├── Ubicación: La Florida / a domicilio
    └── WhatsApp CTA
```

## SEO
- Target: Sonoterapia La Florida Santiago Chile
- Keywords: sonoterapia, cuencos tibetanos, reiki, terapia holística, La Florida
- Local schema markup

## Integrations
- WhatsApp API link: `https://wa.me/56XXXXXXXXX`
- Instagram: `@ecos.sonoterapia`

## Behavioral Rules
- No APIs complejas
- Contenido estático inyectado
- Diseño mobile-first
- Performance: < 2s load time target
