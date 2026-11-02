# Tienda UCJC — shell de integración

**Asignatura:** Desarrollo de Front-End (76042) · UCJC · curso 2026/2027  
**Repositorio:** https://github.com/cesar-andress/tienda-ucjc-shell  
**Tienda en vivo:** https://cesar-andress.github.io/tienda-ucjc-shell/

Este repositorio lo mantiene el profesor. Los equipos de alumnos **no** tienen escritura aquí.

## 1. Presentación

La Tienda UCJC es una práctica de micro-frontends: cuatro equipos independientes construyen cada uno una pieza de interfaz. El **shell** las carga en tiempo de ejecución a partir de `manifest.json`. Las piezas no se importan entre sí; se comunican solo con `CustomEvent` en `window`, según lo acordado en el repositorio de contratos.

## 2. Objetivos docentes

- Vivir fronteras de equipo, contratos de eventos y releases etiquetadas.
- Ver en clase una tienda compuesta aunque falte alguna pieza (relleno o «pieza no disponible»).
- Distinguir código en `main`, **tag**, URL de despliegue y **release activa** del manifest.
- Integrar en el manifest solo releases con `remote.js` HTTPS probado (sin sustituir por la URL del repositorio).

## 3. Arquitectura de los cuatro micro-frontends

| Pieza (clave en el manifest) | Custom element | Responsabilidad |
| --- | --- | --- |
| `descubrimiento` | `ucjc-descubrimiento` | Catálogo, búsqueda y ficha |
| `compra` | `ucjc-compra` | Carrito y proceso de compra |
| `identidad` | `ucjc-identidad` | Usuario y sesión |
| `datos` | `ucjc-pedidos` | Pedidos y persistencia simulada |

El shell monta cada custom element en su hueco. Un fallo al cargar una URL **no** impide cargar el resto.

### Datos en A/B testing

Hay **dos implementaciones** de la pieza Datos. Ambas deben cumplir el mismo contrato de carga (`ucjc-pedidos`, `remote.js`, eventos del PR de contratos). El shell solo tiene **un** hueco `datos`: el profesor elige qué variante está activa.

| Variante | Equipo | Repositorio | Release HTTPS |
| --- | --- | --- | --- |
| **Datos A** | Hans Jefferson Arauco Sanchez | https://github.com/HansJeffAS/tienda-ucjc-datos (**privado**) | Tag `v0.1.0`; sin Pages / sin `remote.js` público; CE actual `ucjc-datos` (canon: `ucjc-pedidos`) |
| **Datos B** | Juan Pedro Faba, Gonzalo Civera, Pablo Blanco | https://github.com/Juampee/ucjc-datos-alt2 (público) | Tag `v0.1.0`; sin Pages / sin `remote.js`; CE actual `ucjc-datos` (canon: `ucjc-pedidos`) |

Detalle técnico: [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md).

## 4. Equipos y repositorios (02/11/2026)

| Equipo | Repositorio | Estado |
| --- | --- | --- |
| Descubrimiento | https://github.com/dani84mol/tienda-ucjc-descubrimiento | Público. Tag `v1.0.0`. **Sin** Pages ni `remote.js`. Deben confirmar contratos en [PR #2](https://github.com/cesar-andress/tienda-ucjc-contratos/pull/2). |
| Compra | https://github.com/Alcompar77/tienda-ucjc-compra | Público. Stub `<ucjc-compra>`. **Sin** tag / Pages / `remote.js`. Confirmar en PR #2. |
| Identidad | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | Público. Stub `<ucjc-identidad>`. **Sin** tag / Pages / `remote.js`. Confirmar en PR #2. |
| Datos A | https://github.com/HansJeffAS/tienda-ucjc-datos | **Privado.** Tag `v0.1.0`. Sin Pages. Renombrar CE a `ucjc-pedidos`. Confirmar en PR #2. |
| Datos B | https://github.com/Juampee/ucjc-datos-alt2 | Público. Tag `v0.1.0`. Sin Pages. Renombrar CE a `ucjc-pedidos`. Confirmar en PR #2. |

Integrantes: ver el README de cada repo. Horas: `TIEMPOS.md` (plural).

**Contratos:** propuestas en [PR #2](https://github.com/cesar-andress/tienda-ucjc-contratos/pull/2) (`propuesto`; aún no en `main`). Hasta firmar/merge, `eventos/` en `main` sigue vacío a propósito.

## 5. Repositorio central de contratos

https://github.com/cesar-andress/tienda-ucjc-contratos

Flujo: **fork + Pull Request** (los equipos no tienen push al original). Ahora el trabajo canónico está en el PR #2 del profesor para que todos comenten OK/NO.

## 6. Contrato técnico de carga

→ [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md)

## 7. URL de repositorio ≠ tag ≠ URL de despliegue ≠ release activa

| Concepto | Qué es |
| --- | --- |
| URL del repositorio | Código en GitHub (no sirve para `import()`) |
| Tag (`v0.1.0`) | Marca inmutable en Git (sola no publica HTTPS) |
| URL de despliegue | HTTPS del `remote.js` (p. ej. Pages) |
| Release activa | Lo que figura **ahora** en `manifest.json` |

Hasta haber `remote.js` público y probado, el manifest apunta a los **rellenos** (`relleno/*.js`, `0.0.0`).  
Esos rellenos son una **demo del bus** con los tres eventos del [PR #2](https://github.com/cesar-andress/tienda-ucjc-contratos/pull/2): login → añadir → confirmar → ver pedidos.  
A **02/11/2026** ninguna pieza de alumno está en el manifest.

## 8. Ejecutar el shell en local

```bash
python3 -m http.server 4173
```

http://127.0.0.1:4173/ — cuatro huecos con relleno.

## 9. GitHub Pages

https://cesar-andress.github.io/tienda-ucjc-shell/

Contenido estático en la raíz (`index.html`, `manifest.json`, `relleno/`, `.nojekyll`).
