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

## 4. Tabla de equipos y repositorios GitHub

Estado conocido el **26 de octubre de 2026** (antes de la sesión «Fronteras»). Diagnóstico ampliado: [`docs/ESTADO-INICIAL-2026-10-26.md`](docs/ESTADO-INICIAL-2026-10-26.md).

| Pieza | Responsable confirmado | Repositorio | Estado conocido |
| --- | --- | --- | --- |
| Descubrimiento | Daniel Molina Vitón | https://github.com/dani84mol/tienda-ucjc-descubrimiento | Vite + CE mínimo; borrador de eventos (README incompleto); `TIEMPO.md`; sin tags |
| Compra | No confirmado en README | https://github.com/Alcompar77/tienda-ucjc-compra | Solo `.gitignore`; owner [Alcompar77](https://github.com/Alcompar77); sin tags |
| Identidad | Sebastián Blanco | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | Vite + CE mínimo; borrador de eventos; `TIEMPOS.md` vacío; sin tags |
| Datos | — | Pendiente de recibir | Sin repositorio conocido |

### Integrantes identificados en README (sin correos)

- **Descubrimiento:** Daniel Molina Vitón (responsable), Mario González Baranda, Juan Cruz Romero, Jaime Moraleda Loran, Jaime Nicolás Mas. Owner: [dani84mol](https://github.com/dani84mol).
- **Compra:** sin listado en el repo. Único autor del commit inicial: [Alcompar77](https://github.com/Alcompar77) (Alessa Comparini).
- **Identidad:** Sebastián Blanco ([@sebasxblanco](https://github.com/sebasxblanco)), Olivia Troitiño Frydrych ([@oliviatroitino](https://github.com/oliviatroitino)), Ingrid Carvalhais Silva, Fernando Melero Muñoz ([@FerMelero](https://github.com/FerMelero)), Giordano Fabio Castilla García ([@Giordano-jpg](https://github.com/Giordano-jpg)).
- **Datos:** pendiente.

## 5. Repositorio central de contratos

https://github.com/cesar-andress/tienda-ucjc-contratos

Ahí se negocian y firman los eventos. Lo que no está escrito allí no existe para la tienda.

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

La convención de URLs del viernes 30/10 (incertidumbre 1) **no** está activa: el shell ya la soporta en código, pero el `manifest.json` actual sigue el formato de la semana 1 (URL explícita por pieza).

## 8. Ejecutar el shell en local

Desde la raíz de este repositorio (sin instalar dependencias):

```bash
python3 -m http.server 4173
```

Abrir http://127.0.0.1:4173/  

Debéis ver cuatro huecos con los rellenos («el equipo de … aún no ha publicado una release»). La consola debe mostrar `[shell] … cargada` por cada pieza.

## 9. Desplegar en GitHub Pages

Publicación prevista: **https://cesar-andress.github.io/tienda-ucjc-shell/**

Preparación en el repo (ya incluida):

- Contenido estático en la raíz (`index.html`, `manifest.json`, `relleno/`, `.nojekyll`).
- Rutas relativas (`./manifest.json`, `./relleno/…`) válidas bajo el subpath `/tienda-ucjc-shell/`.

Si Pages no estuviera activo, en GitHub: *Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` → Folder: `/ (root)` → Save*.

Tras un push a `main`, esperad uno o dos minutos y recargad la URL con recarga forzada si la caché muestra una versión antigua.
