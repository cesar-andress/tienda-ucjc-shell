#!/usr/bin/env node
/**
 * Pruebas de window.ucjcCampus (contrato presentacion-campus@1).
 * Sin dependencias: DOM mínimo en Node.
 *
 *   node scripts/test-campus.mjs
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const CAMPUS_JS = resolve(AQUI, '../comun/campus.js');
const CAMPUS_CSS = resolve(AQUI, '../comun/campus.css');

class FakeEvent {
  constructor(type, init = {}) {
    this.type = type;
    this.detail = init.detail;
  }
}

class FakeTarget {
  constructor() {
    this._l = new Map();
  }
  addEventListener(type, fn) {
    if (!this._l.has(type)) this._l.set(type, new Set());
    this._l.get(type).add(fn);
  }
  removeEventListener(type, fn) {
    this._l.get(type)?.delete(fn);
  }
  dispatchEvent(evento) {
    for (const fn of this._l.get(evento.type) || []) fn(evento);
    return true;
  }
}

class FakeShadowRoot {
  constructor() {
    this.adoptedStyleSheets = [];
  }
}

function cargarCampus() {
  const cssTexto = readFileSync(CAMPUS_CSS, 'utf8');
  const vars = {};
  for (const m of cssTexto.matchAll(/--ucjc-[\w-]+\s*:\s*([^;]+);/g)) {
    vars[m[0].split(':')[0].trim()] = m[1].trim();
  }

  const root = {
    style: {},
  };
  const link = {
    rel: 'stylesheet',
    href: pathToFileURL(CAMPUS_CSS).href,
  };
  const doc = {
    documentElement: root,
    querySelector(sel) {
      if (sel.includes('campus.css')) return link;
      return null;
    },
    getElementsByTagName() {
      return [{ src: pathToFileURL(CAMPUS_JS).href }];
    },
    baseURI: pathToFileURL(resolve(AQUI, '..') + '/').href,
    createElement() {
      return {};
    },
  };

  const win = new FakeTarget();
  win.document = doc;
  win.CustomEvent = FakeEvent;
  win.ShadowRoot = FakeShadowRoot;
  win.CSSStyleSheet = class {
    constructor() {
      this.css = '';
    }
    replaceSync(t) {
      this.css = t;
    }
  };
  win.fetch = async (url) => ({
    ok: true,
    status: 200,
    text: async () => cssTexto,
  });
  win.getComputedStyle = () => ({
    getPropertyValue: (nombre) => vars[nombre] || '',
  });
  win.console = console;

  globalThis.window = win;
  globalThis.document = doc;
  globalThis.CustomEvent = FakeEvent;
  globalThis.ShadowRoot = FakeShadowRoot;
  globalThis.CSSStyleSheet = win.CSSStyleSheet;
  globalThis.getComputedStyle = win.getComputedStyle;
  globalThis.fetch = win.fetch;

  const codigo = readFileSync(CAMPUS_JS, 'utf8');
  // eslint-disable-next-line no-new-func
  Function('window', 'document', 'CustomEvent', 'ShadowRoot', 'CSSStyleSheet', 'getComputedStyle', 'fetch', codigo)(
    win, doc, FakeEvent, FakeShadowRoot, win.CSSStyleSheet, win.getComputedStyle, win.fetch,
  );
  return win.ucjcCampus;
}

async function main() {
  const campus = cargarCampus();
  assert.equal(campus.version, '1');

  assert.throws(() => campus.emitir('malo', {}), /ucjc:/);
  let visto = null;
  const quitar = campus.escuchar('ucjc:prueba@1', (e) => {
    visto = e.detail;
  });
  campus.emitir('ucjc:prueba@1', { ok: true });
  assert.deepEqual(visto, { ok: true });
  quitar();
  visto = null;
  campus.emitir('ucjc:prueba@1', { ok: false });
  assert.equal(visto, null);

  const tokens = campus.leerTokens();
  assert.equal(tokens.presentacion, '1');
  assert.ok(tokens.marca);
  assert.ok(tokens.fuenteTexto);

  const sombra = new FakeShadowRoot();
  await campus.adoptar(sombra);
  assert.equal(sombra.adoptedStyleSheets.length, 1);
  await campus.adoptar(sombra);
  assert.equal(sombra.adoptedStyleSheets.length, 1, 'adoptar es idempotente');

  assert.throws(() => campus.adoptar({}), /ShadowRoot/);

  console.log('ok · test-campus (emitir / escuchar / leerTokens / adoptar)');
}

main().catch((err) => {
  console.error('FAIL', err);
  process.exit(1);
});
