# Tienda UCJC — shell de integración

**Asignatura:** Desarrollo de Front-End (76042) · UCJC · curso 2026/2027  
**Repositorio (público):** https://github.com/cesar-andress/tienda-ucjc-shell  
**Tienda en vivo:** https://cesar-andress.github.io/tienda-ucjc-shell/

Este repositorio lo mantiene el profesor. Los equipos de alumnos **no** tienen escritura aquí.

## Situación actual (04/11/2026)

| Hecho | Estado |
| --- | --- |
| Shell en GitHub Pages | **Activo** (rama `main`, carpeta raíz) |
| Repositorio del shell | **Público** |
| `manifest.json` | Cuatro **rellenos** del profesor (`version` `0.0.0`) |
| Piezas de alumnos en el manifest | **Ninguna** todavía |
| Contratos `@1` en `eventos/` de `main` | Solo un **ejemplo** de formato; los tres firmados entran tras el OK en clase |

El `0.0.0` del manifest **no** es la versión que deben publicar los equipos. Es la marca de «aún no he enchufado vuestra release». Los mensajes del bus usan el sufijo de contrato **`@1`** (otro número).

Demo del bus con rellenos: inicio de sesión → añadir al carrito → confirmar pedido → ver pedidos.

### Cómo pensarlo (para alumnos)

Los ficheros de [`relleno/`](relleno/) (por ejemplo [`relleno/compra.js`](relleno/compra.js)) son la **maqueta del comportamiento**:

1. Registran el custom element correcto (`ucjc-compra`, `ucjc-identidad`, …).
2. Escuchan y emiten los mensajes con el **nombre exacto** del contrato (`…@1`).
3. Usan en `detail` los **campos** acordados (p. ej. Compra: `pedidoId`, `usuarioId`, `creadoEn`, `total`, `lineas`).

**Vuestra pieza tiene que hacer lo mismo**, pero en vuestro repositorio, con vuestra UI y publicada como `remote.js` HTTPS — no copiando el relleno al shell. El relleno es la referencia de «qué escucha / qué emite»; el contrato escrito (cuando esté `firmado` en `eventos/`) es la norma. Si el relleno y vuestro código hablan distinto, la tienda no encaja.

## 1. Presentación

La Tienda UCJC es una práctica de micro-frontends: cuatro equipos independientes construyen cada uno una pieza. El **shell** las carga en tiempo de ejecución desde `manifest.json`. Las piezas no se importan entre sí; se comunican solo con `CustomEvent` en `window`, según el repositorio de contratos.

## 2. Objetivos docentes

- Vivir fronteras de equipo, contratos de eventos y releases etiquetadas.
- Ver en clase una tienda compuesta aunque falte alguna pieza (relleno o «pieza no disponible»).
- Distinguir: código en GitHub ≠ tag ≠ URL de `remote.js` ≠ entrada activa del manifest.
- Distinguir: versión del **contrato** (`@1`) ≠ versión de la **release** (`v0.2.0`, `v0.2.1`, …).
- Integrar en el manifest solo `remote.js` HTTPS probados.

## 3. Arquitectura

| Pieza (clave en el manifest) | Custom element | Responsabilidad |
| --- | --- | --- |
| `descubrimiento` | `ucjc-descubrimiento` | Catálogo, búsqueda y ficha |
| `compra` | `ucjc-compra` | Carrito y proceso de compra |
| `identidad` | `ucjc-identidad` | Usuario y sesión |
| `datos` | `ucjc-pedidos` | Pedidos y persistencia simulada |

Un fallo al cargar una URL **no** impide cargar el resto.

### Datos A / Datos B

Hay **dos** implementaciones de Datos. Ambas deben cumplir el mismo contrato de carga (`ucjc-pedidos`, `remote.js`, mismos eventos). El shell solo tiene **un** hueco `datos`: el profesor elige la variante activa.

## 4. Equipos y repositorios (04/11/2026)

Todos los repositorios de alumnos listados aquí son **públicos** (necesario para Pages).

| Equipo | Repositorio | Estado resumido |
| --- | --- | --- |
| Descubrimiento | https://github.com/dani84mol/tienda-ucjc-descubrimiento | Tags `v0.2.0` / `v1.0.0`. `remote.js` en la **raíz** de Pages: [URL](https://dani84mol.github.io/tienda-ucjc-descubrimiento/remote.js) (200). |
| Compra | https://github.com/tienda-ucjc-compra/tienda-ucjc-compra | Tag `v0.2.0` en código/`gh-pages`. Pages de la organización aún **no** sirve la web (404). Hay que activar Pages → rama `gh-pages`. |
| Identidad | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | Tag `v0.2.1`. `remote.js` OK: [URL](https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/v0.2.1/remote.js). |
| Datos A | https://github.com/HansJeffAS/tienda-ucjc-datos | **Público.** Tag `v0.2.0`. `remote.js` OK: [URL](https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.0/remote.js). CE `ucjc-pedidos`. |
| Datos B | https://github.com/Juampee/ucjc-datos-alt2 | Público. Pendiente fusionar [PR #2](https://github.com/Juampee/ucjc-datos-alt2/pull/2), tag `v0.2.0` y Pages. |

**Contratos:** https://github.com/cesar-andress/tienda-ucjc-contratos (público). En `eventos/` de `main` hay un ejemplo de formato. PRs de alumnos #4/#5/#6 abiertas: el profesor **no** las fusiona tal cual; tras OK oral deja los tres contratos canónicos `firmado`.

## 5. Contrato técnico de carga

→ [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md)

## 6. Cuatro conceptos que no se mezclan

| Concepto | Qué es |
| --- | --- |
| URL del repositorio | Código en GitHub (no sirve para `import()`) |
| Tag (`v0.2.0`) | Marca en Git de una release del micro-frontend |
| URL de despliegue | HTTPS del fichero `remote.js` (Pages) |
| Release activa | Lo que figura **ahora** en `manifest.json` |
| Contrato `@1` | Versión del **nombre/campos** del evento (otro número) |

## 7. Ejecutar el shell

**En vivo (preferido en aula):** https://cesar-andress.github.io/tienda-ucjc-shell/

**En local** (si falla la red):

```bash
cd tienda-ucjc-shell
python3 -m http.server 4173
```

http://127.0.0.1:4173/

## 8. GitHub Pages (configuración actual)

- Source: **Deploy from a branch**
- Branch: **`main`** / carpeta **`/`** (raíz)
- Ficheros: `index.html`, `manifest.json`, `relleno/`, `.nojekyll`

Si volviera a dar 404: comprobar que el repo sigue **público** y que Pages sigue apuntando a `main`/(root). Esperar 1–2 minutos tras un push.
