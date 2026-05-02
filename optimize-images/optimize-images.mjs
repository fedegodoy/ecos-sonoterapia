/**
 * Optimizador de imágenes y videos para proyectos web
 *
 * USO:
 *   node scripts/optimize-images.mjs
 *   — o con npm: agregar "fotos": "node scripts/optimize-images.mjs" en package.json
 *
 * DEPENDENCIAS:
 *   npm install sharp
 *   brew install ffmpeg  (solo para videos)
 *
 * ESTRUCTURA DE CARPETAS:
 *   fotos-raw/
 *     hero/     → public/images/hero/     (2560×1440)
 *     menu/     → public/images/menu/     (800×600)
 *     galeria/  → public/images/galeria/  (1200×900)  + videos → public/videos/
 *
 * PARA ADAPTAR A OTRO PROYECTO:
 *   1. Editá SUFIJO con el nombre del proyecto (para naming SEO)
 *   2. Editá CARPETAS si necesitás tamaños distintos
 *   3. Editá o vaciá MAPA_NOMBRES según las fotos del proyecto
 *
 * Imágenes: JPG/PNG/HEIC/WEBP/TIFF → AVIF optimizado con nombre SEO
 * Videos:   MP4/MOV/AVI/MKV → MP4 H.264 optimizado con nombre SEO
 */

import sharp from "sharp";
import { readdir, mkdir, stat } from "fs/promises";
import { join, extname, basename } from "path";
import { spawnSync } from "child_process";

// ─── CONFIGURACIÓN ──────────────────────────────────────────────────────────

// Sufijo que se agrega al final de cada nombre de archivo (keywords SEO del proyecto)
const SUFIJO = "mi-proyecto";

// Carpetas de entrada → salida, con sus dimensiones de destino
const CARPETAS = {
  hero:    { width: 2560, height: 1440, fit: "cover" },
  menu:    { width: 800,  height: 600,  fit: "cover" },
  galeria: { width: 1200, height: 900,  fit: "cover" },
};

// Calidad AVIF (0-100). 55-65 es el punto dulce calidad/peso para web.
const CALIDAD_AVIF = 60;

// Rutas de entrada y salida
const DIR_INPUT  = "fotos-raw";
const DIR_OUTPUT = "public/images";
const DIR_VIDEOS = "public/videos";

// Mapa de nombres: parte del nombre original → slug SEO final
// Si el nombre del archivo contiene la clave, se usa el valor como nombre.
// Dejá vacío ({}) para que use el nombre original del archivo como slug.
const MAPA_NOMBRES = {
  // Ejemplo:
  // "exterior":    "fachada-exterior",
  // "interior":    "salon-interior",
  // "plato-dia":   "plato-del-dia",
};

// ─── LÓGICA (no hace falta tocar nada de acá para abajo) ─────────────────────

function detectarFfmpeg() {
  const candidatos = [
    "ffmpeg",
    "/opt/homebrew/bin/ffmpeg",
    "/usr/local/bin/ffmpeg",
    "/Applications/Stremio.app/Contents/MacOS/ffmpeg",
  ];
  for (const bin of candidatos) {
    const r = spawnSync(bin, ["-version"], { stdio: "pipe" });
    if (r.status === 0) return bin;
  }
  return null;
}

const FFMPEG = detectarFfmpeg();

