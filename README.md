# Tienda UCJC — shell de integración

**Asignatura:** Desarrollo de Front-End (76042) · UCJC · curso 2026/2027  
**Repositorio (público):** https://github.com/cesar-andress/tienda-ucjc-shell  
**Tienda en vivo:** https://cesar-andress.github.io/tienda-ucjc-shell/

Este repositorio lo mantiene el profesor. Los equipos de alumnos **no** tienen escritura aquí.

## Situación actual (23/11/2026) · tag `v0.3.0`

| Hecho | Estado |
| --- | --- |
| Tag / release del shell | **`v0.3.0`** — A/B en **varias piezas a la vez** (datos + compra) |
| Shell en GitHub Pages | **Activo** · push a `main` |
| Repositorio del shell | **Público** |
| Semana 1 | **Cerrada** |
| `manifest.json` | Identidad `0.2.3` · Descubrimiento `0.2.3` · Compra A/B · Datos A/B (defecto **B**) |
| Contratos `@1` | **`firmado`** en [tienda-ucjc-contratos](https://github.com/cesar-andress/tienda-ucjc-contratos) · BF `pedido-confirmado@2` y `campana-cambiada@1` en **`propuesto`** |
| A/B multi | Bloque `ab` = mapa pieza → `{ defecto, variantes }` · query `?datos=a\|b&compra=a\|b` |

### Releases enchufadas ahora

| Pieza | Variante | Versión | URL activa |
| --- | --- | --- | --- |
| Identidad | — | `0.2.3` | https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/v0.2.3/remote.js |
| Descubrimiento | — | `0.2.3` | https://dani84mol.github.io/tienda-ucjc-descubrimiento/v0.2.3/remote.js |
| Compra | **A** (defecto) | `0.2.0` | https://tienda-ucjc-compra.github.io/tienda-ucjc-compra/v0.2.0/remote.js |
| Compra | **B** | `0.2.0` | https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-compra-b/v0.2.0/remote.js |
| Datos | **A** | `0.2.4` | https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.4/remote.js |
| Datos | **B** (defecto) | `0.2.1` | https://juampee.github.io/ucjc-datos-alt2/v0.2.1/remote.js |

**Conmutar A/B (varios huecos a la vez):**

- Sin query: https://cesar-andress.github.io/tienda-ucjc-shell/ → Datos **B** + Compra **A**
- Datos A: `?datos=a`
- Compra B: `?compra=b`
- Combinado: `?datos=a&compra=b`

Recargar al cambiar. Cada pieza con entrada en `ab` tiene su propio conmutador arriba.

### Aviso Datos A `v0.2.4`

Hans publica `https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.4/remote.js`.  
Esa release escucha solo `ucjc:compra:pedido-confirmado@2`. Compra en la tienda sigue emitiendo `@1`.  
Con `?datos=a` el flujo de «Mis pedidos» **no** recibe pedidos nuevos hasta que exista `@2` firmado y Compra lo emita (o Datos A vuelva a escuchar también `@1`).

El número del manifest es la **release** del micro-frontend. Los mensajes del bus usan el sufijo de contrato **`@1`** / **`@2`** (otro número).

### Formato `ab` en el manifest

```json
"ab": {
  "datos": {
    "defecto": "b",
    "variantes": {
      "a": { "version": "0.2.4", "url": "https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.4/remote.js" },
      "b": { "version": "0.2.1", "url": "https://juampee.github.io/ucjc-datos-alt2/v0.2.1/remote.js" }
    }
  },
  "compra": {
    "defecto": "a",
    "variantes": {
      "a": { "version": "0.2.0", "url": "https://tienda-ucjc-compra.github.io/tienda-ucjc-compra/v0.2.0/remote.js" },
      "b": { "version": "0.2.0", "url": "https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-compra-b/v0.2.0/remote.js" }
    }
  }
}
```

El formato antiguo (`ab.pieza` + `ab.variantes`) sigue leyéndose como un solo slot.

### Cómo pensarlo (para alumnos)

Los ficheros de [`relleno/`](relleno/) siguen siendo la **maqueta de referencia** (qué escucha / qué emite). Vuestra pieza debe hacer lo mismo en vuestro repo, publicada como `remote.js` HTTPS. Los contratos escritos `firmado` en `eventos/` son la norma.

## 1. Presentación

La Tienda UCJC es una práctica de micro-frontends: cuatro equipos independientes construyen cada uno una pieza. El **shell** las carga en tiempo de ejecución desde `manifest.json`. Las piezas no se importan entre sí; se comunican solo con `CustomEvent` en `window`, según el repositorio de contratos.

## 2. Objetivos docentes

- Vivir fronteras de equipo, contratos de eventos y releases etiquetadas.
- Ver en clase una tienda compuesta aunque falte alguna pieza (relleno o «pieza no disponible»).
- Distinguir: código en GitHub ≠ tag ≠ URL de `remote.js` ≠ entrada activa del manifest.
- Distinguir: versión del **contrato** (`@1`) ≠ versión de la **release** (`v0.2.0`, `v0.2.4`, …).
- Integrar en el manifest solo `remote.js` HTTPS probados.
- Probar **variantes A/B** de la misma pieza sin tocar el código de los demás.

## 3. Arquitectura

| Pieza (clave en el manifest) | Custom element | Responsabilidad |
| --- | --- | --- |
| `descubrimiento` | `ucjc-descubrimiento` | Catálogo, búsqueda y ficha |
| `compra` | `ucjc-compra` | Carrito y flujo de compra |
| `identidad` | `ucjc-identidad` | Usuario y sesión |
| `datos` | `ucjc-pedidos` | Pedidos y persistencia simulada |

Un fallo al cargar una URL **no** impide cargar el resto.

### Variantes A / B

Hay **dos** implementaciones de Datos y **dos** de Compra. Todas deben cumplir el mismo contrato de carga (CE fijo, `remote.js`, mismos eventos firmados). El shell tiene un hueco por pieza; el profesor (o la query) elige la variante activa.

**No** hay clave `c` en el shell. Las «hojas A/B/C» de Semana 1 son material de aula, no variantes del micro-frontend.

## 4. Equipos y repositorios (23/11/2026)

Todos los repositorios de alumnos listados aquí son **públicos** (necesario para Pages).

### Enchufados en el shell (`v0.3.0`)

| Equipo / variante | Repositorio | Tag en shell | `remote.js` |
| --- | --- | --- | --- |
| Identidad | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | `v0.2.3` | https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/v0.2.3/remote.js |
| Descubrimiento | https://github.com/dani84mol/tienda-ucjc-descubrimiento | `v0.2.3` | https://dani84mol.github.io/tienda-ucjc-descubrimiento/v0.2.3/remote.js |
| Compra A | https://github.com/tienda-ucjc-compra/tienda-ucjc-compra | `v0.2.0` | https://tienda-ucjc-compra.github.io/tienda-ucjc-compra/v0.2.0/remote.js |
| Compra B | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-compra-b | `v0.2.0` | https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-compra-b/v0.2.0/remote.js |
| Datos A | https://github.com/HansJeffAS/tienda-ucjc-datos | `v0.2.4` | https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.4/remote.js |
| Datos B | https://github.com/Juampee/ucjc-datos-alt2 | `v0.2.1` | https://juampee.github.io/ucjc-datos-alt2/v0.2.1/remote.js |

### Otras pruebas A/B (repos existentes · **no** en el manifest)

| Repo | Quién | Estado |
| --- | --- | --- |
| https://github.com/tienda-ucjc-compra/tienda-ucjc-descubrimiento-B | equipo Compra | Vacío / no usable en Pages |
| https://github.com/Juampee/ucjc-identidad-plus | Juan Pedro | Sin `remote.js` usable para el shell |

**Contratos:** https://github.com/cesar-andress/tienda-ucjc-contratos — tres eventos `@1` **`firmado`** en `eventos/`; Black Friday en `propuesto`.

## 5. Contrato técnico de carga

→ [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md)

## 6. Cuatro conceptos que no se mezclan

| Concepto | Qué es |
| --- | --- |
| URL del repositorio | Código en GitHub (no sirve para `import()`) |
| Tag (`v0.2.4`) | Marca en Git de una release del micro-frontend |
| URL de despliegue | HTTPS del fichero `remote.js` (Pages) |
| Release activa | Lo que figura **ahora** en `manifest.json` (o la variante A/B elegida) |
| Contrato `@1` / `@2` | Versión del **nombre/campos** del evento (otro número) |

## 7. Ejecutar el shell

**En vivo (preferido en aula):** https://cesar-andress.github.io/tienda-ucjc-shell/

**En local** (si falla la red; las URLs del manifest siguen siendo HTTPS):

```bash
cd tienda-ucjc-shell
python3 -m http.server 4173
```

http://127.0.0.1:4173/

## 8. GitHub Pages (configuración actual)

- Source: **GitHub Actions** (workflow `pages` en push a `main`)
- Ficheros publicados: `index.html`, `manifest.json`, `relleno/`, `.nojekyll`, `README.md`

Si volviera a dar 404: comprobar que el repo sigue **público** y que el workflow de Pages ha terminado en verde. Esperar 1–2 minutos tras un push.

## 9. Autoría

Solo `cesar.andress@ucjc.edu` (`César Andrés`). Hooks en `.githooks`: prohibido Cursor/aiserv y cualquier `Co-authored-by:` ajeno.
