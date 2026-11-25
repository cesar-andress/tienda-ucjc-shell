# Tienda UCJC — shell de integración

**Asignatura:** Desarrollo de Front-End (76042) · UCJC · curso 2026/2027  
**Repositorio (público):** https://github.com/cesar-andress/tienda-ucjc-shell  
**Tienda en vivo:** https://cesar-andress.github.io/tienda-ucjc-shell/

Este repositorio lo mantiene el profesor. Los equipos de alumnos **no** tienen escritura aquí.

## Situación actual (25/11/2026) · tag `v0.3.10`

| Hecho | Estado |
| --- | --- |
| Tag / release del shell | **`v0.3.10`** — `comun/campus.*` + `ucjcCampus` (`emitir` / `escuchar` / `leerTokens` / `adoptar`) |
| Shell en GitHub Pages | **Activo** · push a `main` |
| Repositorio del shell | **Público** |
| Semana 1 | **Cerrada** |
| `manifest.json` | Identidad A/B · Descubrimiento A/B/C · Compra A/B/C · Datos A/B (defecto **B**) |
| Contratos | Flujo mínimo + `campana` **firmados** · [`presentacion-campus@1`](https://github.com/cesar-andress/tienda-ucjc-contratos/blob/main/presentacion/ucjc-presentacion-campus%401.md) **propuesto** (firma 30/11) |
| A/B multi | Query `?identidad=a\|b&descubrimiento=a\|b\|c&datos=a\|b&compra=a\|b\|c` |

### Releases enchufadas ahora

| Pieza | Variante | Versión | URL activa |
| --- | --- | --- | --- |
| Identidad | **A** (defecto) | `0.2.7` | https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/v0.2.7/remote.js |
| Identidad | **B** | `0.3.1` | https://cdn.jsdelivr.net/gh/Juampee/ucjc-identidad-plus@gh-pages/v0.3.1/remote.js |
| Descubrimiento | **A** (defecto) | `0.2.8` | https://dani84mol.github.io/tienda-ucjc-descubrimiento/v0.2.8/remote.js |
| Descubrimiento | **B** | `0.1.3` | https://tienda-ucjc-compra.github.io/tienda-ucjc-descubrimiento-B/v0.1.3/remote.js |
| Descubrimiento | **C** | `0.1.0` | https://juampee.github.io/descubrimiento-muy-mejorado/v0.1.0/remote.js |
| Compra | **A** (defecto) | `0.2.0` | https://tienda-ucjc-compra.github.io/tienda-ucjc-compra/v0.2.0/remote.js |
| Compra | **B** | `0.3.0` | https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-compra-b/v0.3.0/remote.js |
| Compra | **C** | `0.3.0` | https://dani84mol.github.io/tienda-ucjc-compra/v0.3.0/remote.js |
| Datos | **A** | `0.2.5` | https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.5/remote.js |
| Datos | **B** (defecto) | `0.4.0` | https://juampee.github.io/ucjc-datos-alt2/v0.4.0/remote.js |

**Conmutar A/B/C (varios huecos a la vez):**

- Sin query: https://cesar-andress.github.io/tienda-ucjc-shell/ → Identidad **A** + Descubrimiento **A** + Datos **B** + Compra **A**
- Identidad B: `?identidad=b`
- Descubrimiento B / C: `?descubrimiento=b` · `?descubrimiento=c`
- Datos A: `?datos=a`
- Compra B / C: `?compra=b` · `?compra=c`
- Combinado: `?identidad=b&descubrimiento=c&datos=a&compra=c`

Recargar al cambiar. Cada pieza con entrada en `ab` tiene su propio conmutador arriba.

### Aviso Identidad B `v0.3.0` (Juan Pedro · `ucjc-identidad-plus`)

Repo: https://github.com/Juampee/ucjc-identidad-plus · tag **`v0.3.0`** · CE `ucjc-identidad` · emite `sesion-cambiada@1`.  
`remote.js` está en la rama `gh-pages` (`v0.3.0/remote.js`), pero GitHub Pages del repo sirve solo la **demo** (workflow `pages.yml` en `main`), así que  
`https://juampee.github.io/ucjc-identidad-plus/v0.3.0/remote.js` responde **404**.  
Mientras tanto el shell usa el espejo HTTPS de jsDelivr (mismo fichero, CORS OK). Cuando Pages publique la carpeta del tag, se puede cambiar la URL del manifest a `*.github.io/.../remote.js`.

### Aviso Datos A `v0.2.4`

Hans publica `https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.4/remote.js`.  
Esa release escucha solo `ucjc:compra:pedido-confirmado@2`. Compra en la tienda sigue emitiendo `@1`.  
Con `?datos=a` el flujo de «Mis pedidos» **no** recibe pedidos nuevos hasta que exista `@2` firmado y Compra lo emita (o Datos A vuelva a escuchar también `@1`).

El número del manifest es la **release** del micro-frontend. Los mensajes del bus usan el sufijo de contrato **`@1`** / **`@2`** (otro número).

### Formato `ab` en el manifest

```json
"ab": {
  "identidad": {
    "defecto": "a",
    "variantes": {
      "a": { "version": "0.2.7", "url": "https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/v0.2.7/remote.js" },
      "b": { "version": "0.3.1", "url": "https://cdn.jsdelivr.net/gh/Juampee/ucjc-identidad-plus@gh-pages/v0.3.1/remote.js" }
    }
  },
  "descubrimiento": {
    "defecto": "a",
    "variantes": {
      "a": { "version": "0.2.8", "url": "https://dani84mol.github.io/tienda-ucjc-descubrimiento/v0.2.8/remote.js" },
      "b": { "version": "0.1.3", "url": "https://tienda-ucjc-compra.github.io/tienda-ucjc-descubrimiento-B/v0.1.3/remote.js" },
      "c": { "version": "0.1.0", "url": "https://juampee.github.io/descubrimiento-muy-mejorado/v0.1.0/remote.js" }
    }
  },
  "datos": { "defecto": "b", "variantes": { "a": { "…": "…" }, "b": { "…": "…" } } },
  "compra": { "defecto": "a", "variantes": { "a": { "…": "…" }, "b": { "…": "…" }, "c": { "…": "…" } } }
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

### Variantes A / B / C

Hay varias implementaciones de la misma pieza (Identidad A/B, Descubrimiento A/B/C, Datos A/B, Compra A/B). Todas deben cumplir el mismo contrato de carga (CE fijo, `remote.js`, mismos eventos firmados). El shell tiene un hueco por pieza; el profesor (o la query) elige la variante activa.

Compra **C** (`dani84mol/tienda-ucjc-compra` `v0.3.0`) ya está enchufada. Las «hojas A/B/C» de Semana 1 siguen siendo material de aula.

## 4. Equipos y repositorios (25/11/2026)

Todos los repositorios de alumnos listados aquí son **públicos** (necesario para Pages).

### Enchufados en el shell (`v0.3.10`)

| Equipo / variante | Repositorio | Tag en shell | `remote.js` |
| --- | --- | --- | --- |
| Identidad A | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | `v0.2.7` | https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/v0.2.7/remote.js |
| Identidad B | https://github.com/Juampee/ucjc-identidad-plus | `v0.3.1` | https://cdn.jsdelivr.net/gh/Juampee/ucjc-identidad-plus@gh-pages/v0.3.1/remote.js |
| Descubrimiento A | https://github.com/dani84mol/tienda-ucjc-descubrimiento | `v0.2.8` | https://dani84mol.github.io/tienda-ucjc-descubrimiento/v0.2.8/remote.js |
| Descubrimiento B | https://github.com/tienda-ucjc-compra/tienda-ucjc-descubrimiento-B | `v0.1.3` | https://tienda-ucjc-compra.github.io/tienda-ucjc-descubrimiento-B/v0.1.3/remote.js |
| Descubrimiento C | https://github.com/Juampee/descubrimiento-muy-mejorado | `v0.1.0` | https://juampee.github.io/descubrimiento-muy-mejorado/v0.1.0/remote.js |
| Compra A | https://github.com/tienda-ucjc-compra/tienda-ucjc-compra | `v0.2.0` | https://tienda-ucjc-compra.github.io/tienda-ucjc-compra/v0.2.0/remote.js |
| Compra B | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-compra-b | `v0.3.0` | https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-compra-b/v0.3.0/remote.js |
| Compra C | https://github.com/dani84mol/tienda-ucjc-compra | `v0.3.0` | https://dani84mol.github.io/tienda-ucjc-compra/v0.3.0/remote.js |
| Datos A | https://github.com/HansJeffAS/tienda-ucjc-datos | `v0.2.5` | https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.5/remote.js |
| Datos B | https://github.com/Juampee/ucjc-datos-alt2 | `v0.4.0` | https://juampee.github.io/ucjc-datos-alt2/v0.4.0/remote.js |

**Contratos:** https://github.com/cesar-andress/tienda-ucjc-contratos — flujo mínimo + `campana` **firmados**; `presentacion-campus@1`, `pedido-confirmado@2` y `moneda-cambiada@1` en **`propuesto`**.

## 5. Contrato técnico de carga

→ [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md)

### Scripts de comprobación (profesor)

→ [`scripts/`](scripts/) — `test-campus.mjs` (API `ucjcCampus`) y `radiografia.mjs` (colores / tokens / listeners en los clones de alumnos). No van a Pages.

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

- Source: rama **`main`** / (deployer nativo de GitHub Pages). El workflow Actions `pages` se retiró: chocaba con el deployer nativo y dejaba el run en rojo aunque el site ya estuviera publicado.
- Ficheros publicados desde la raíz de `main`: `index.html`, `manifest.json`, `relleno/`, `.nojekyll`, `README.md`

Si volviera a dar 404: comprobar que el repo sigue **público** y que Settings → Pages sigue en **Deploy from a branch** → `main` /. Esperar 1–2 minutos tras un push.

## 9. Autoría

Solo `cesar.andress@ucjc.edu` (`César Andrés`). Hooks en `.githooks`: prohibido Cursor/aiserv y cualquier `Co-authored-by:` ajeno.
