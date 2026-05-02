/**
 * Inyecta EXIF GPS (Latitud / Longitud) en TODOS los .jpg de public/assets/
 * apuntando a La Florida, Santiago de Chile.
 * Útil para subir a Google Business Profile y posicionar en Google Maps.
 *
 * USO:  node optimize-images/geotag-jpgs.mjs
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import piexif from "piexifjs";

const DIR = "public/assets";

// La Florida, Santiago — ~2 cuadras del Metro San José de la Estrella
const LAT = -33.5212;
const LON = -70.5985;

// Convierte decimal a [grados, minutos, segundos] en formato "racional" EXIF
function toDMS(deg) {
  const abs = Math.abs(deg);
  const d = Math.floor(abs);
  const minFloat = (abs - d) * 60;
  const m = Math.floor(minFloat);
  const s = Math.round((minFloat - m) * 60 * 10000); // precisión 4 decimales
  return [[d, 1], [m, 1], [s, 10000]];
}

async function geotag(file) {
  const path = join(DIR, file);
  const buf = await readFile(path);
  const dataUrl = "data:image/jpeg;base64," + buf.toString("base64");

  let exif;
  try {
    exif = piexif.load(dataUrl);
  } catch {
    exif = { "0th": {}, "Exif": {}, "GPS": {}, "Interop": {}, "1st": {}, thumbnail: null };
  }

  exif.GPS = exif.GPS || {};
  exif.GPS[piexif.GPSIFD.GPSVersionID]    = [2, 3, 0, 0];
  exif.GPS[piexif.GPSIFD.GPSLatitudeRef]  = LAT >= 0 ? "N" : "S";
  exif.GPS[piexif.GPSIFD.GPSLatitude]     = toDMS(LAT);
  exif.GPS[piexif.GPSIFD.GPSLongitudeRef] = LON >= 0 ? "E" : "W";
  exif.GPS[piexif.GPSIFD.GPSLongitude]    = toDMS(LON);

  // Metadata útil para SEO / Google Business
  exif["0th"][piexif.ImageIFD.ImageDescription] = "Ecos Sonoterapia · La Florida, Santiago de Chile";
  exif["0th"][piexif.ImageIFD.Artist]           = "Fanny Villagra — Ecos Sonoterapia";
  exif["0th"][piexif.ImageIFD.Copyright]        = "© Ecos Sonoterapia";

  const exifBytes = piexif.dump(exif);
  const newDataUrl = piexif.insert(exifBytes, dataUrl);
  const newBuf = Buffer.from(newDataUrl.replace(/^data:image\/jpeg;base64,/, ""), "base64");
  await writeFile(path, newBuf);
}

async function main() {
  console.log("\n  Geotagging JPGs (La Florida, Santiago)\n");
  const archivos = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f));
  for (const f of archivos) {
    process.stdout.write(`   ${f.padEnd(55)}`);
    try {
      await geotag(f);
      console.log("  ✅");
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
    }
  }
  console.log(`\n✅ Listo. ${archivos.length} archivos con GPS ${LAT}, ${LON}\n`);
}

main().catch(console.error);
