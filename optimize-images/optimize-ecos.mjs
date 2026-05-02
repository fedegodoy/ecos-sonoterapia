/**
 * Optimizador específico para Ecos Sonoterapia
 * Toma las fotos retocadas en ACTUALIZACION/ y genera:
 *   - AVIF optimizado (web — calidad 60)
 *   - JPG optimizado (para Google Business Profile, que no acepta AVIF/WebP)
 * con nombres SEO finales que coinciden con los placeholders del HTML.
 *
 * USO:  node optimize-images/optimize-ecos.mjs
 * SALIDA:  public/assets/<nombre-seo>.avif  +  public/assets/<nombre-seo>.jpg
 */

import sharp from "sharp";
import { readdir, mkdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const DIR_INPUT  = "ACTUALIZACION";
const DIR_OUTPUT = "public/assets";

const CALIDAD_AVIF = 60;
const CALIDAD_JPG  = 82;

// Mapeo: nombre del archivo origen (sin extensión) → { slug SEO final, width, height }
// Los slugs coinciden con las rutas declaradas en los placeholders del HTML.
const MAPA = {
  "hero_background_2560x1440":     { slug: "sonoterapia-cuencos-tibetanos-santiago",       w: 2560, h: 1440 },
  "cuencos_800x800":               { slug: "cuencos-tibetanos-cuarzo-fanny-villagra",      w: 800,  h: 800  },
  "retrato_fanny_800x1100":        { slug: "terapeuta-reiki-sonoterapia-fanny",            w: 800,  h: 1100 },
  "ambiente_sesion_1200x900":      { slug: "experiencia-sonoterapia-santiago",             w: 1200, h: 900  },
  "ceremonia_holistica_1200x900":  { slug: "ceremonias-holisticas-santiago",               w: 1200, h: 900  },
  "sonoterapia_acuatica_1200x900": { slug: "sonoterapia-acuatica-santiago",                w: 1200, h: 900  },
  "hero_sonoterapia_1920x1080":    { slug: "hero-sonoterapia-cuencos-santiago",            w: 1920, h: 1080 },
  "sonoreiki_1920x1080":           { slug: "sonoreiki-fanny-villagra-santiago",            w: 1920, h: 1080 },
  "hero_ceremonias_1920x1080":     { slug: "hero-ceremonias-holisticas-santiago",          w: 1920, h: 1080 },
  "hero_acuatica_1920x1080":       { slug: "hero-sonoterapia-acuatica-santiago",           w: 1920, h: 1080 },
  "reikionline_1920x1080":         { slug: "reiki-online-nocturno-chile",                  w: 1920, h: 1080 },
  "union_parejas_1200x900":        { slug: "ceremonia-union-pareja-santiago",              w: 1200, h: 900  },
  "bendicion_camino_1200x900":     { slug: "bendicion-camino-baby-shower-santiago",        w: 1200, h: 900  },
  "cumpleaños_1200x900":           { slug: "cumpleanos-consciente-santiago",               w: 1200, h: 900  },
  "circulos_1200x900":             { slug: "circulos-mujeres-mixtos-familia-santiago",     w: 1200, h: 900  },
};

async function procesar(srcPath, slug, w, h) {
  await mkdir(DIR_OUTPUT, { recursive: true });

  const baseImg = sharp(srcPath).resize({
    width: w, height: h, fit: "cover", position: "center", withoutEnlargement: true,
  });

  const outAvif = join(DIR_OUTPUT, `${slug}.avif`);
  const outJpg  = join(DIR_OUTPUT, `${slug}.jpg`);

  await baseImg.clone().avif({ quality: CALIDAD_AVIF, effort: 6 }).toFile(outAvif);
  await baseImg.clone().jpeg({ quality: CALIDAD_JPG, progressive: true, mozjpeg: true }).toFile(outJpg);

  const a = (await stat(outAvif)).size / 1024;
  const j = (await stat(outJpg)).size / 1024;
  return { avif: a.toFixed(0) + "KB", jpg: j.toFixed(0) + "KB" };
}

async function main() {
  console.log("\n  Optimizador Ecos Sonoterapia\n");
  let archivos;
  try {
    archivos = await readdir(DIR_INPUT);
  } catch {
    console.error(`No encuentro la carpeta ${DIR_INPUT}/`);
    process.exit(1);
  }

  const imagenes = archivos.filter((f) => /\.(jpe?g|png|webp|heic|heif|tiff?)$/i.test(f));

  for (const archivo of imagenes) {
    const sinExt = basename(archivo, extname(archivo)).normalize("NFC");
    const config = MAPA[sinExt];
    if (!config) {
      console.log(`  ⚠️  ${archivo} — sin entrada en MAPA, saltando`);
      continue;
    }
    process.stdout.write(`   ${archivo.padEnd(38)} → ${config.slug}.{avif,jpg}`);
    try {
      const r = await procesar(join(DIR_INPUT, archivo), config.slug, config.w, config.h);
      console.log(`  [avif ${r.avif} · jpg ${r.jpg}]`);
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }
  }

  console.log(`\n✅ Listo. Salida en ${DIR_OUTPUT}/\n`);
}

main().catch(console.error);