function slugificar(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolverNombreSEO(nombreArchivo) {
  const slug = slugificar(basename(nombreArchivo, extname(nombreArchivo)));
  const clavesOrdenadas = Object.entries(MAPA_NOMBRES).sort(
    ([a], [b]) => b.length - a.length
  );
  for (const [clave, valor] of clavesOrdenadas) {
    if (slug.includes(slugificar(clave))) {
      return `${valor}-${SUFIJO}`;
    }
  }
  return `${slug}-${SUFIJO}`;
}

async function procesarImagen(inputPath, outputDir, config, nombreSEO) {
  await mkdir(outputDir, { recursive: true });
  const outputAvif = join(outputDir, `${nombreSEO}.avif`);

  await sharp(inputPath)
    .resize({
      width: config.width,
      height: config.height,
      fit: config.fit,
      position: "center",
      withoutEnlargement: true,
    })
    .avif({ quality: CALIDAD_AVIF, effort: 6 })
    .toFile(outputAvif);

  const { size } = await stat(outputAvif);
  return (size / 1024).toFixed(1) + "KB";
}

async function procesarVideo(inputPath, outputDir, nombreSEO) {
  await mkdir(outputDir, { recursive: true });
  const outputMp4 = join(outputDir, `${nombreSEO}.mp4`);

  if (!FFMPEG) {
    throw new Error("ffmpeg no encontrado. Instalá con: brew install ffmpeg");
  }

  const result = spawnSync(
    FFMPEG,
    [
      "-y",
      "-i", inputPath,
      "-vf", "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease",
      "-c:v", "libx264",
      "-profile:v", "baseline",
      "-level", "3.1",
      "-crf", "28",
      "-preset", "slow",
      "-movflags", "+faststart",
      "-c:a", "aac",
      "-b:a", "128k",
      "-map_metadata", "-1",
      outputMp4,
    ],
    { stdio: "pipe" }
  );

  if (result.status !== 0) {
    throw new Error(
      result.stderr?.toString().split("\n").slice(-5).join(" ") || "ffmpeg error"
    );
  }

  const { size } = await stat(outputMp4);
  return (size / 1024 / 1024).toFixed(1) + "MB";
}

async function procesarCarpeta(carpetaNombre) {
  const config = CARPETAS[carpetaNombre];
  const inputDir = join(DIR_INPUT, carpetaNombre);
  const outputDirImg = join(DIR_OUTPUT, carpetaNombre);

  let archivos;
  try {
    archivos = await readdir(inputDir);
  } catch {
    console.log(`  ⚠️  ${inputDir}/ no encontrada — saltando`);
    return;
  }

  const imagenes = archivos.filter((f) =>
    /\.(jpe?g|png|webp|heic|heif|tiff?|bmp)$/i.test(f)
  );
  const videos = archivos.filter((f) => /\.(mp4|mov|avi|mkv)$/i.test(f));

  if (imagenes.length === 0 && videos.length === 0) {
    console.log(`  ℹ️  Sin archivos en ${inputDir}/`);
    return;
  }

  if (imagenes.length > 0) {
    console.log(`\n📂 ${carpetaNombre}/  (${config.width}×${config.height}px — ${imagenes.length} fotos)\n`);
    const usados = new Map();
    for (const archivo of imagenes) {
      let nombreSEO = resolverNombreSEO(archivo);
      const count = (usados.get(nombreSEO) ?? 0) + 1;
      usados.set(nombreSEO, count);
      if (count > 1) nombreSEO = `${nombreSEO}-${count}`;
      process.stdout.write(`   ${archivo.padEnd(35)} → ${nombreSEO}.avif`);
      try {
        const size = await procesarImagen(
          join(inputDir, archivo),
          outputDirImg,
          config,
          nombreSEO
        );
        console.log(`  [${size}]`);
      } catch (err) {
        console.log(`  ERROR: ${err.message}`);
      }
    }
  }

  if (videos.length > 0) {
    console.log(`\n🎬 ${carpetaNombre}/videos  (→ ${DIR_VIDEOS}/ — ${videos.length} videos)\n`);
    for (const archivo of videos) {
      const nombreSEO = resolverNombreSEO(archivo);
      process.stdout.write(`   ${archivo.padEnd(35)} → ${nombreSEO}.mp4`);
      try {
        const size = await procesarVideo(
          join(inputDir, archivo),
          DIR_VIDEOS,
          nombreSEO
        );
        console.log(`  [${size}]`);
      } catch (err) {
        console.log(`  ERROR: ${err.message}`);
      }
    }
  }
}

async function main() {
  console.log("\n  Optimizador de imágenes y videos\n");
  for (const carpeta of Object.keys(CARPETAS)) {
    await procesarCarpeta(carpeta);
  }
  console.log("\n✅ Listo.");
  console.log("   Imágenes → public/images/");
  console.log("   Videos   → public/videos/\n");
  console.log("   Si algún nombre quedó raro, editá MAPA_NOMBRES en el script.\n");
}

main().catch(console.error);
