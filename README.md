# Tienda UCJC — shell de integración

**Asignatura:** Desarrollo de Front-End (76042) · UCJC · curso 2026/2027  
**Repositorio:** https://github.com/cesar-andress/tienda-ucjc-shell  
**Tienda en vivo:** https://cesar-andress.github.io/tienda-ucjc-shell/

Este repositorio lo mantiene el profesor. Los equipos de alumnos **no** tienen escritura aquí.

## 1. Presentación

La Tienda UCJC es una práctica de micro-frontends: cuatro equipos independientes construyen cada uno una pieza de interfaz. El **shell** las carga en tiempo de ejecución a partir de `manifest.json`. Las piezas no se importan entre sí; se comunican solo con `CustomEvent` en `window`, según lo firmado en el repositorio de contratos.

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

Hay **dos implementaciones** de la pieza Datos que compiten (prueba A/B docente). Ambas deben cumplir el mismo contrato de carga (`ucjc-pedidos`, `remote.js`, eventos firmados). El shell solo tiene **un** hueco `datos` en el manifest: el profesor elige qué variante está activa en cada momento.

| Variante | Equipo | Repositorio / URL de release |
| --- | --- | --- |
| **Datos A** | Hans Jefferson Arauco Sanchez (equipo individual) | https://github.com/HansJeffAS/tienda-ucjc-datos (repo **privado** a 02/11; sin `remote.js` HTTPS público todavía) |
| **Datos B** | Juan Pedro Faba Prados, Gonzalo Civera Núñez, Pablo Blanco Martín | **Pendiente:** aún no han comunicado repositorio ni URL de despliegue |

Detalle técnico (formato de `remote.js`, Vite en modo librería, workflow de tags, formatos de manifest): [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md).

## 4. Equipos y repositorios

| Equipo | Responsabilidad | Repositorio | Estado general (02/11/2026) |
| --- | --- | --- | --- |
| Descubrimiento | Catálogo, búsqueda y ficha | https://github.com/dani84mol/tienda-ucjc-descubrimiento | Hay `<ucjc-descubrimiento>` con catálogo en `main`. Tag Git `v1.0.0` (30/10), pero **sin** GitHub Pages ni `remote.js` HTTPS. Sin Vite en modo librería y sin `export default`. Sin PR a contratos. Eventos en código/README con nombres no canónicos (`ucjc:cart:add-item`, …). Registro de horas como `TIEMPO.md` (singular). |
| Compra | Carrito y proceso de compra | https://github.com/Alcompar77/tienda-ucjc-compra | Hay `<ucjc-compra>` mínimo («Soy Compra»), README con equipo y borrador de eventos, y `TIEMPOS.md`. **Sin** tag, **sin** Pages ni `remote.js`. Sin PR a contratos. Nombres de evento en borrador con sufijo `:v1` (no `@n`). |
| Identidad | Usuario y sesión | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | Hay `<ucjc-identidad>` mínimo y borrador de eventos en el README. Último commit en `main`: 24/10. **Sin** tag, **sin** Pages ni `remote.js`. Sin PR a contratos. |
| Datos A | Pedidos y persistencia (variante A/B) | https://github.com/HansJeffAS/tienda-ucjc-datos (**privado**) | Responsable: Hans Arauco Sanchez. Tag `v0.1.0`, Vite en librería, CE actual `<ucjc-datos>` (canon: `<ucjc-pedidos>`), artefacto `index.js` (canon: `remote.js`), sin Pages públicas. |
| Datos B | Pedidos y persistencia (variante A/B) | *URL no asignada todavía* | Equipo: Faba, Civera, Blanco. Sin repositorio ni release comunicados al profesor a 02/11. |

Los integrantes y el responsable de cada pieza figuran en el **README del repositorio del equipo**. No se duplican aquí.

**Convención de tiempos:** el fichero de registro de horas se llama `TIEMPOS.md` (plural). Si algún equipo usó otro nombre, lo unifica el propio equipo.

**Contratos (02/11/2026):** en [tienda-ucjc-contratos](https://github.com/cesar-andress/tienda-ucjc-contratos) la carpeta `eventos/` sigue vacía; no hay Pull Requests ni Issues abiertos o cerrados.

## 5. Repositorio central de contratos

https://github.com/cesar-andress/tienda-ucjc-contratos

Las propuestas se hacen mediante **fork + Pull Request** (los equipos no tienen push al original).

## 6. Contrato técnico de carga

Cómo debe ser un `remote.js`, nombres de custom elements, ejemplo de `vite.config.js` y workflow de publicación por tag:

→ [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md)

## 7. URL de repositorio ≠ URL de despliegue ≠ tag ≠ release activa

| Concepto | Qué es | Qué no es |
| --- | --- | --- |
| **URL del repositorio** | Código fuente en GitHub | No sirve para `import()` en el shell |
| **Tag** (`v0.1.0`) | Marca inmutable en Git | Por sí solo no publica un fichero HTTPS |
| **URL de despliegue** | HTTPS donde está el `remote.js` (p. ej. GitHub Pages) | No se inventa; hay que probarla |
| **Release activa** | La versión/URL que figura **ahora** en `manifest.json` | Puede no ser el último tag del equipo |

Hasta que un equipo tenga un `remote.js` público y probado, el manifest del shell sigue apuntando a los **rellenos del profesor** (`relleno/*.js`, versión `0.0.0`).  
**No** se usan las URLs de los repos de alumnos como si fueran módulos. El profesor actualiza el manifest **a mano** solo con releases válidas. Cambiar la URL en el manifest a un tag anterior es el mecanismo de **rollback**.

A fecha **02/11/2026** ninguna pieza de alumno está en el manifest: no hay `remote.js` HTTPS verificable en las URLs previstas de Pages.

## 8. Ejecutar el shell en local

Desde la raíz de este repositorio (sin instalar dependencias):

```bash
python3 -m http.server 4173
```

Abrir http://127.0.0.1:4173/  

Debéis ver cuatro huecos con los rellenos. La consola debe mostrar `[shell] … cargada` por cada pieza.

## 9. Desplegar en GitHub Pages

Publicación: **https://cesar-andress.github.io/tienda-ucjc-shell/**

- Contenido estático en la raíz (`index.html`, `manifest.json`, `relleno/`, `.nojekyll`).
- Rutas relativas válidas bajo `/tienda-ucjc-shell/`.

Si hiciera falta reactivar Pages: *Settings → Pages → Deploy from a branch → `main` → `/ (root)`*.
