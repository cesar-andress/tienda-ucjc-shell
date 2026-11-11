# Tienda UCJC — shell de integración

**Asignatura:** Desarrollo de Front-End (76042) · UCJC · curso 2026/2027  
**Repositorio (público):** https://github.com/cesar-andress/tienda-ucjc-shell  
**Tienda en vivo:** https://cesar-andress.github.io/tienda-ucjc-shell/

Este repositorio lo mantiene el profesor. Los equipos de alumnos **no** tienen escritura aquí.

## Situación actual (11/11/2026) · tag `v0.2.0`

| Hecho | Estado |
| --- | --- |
| Tag / release del shell | **`v0.2.0`** — primera tienda en vivo con piezas de alumnos |
| Shell en GitHub Pages | **Activo** |
| Repositorio del shell | **Público** |
| `manifest.json` | **Cuatro piezas de alumnos** (HTTPS `remote.js`) |
| Rellenos del profesor | Reserva en `relleno/` si alguna URL falla |
| Contratos `@1` | **`firmado`** en [tienda-ucjc-contratos](https://github.com/cesar-andress/tienda-ucjc-contratos) (tag `v0.2.0`) |
| Datos activo | **Variante A** (Hans). B publicada y disponible para conmutar |

### Releases enchufadas ahora

| Pieza | Versión en manifest | URL activa |
| --- | --- | --- |
| Identidad | `0.2.2` | https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/v0.2.2/remote.js |
| Descubrimiento | `0.2.0` | https://dani84mol.github.io/tienda-ucjc-descubrimiento/remote.js |
| Compra | `0.2.0` | https://tienda-ucjc-compra.github.io/tienda-ucjc-compra/v0.2.0/remote.js |
| Datos A | `0.2.0` | https://hansjeffas.github.io/tienda-ucjc-datos/v0.2.0/remote.js |

**Alternativa Datos B** (no activa en el manifest):  
https://juampee.github.io/ucjc-datos-alt2/v0.2.0/remote.js

El número del manifest es la **release** del micro-frontend. Los mensajes del bus usan el sufijo de contrato **`@1`** (otro número).

### Cómo pensarlo (para alumnos)

Los ficheros de [`relleno/`](relleno/) siguen siendo la **maqueta de referencia** (qué escucha / qué emite). Vuestra pieza debe hacer lo mismo en vuestro repo, publicada como `remote.js` HTTPS. Los contratos escritos `firmado` en `eventos/` son la norma.

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

Hay **dos** implementaciones de Datos. Ambas deben cumplir el mismo contrato de carga (`ucjc-pedidos`, `remote.js`, mismos eventos). El shell solo tiene **un** hueco `datos`: el profesor elige la variante activa (hoy **A**).

## 4. Equipos y repositorios (11/11/2026)

Todos los repositorios de alumnos listados aquí son **públicos** (necesario para Pages).

| Equipo | Repositorio | Estado resumido |
| --- | --- | --- |
| Descubrimiento | https://github.com/dani84mol/tienda-ucjc-descubrimiento | Tag `v0.2.0`. `remote.js` en la **raíz** de Pages (activo en el shell). |
| Compra | https://github.com/tienda-ucjc-compra/tienda-ucjc-compra | Tag `v0.2.0`. Pages org OK: `…/v0.2.0/remote.js` (activo). |
| Identidad | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | Tags hasta `v0.2.2`. Activo: `…/v0.2.2/remote.js`. |
| Datos A | https://github.com/HansJeffAS/tienda-ucjc-datos | Público. Tag `v0.2.0`. **Activo** en el hueco `datos`. |
| Datos B | https://github.com/Juampee/ucjc-datos-alt2 | Público. Tag `v0.2.0` + Pages OK. Reserva A/B. |

**Contratos:** https://github.com/cesar-andress/tienda-ucjc-contratos — tres eventos `@1` **`firmado`** en `eventos/`.

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

**En local** (si falla la red; las URLs del manifest siguen siendo HTTPS):

```bash
cd tienda-ucjc-shell
python3 -m http.server 4173
```

http://127.0.0.1:4173/

## 8. GitHub Pages (configuración actual)

- Source: **GitHub Actions** (workflow `pages` en push a `main`)
- Ficheros publicados: `index.html`, `manifest.json`, `relleno/`, `.nojekyll`

Si volviera a dar 404: comprobar que el repo sigue **público** y que el workflow de Pages ha terminado en verde. Esperar 1–2 minutos tras un push.
