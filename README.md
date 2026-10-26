# Tienda UCJC — registro del profesor

**Asignatura:** Desarrollo de Front-End (76042) · UCJC · curso 2026/2027  
**Fecha de esta fotografía:** 26 de octubre de 2026 (antes de la sesión «Fronteras»)

La Tienda UCJC es una práctica de micro-frontends: cuatro equipos independientes construyen cada uno una pieza de interfaz. El shell del profesor las carga en tiempo de ejecución. Las piezas **no** se importan entre sí; se comunican solo mediante eventos (`CustomEvent` en `window`) documentados en el repositorio central de contratos.

Este repositorio es el **shell de integración**. Los equipos no tienen escritura aquí.

Contrato de carga (cómo publicar un `remote.js`): ver [`docs/CONTRATO-CARGA.md`](docs/CONTRATO-CARGA.md).  
Estado detallado previo a la primera clase: [`docs/ESTADO-INICIAL-2026-10-26.md`](docs/ESTADO-INICIAL-2026-10-26.md).

## Repositorio central de contratos

https://github.com/cesar-andress/tienda-ucjc-contratos

## Los cuatro equipos

| Pieza | Responsabilidad | Responsable confirmado | Repositorio | Estado conocido (26/10) |
| --- | --- | --- | --- | --- |
| **Descubrimiento** | Catálogo, búsqueda y ficha | Daniel Molina Vitón | https://github.com/dani84mol/tienda-ucjc-descubrimiento | Repo con Vite, custom element mínimo «Soy Descubrimiento», borrador de eventos en README (incompleto), `TIEMPO.md`. Sin tags. |
| **Compra** | Carrito y proceso de compra | No confirmado en README | https://github.com/Alcompar77/tienda-ucjc-compra | Solo `.gitignore` (commit inicial). Owner GitHub: [Alcompar77](https://github.com/Alcompar77). Sin README de equipo, sin código, sin tags. |
| **Identidad** | Usuario y sesión | Sebastián Blanco | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | Repo con Vite, custom element mínimo «Soy Identidad», borrador de eventos en README, `TIEMPOS.md` (estimaciones vacías). Sin tags. |
| **Datos** | Pedidos y persistencia simulada | — | Pendiente de recibir | Sin repositorio conocido. |

### Integrantes identificados en README (sin correos)

**Descubrimiento** (README del repo): Daniel Molina Vitón (responsable), Mario González Baranda, Juan Cruz Romero, Jaime Moraleda Loran, Jaime Nicolás Mas. Owner del repo: [dani84mol](https://github.com/dani84mol).

**Compra:** no hay listado de equipo en el repositorio. Único autor del commit inicial: [Alcompar77](https://github.com/Alcompar77) (Alessa Comparini).

**Identidad** (README del repo): Sebastián Blanco (responsable, [@sebasxblanco](https://github.com/sebasxblanco)), Olivia Troitiño Frydrych ([@oliviatroitino](https://github.com/oliviatroitino)), Ingrid Carvalhais Silva, Fernando Melero Muñoz ([@FerMelero](https://github.com/FerMelero)), Giordano Fabio Castilla García ([@Giordano-jpg](https://github.com/Giordano-jpg)).

**Datos:** pendiente.

## Nota sobre despliegues

Una URL de repositorio en GitHub **no** es una URL pública del micro-frontend. A 26/10 no hay evidencia de Pages/`remote.js` publicados por los equipos (las rutas `*.github.io/tienda-ucjc-*` consultadas responden 404). El shell del profesor sí está en Pages: https://cesar-andress.github.io/tienda-ucjc-shell/ (rellenos del profesor).
