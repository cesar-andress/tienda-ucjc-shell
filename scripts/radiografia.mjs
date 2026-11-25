#!/usr/bin/env node
/**
 * Radiografía CSS/JS de las diez variantes (como en las transparencias 25/11).
 *
 * Uso:
 *   node scripts/radiografia.mjs
 *   ALUMNOS=/ruta/a/alumnos node scripts/radiografia.mjs
 *
 * Por defecto busca clones en ../../alumnos respecto a este repo
 * (hub tienda-ucjc/alumnos).
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = fileURLToPath(new URL('.', import.meta.url));
const SHELL = resolve(AQUI, '..');
const ALUMNOS = resolve(
  process.env.ALUMNOS || join(SHELL, '..', '..', 'alumnos'),
);

/** Variantes del corte 25/11 (tag = release publicada en el shell). */
const VARIANTES = [
  { nombre: 'Identidad A', tag: 'v0.2.7', dir: 'tienda-ucjc-identidad' },
  { nombre: 'Identidad B', tag: 'v0.3.1', dir: 'ucjc-identidad-plus' },
  { nombre: 'Descubrimiento A', tag: 'v0.2.8', dir: 'tienda-ucjc-descubrimiento' },
  { nombre: 'Descubrimiento B', tag: 'v0.1.3', dir: 'tienda-ucjc-descubrimiento-B' },
  { nombre: 'Descubrimiento C', tag: 'v0.1.0', dir: 'descubrimiento-muy-mejorado' },
  { nombre: 'Compra A', tag: 'v0.2.0', dir: 'tienda-ucjc-compra' },
  { nombre: 'Compra B', tag: 'v0.3.0', dir: 'tienda-ucjc-compra-b' },
  { nombre: 'Compra C', tag: 'v0.3.0', dir: 'tienda-ucjc-compra-c' },
  { nombre: 'Datos A', tag: 'v0.2.5', dir: 'tienda-ucjc-datos' },
  { nombre: 'Datos B', tag: 'v0.4.0', dir: 'ucjc-datos-alt2' },
];

const HEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const RGB = /\brgba?\([^)]+\)/gi;
const HSL = /\bhsla?\([^)]+\)/gi;
const IMPORTANT = /!important\b/g;
const UCJC_VAR = /--ucjc-[\w-]+/g;
const FONT_FAMILY = /font-family\s*:/gi;
const ADD_LISTENER = /\.addEventListener\s*\(/g;
const REMOVE_LISTENER = /\.removeEventListener\s*\(/g;
const CAMPANA = /campana-cambiada@1/;

function listarFuentes(raiz) {
  const src = join(raiz, 'src');
  const base = existsSync(src) ? src : raiz;
  const out = [];
  const walk = (dir) => {
    for (const nombre of readdirSync(dir)) {
      if (nombre === 'node_modules' || nombre === 'dist' || nombre === '.git') continue;
      const ruta = join(dir, nombre);
      const st = statSync(ruta);
      if (st.isDirectory()) walk(ruta);
      else if (/\.(css|js|ts|jsx|tsx)$/.test(nombre) && !/\.test\./.test(nombre)) {
        out.push(ruta);
      }
    }
  };
  if (existsSync(base)) walk(base);
  return out;
}

function hayTests(raiz) {
  const candidatos = [
    join(raiz, 'src'),
    join(raiz, 'test'),
    join(raiz, 'tests'),
    raiz,
  ];
  for (const base of candidatos) {
    if (!existsSync(base)) continue;
    const walk = (dir) => {
      for (const nombre of readdirSync(dir)) {
        const ruta = join(dir, nombre);
        const st = statSync(ruta);
        if (st.isDirectory()) {
          if (nombre === 'node_modules' || nombre === 'dist') continue;
          if (walk(ruta)) return true;
        } else if (/\.test\.(js|ts|mjs|cjs)$/.test(nombre) || nombre === 'vitest.config.js') {
          return true;
        }
      }
      return false;
    };
    if (walk(base)) return true;
  }
  return false;
}

function tipografiaPropia(texto) {
  if (/Inter|Roboto|system-ui|Arial|Helvetica|Poppins|Montserrat/i.test(texto)) {
    const m = texto.match(/font-family\s*:\s*([^;}+]+)/i);
    return (m?.[1] || 'sí').replace(/\s+/g, ' ').trim().slice(0, 40);
  }
  if (FONT_FAMILY.test(texto) && !/--ucjc-font-/.test(texto)) return 'variable propia';
  return 'no';
}

function analizar(raiz) {
  const ficheros = listarFuentes(raiz);
  let colores = 0;
  let important = 0;
  let usaTokens = false;
  let add = 0;
  let remove = 0;
  let campana = false;
  let tipografia = 'no';
  const todo = [];

  for (const f of ficheros) {
    const t = readFileSync(f, 'utf8');
    todo.push(t);
    if (f.endsWith('.css') || /style|css/i.test(f)) {
      colores += (t.match(HEX) || []).length
        + (t.match(RGB) || []).length
        + (t.match(HSL) || []).length;
      important += (t.match(IMPORTANT) || []).length;
    } else {
      // También colores en JS (plantillas)
      colores += (t.match(HEX) || []).length;
      important += (t.match(IMPORTANT) || []).length;
    }
    if (UCJC_VAR.test(t)) usaTokens = true;
    add += (t.match(ADD_LISTENER) || []).length;
    remove += (t.match(REMOVE_LISTENER) || []).length;
    if (CAMPANA.test(t)) campana = true;
  }

  const blob = todo.join('\n');
  tipografia = tipografiaPropia(blob);

  return {
    colores,
    usaTokens,
    important,
    tipografia,
    add,
    remove,
    campana,
    tests: hayTests(raiz),
    ficheros: ficheros.length,
  };
}

function checkoutTag(dir, tag) {
  // Solo informativo: no cambia el working tree. Analiza el árbol actual.
  return existsSync(join(dir, '.git'));
}

console.log(`ALUMNOS=${ALUMNOS}`);
if (!existsSync(ALUMNOS)) {
  console.error('No encuentro la carpeta de clones. Definid ALUMNOS=/ruta/a/alumnos');
  process.exit(1);
}

console.log('\n## Radiografía CSS');
console.log('| Variante | Tag | Colores a mano | Usa --ucjc-* | !important | Tipografía |');
console.log('| --- | --- | ---: | --- | ---: | --- |');

let totalColores = 0;
let conTokens = 0;

for (const v of VARIANTES) {
  const dir = join(ALUMNOS, v.dir);
  if (!existsSync(dir)) {
    console.log(`| ${v.nombre} | ${v.tag} | ¿? | — | — | clone ausente (${v.dir}) |`);
    continue;
  }
  checkoutTag(dir, v.tag);
  const r = analizar(dir);
  totalColores += r.colores;
  if (r.usaTokens) conTokens += 1;
  console.log(
    `| ${v.nombre} | ${v.tag.replace(/^v/, '')} | ${r.colores} | ${r.usaTokens ? '✓' : '✗'} | ${r.important} | ${r.tipografia} |`,
  );
}

console.log(`\nTotales: ${totalColores} colores · ${conTokens} de ${VARIANTES.length} usan --ucjc-*`);

console.log('\n## Radiografía JS / contratos');
console.log('| Variante | Listeners (pone / quita) | Tests | Campaña |');
console.log('| --- | --- | --- | --- |');

for (const v of VARIANTES) {
  const dir = join(ALUMNOS, v.dir);
  if (!existsSync(dir)) {
    console.log(`| ${v.nombre} | — | — | — |`);
    continue;
  }
  const r = analizar(dir);
  const campana = v.nombre.startsWith('Identidad') ? 'n/a' : (r.campana ? '✓' : '✗');
  console.log(
    `| ${v.nombre} | ${r.add} / ${r.remove} | ${r.tests ? '✓' : '✗'} | ${campana} |`,
  );
}

console.log('\nConteo sobre src/ (sin ficheros de test). Clones locales; comprobad el tag con git checkout si hace falta.');
