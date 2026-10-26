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
- Preparar el miércoles 28/10 (12:00) la integración de las primeras `v0.1.0` válidas.

## 3. Arquitectura de los cuatro micro-frontends

| Pieza (clave en el manifest) | Custom element | Responsabilidad |
| --- | --- | --- |
| `descubrimiento` | `ucjc-descubrimiento` | Catálogo, búsqueda y ficha |
| `compra` | `ucjc-compra` | Carrito y proceso de compra |
| `identidad` | `ucjc-identidad` | Usuario y sesión |
| `datos` | `ucjc-pedidos` | Pedidos y persistencia simulada |

El shell monta cada custom element en su hueco. Un fallo al cargar una URL **no** impide cargar el resto.

Detalle técnico (formato de `remote.js`, Vite en modo librería, workflow de tags, formatos de manifest): [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md).

## 4. Equipos y repositorios

| Equipo | Responsabilidad | Repositorio | Estado general (26/10) |
| --- | --- | --- | --- |
| Descubrimiento | Catálogo, búsqueda y ficha | https://github.com/dani84mol/tienda-ucjc-descubrimiento | Repositorio activo; sin release `v0.1.0` integrada |
| Compra | Carrito y proceso de compra | https://github.com/Alcompar77/tienda-ucjc-compra | Repositorio creado; sin release integrada |
| Identidad | Usuario y sesión | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | Repositorio activo; sin release `v0.1.0` integrada |
| Datos | Pedidos y persistencia simulada | Pendiente de recibir | Sin repositorio conocido |

Los integrantes y el responsable de cada pieza figuran en el **README del repositorio del equipo**. No se duplican aquí.

**Convención de tiempos:** el fichero de registro de horas se llama `TIEMPOS.md` (plural). Si algún equipo usó otro nombre, lo unifica el propio equipo.

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
**No** se usan las URLs de los repos de alumnos como si fueran módulos. El miércoles 28 el profesor actualizará el manifest **a mano** solo con releases válidas. Cambiar la URL en el manifest a un tag anterior es el mecanismo de **rollback**.

La convención de URLs del viernes 30/10 (incertidumbre 1) **no** está activa en el manifest actual.

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
