# Estado inicial de la Tienda UCJC — 26 de octubre de 2026

Fotografía **antes** de la sesión de hoy («Fronteras», 15:30–17:30).  
Fuentes: guion `guion-semana1-tienda-ucjc.pdf`, clones locales en `…/tienda-ucjc/alumnos/`, remotes GitHub.  
**No se han instalado dependencias ni ejecutado código de alumnos.**

Rutas reales en esta máquina (no existe `~/profesor` ni `~/alumnos` en `$HOME`):

- Shell: `…/tienda-ucjc/profesor/tienda-ucjc-shell`
- Contratos: `…/tienda-ucjc/profesor/tienda-ucjc-contratos`
- Alumnos: `…/tienda-ucjc/alumnos/`
- Enunciado / guion: `…/tienda-ucjc/guion-semana1-tienda-ucjc.pdf`

---

## 1. Qué pide el enunciado (y qué no)

### Antes de la clase del lunes 26 (preparación / correo)

Según el guion y lo que los propios equipos registran en sus tiempos, el encargo **previo** a hoy era, en esencia:

1. Constituir equipo y nombrar responsable; avisar al profesor (correo + URL del repo).
2. Crear el repositorio de la pieza e invitar al profesor.
3. README con pieza, integrantes, responsable y nombre del custom element.
4. Proyecto arrancable con un custom element mínimo (p. ej. «Soy Compra»).
5. Borrador de eventos a emitir/consumir (en el README), **propuesta unilateral**, no contrato firmado.
6. Registro de tiempos (`TIEMPOS.md` o equivalente).

### Hoy lunes 26 — sesión «Fronteras» (aula, sin programar hasta el final)

Objetivo de la sesión (guion): salir con fronteras firmadas (Hoja A) y **contrato v0 negociado en papel** (Hojas B), más estimación del encargo de la semana (Hoja C). Tecnología y tags **no** son el foco de hoy.

Al final: fotos de hojas al README; el encargo de la **semana** se anuncia en voz alta.

### Encargo de la semana (plazo miércoles 28 a las 12:00) — aún no vencido hoy

1. Transcribir acuerdos firmados al repo de contratos (PR por equipo; solo eventos que emiten).
2. Publicar **tag `v0.1.0`**: custom element vacío cargable por URL según el README del shell.
3. Abrir issues de conflictos en contratos.

### Lo que **no** es requisito de la primera clase

- Catálogo real, carrito completo, login funcional, persistencia de pedidos.
- Releases en Pages ni integración en el manifest del shell (eso se mira el **miércoles 28**).
- Contratos definitivos en `eventos/` antes de negociar hoy.

---

## 2. Tabla comparativa de los cuatro equipos

| Criterio | Descubrimiento | Compra | Identidad | Datos |
| --- | --- | --- | --- | --- |
| Ruta local | `alumnos/tienda-ucjc-descubrimiento` | `alumnos/tienda-ucjc-compra` | `alumnos/tienda-ucjc-identidad` | — |
| Remoto | https://github.com/dani84mol/tienda-ucjc-descubrimiento | https://github.com/Alcompar77/tienda-ucjc-compra | https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad | Pendiente de recibir |
| Rama | `main` (= `origin/main`) | `main` | `main` | — |
| Último commit | `6237e36` — «TIEMPO.md» (2026-10-25) | `f76af9f` — «Initial commit» (2026-10-21) | `254b7c1` — «correos del equipo» (2026-10-24) | — |
| Responsable en README | Daniel Molina Vitón | No declarado | Sebastián Blanco | — |
| Integrantes en README | 5 nombres | Ninguno | 5 nombres (+ GitHub en varios) | — |
| Tecnología | Vite 8 + JS (package.json) | Ninguna (solo `.gitignore`) | Vite 8 + JS | — |
| Scripts npm | `dev`, `build`, `preview` | No hay `package.json` | `dev`, `build`, `preview` | — |
| `vite.config` librería / `remote.js` | No existe | No | No existe | — |
| Custom element en código | Sí: `ucjc-descubrimiento` («Soy Descubrimiento») | No | Sí: `ucjc-identidad` («Soy Identidad») | — |
| `CustomEvent` en código | No (solo documentado) | No | No (solo documentado) | — |
| Borrador de contratos | Sí, README (truncado) | No | Sí, README | — |
| Tiempos | `TIEMPO.md` (nombre en singular) | No | `TIEMPOS.md` (estim./real vacíos) | — |
| Tags / releases | Ninguno (local ni `ls-remote`) | Ninguno | Ninguno | — |
| CI / publish Pages | No hay `.github/` | No | No hay `.github/` | — |
| URL pública MFE | 404 en Pages probada | 404 | 404 | — |
| Listo para shell (import `remote.js`) | No verificado / no preparado (sin build lib ni export default) | No | No preparado (sin build lib ni export default) | — |

---

## 3. Ficha por repositorio

### 3.1 Descubrimiento

| Campo | Hallazgo |
| --- | --- |
| Ruta | `…/alumnos/tienda-ucjc-descubrimiento` |
| Remoto | `https://github.com/dani84mol/tienda-ucjc-descubrimiento.git` |
| Rama / commit | `main` · `6237e36814ee33023e811935281451d5ce176a18` |
| Integrantes (README) | Daniel Molina Vitón (responsable), Mario González Baranda, Juan Cruz Romero, Jaime Moraleda Loran, Jaime Nicolás Mas |
| Autores Git (commits) | Daniel Molina, JaimeMoraleda, Jmas101, mariete2003, znx1r |
| Tecnología | Vite (`dev`/`build`/`preview`); sin `vite.config.*` en el árbol |
| Archivos | `.gitignore`, `index.html`, `package.json`, `package-lock.json`, `public/*`, `README.md`, `src/main.js`, `TIEMPO.md` |
| Código funcional | Custom element mínimo que pinta un bloque «Soy Descubrimiento». **No** hay catálogo ni botones. |
| Eventos en código | No implementados |
| Eventos propuestos (documentados) | Emite `ucjc:cart:add-item`. Consume `ucjc:session:changed`. Consume opcional `ucjc:cart:updated`. Convención documentada: `ucjc:dominio:accion` + `version` **dentro** del payload. El README **corta a mitad** del JSON de `add-item` (fichero incompleto; no hay detalle de los eventos consumidos). |
| Tags / publicación | Sin tags. Sin workflow. Pages del repo: 404. |
| Integración shell | El elemento tiene el **nombre correcto** (`ucjc-descubrimiento`). Falta artefacto `remote.js`, `export default { nombre, version }`, y modo librería. Hoy solo sirve en `npm run dev` con `index.html` propio. |

### 3.2 Compra

| Campo | Hallazgo |
| --- | --- |
| Ruta | `…/alumnos/tienda-ucjc-compra` |
| Remoto | `https://github.com/Alcompar77/tienda-ucjc-compra.git` |
| Rama / commit | `main` · `f76af9f5459628e5f57167dd15d02e5ae3fac38d` |
| Integrantes | No listados. Único commit: Alessa Comparini ([Alcompar77](https://github.com/Alcompar77)) |
| Responsable | No confirmado en documentación del repo |
| Tecnología / scripts | No hay `package.json` |
| Archivos | Solo `.gitignore` |
| Código / CE / eventos | No existen |
| Borrador / TIEMPOS / tags | No |
| Integración shell | No hay pieza que cargar |

### 3.3 Identidad

| Campo | Hallazgo |
| --- | --- |
| Ruta | `…/alumnos/tienda-ucjc-identidad` |
| Remoto | `https://github.com/ucjc-ecommerce-identidad/tienda-ucjc-identidad.git` |
| Rama / commit | `main` · `254b7c173d62787d107c945f0a0d54a414c3c2f3` |
| Integrantes (README) | Sebastián Blanco (responsable), Olivia Troitiño Frydrych, Ingrid Carvalhais Silva, Fernando Melero Muñoz, Giordano Fabio Castilla García |
| Tecnología | Vite; sin `vite.config.*` |
| Archivos | `.gitignore`, `index.html`, `package.json`, `package-lock.json`, `README.md`, `src/main.js`, `src/ucjc-identidad.js`, `TIEMPOS.md` |
| Código funcional | Custom element que pone el texto «Soy Identidad». Sin UI de login. |
| Eventos en código | No implementados |
| Eventos propuestos | Emite `ucjc:sesion-cambiada:v1`. Escucha `ucjc:sesion-solicitada:v1` y `ucjc:sesion-consultada:v1`. Versión en el **nombre** (`:v1`) y también `version` en `detail`. Documentan `bubbles` y `composed`. |
| TIEMPOS.md | Tabla semana 1 con estimado/real **vacíos** |
| Tags / publicación | Sin tags. Sin `.github/`. Pages: 404. |
| Integración shell | Nombre correcto `ucjc-identidad`. Mismas lagunas de `remote.js` / export default que Descubrimiento. |

### 3.4 Datos

Pendiente de recibir. Sin ruta local, sin remoto, sin responsable confirmado.

---

## 4. Qué ha entregado cada uno vs. encargo inicial (previo al lunes)

| Requisito previo | Descubrimiento | Compra | Identidad | Datos |
| --- | --- | --- | --- | --- |
| Repo + invitación profesor | Sí (repo público) | Repo existe (casi vacío) | Sí | No |
| README con equipo y CE | Sí | No | Sí | No |
| CE mínimo en código | Sí | No | Sí | No |
| Borrador de eventos | Parcial (README truncado) | No | Sí | No |
| Tiempos | `TIEMPO.md` con reales | No | `TIEMPOS.md` sin cifras | No |

**Falta para el plazo del miércoles 28 (12:00)** — aún no exigible esta tarde, pero es el riesgo de integración:

| Equipo | Falta crítica hacia v0.1.0 cargable |
| --- | --- |
| Descubrimiento | Negociar nombres de eventos hoy; completar README; `vite` en modo librería → `remote.js`; tag; URL HTTPS estable |
| Compra | Todo: equipo visible, CE, borrador, tiempos, build, tag |
| Identidad | Negociar nombres hoy; build lib + export; tag; rellenar TIEMPOS |
| Datos | Aparecer |

---

## 5. Incompatibilidades detectadas (no corregidas; material de clase)

1. **Convención de nombres de eventos distinta**
   - Descubrimiento: `ucjc:cart:add-item`, `ucjc:session:changed` (inglés, dominio técnico `cart`/`session`, **sin** `@n` ni `:v1` en el nombre).
   - Identidad: `ucjc:sesion-cambiada:v1` (español, versión como sufijo `:v1`).
   - Convención del bloque / contratos del profesor: `ucjc:<pieza>:<verbo>@<n>` (p. ej. ilustrativo `ucjc:descubrimiento:añadir@1`).
   - Descubrimiento pide consumir `ucjc:session:changed`; Identidad propone emitir `ucjc:sesion-cambiada:v1`. **No coinciden.**

2. **Dónde va la versión**
   - Descubrimiento: `version` solo en el payload.
   - Identidad: versión en el nombre **y** en el payload.
   - Guion/contratos: versión en el nombre `@n`.

3. **Payloads no alineables aún**
   - Descubrimiento → Compra: `productId`, `sku`, `name`, `price`, `currency`, `quantity`, `imageUrl` (Compra no ha propuesto nada).
   - Identidad → Compra/Datos: `autenticado`, `usuario{id,nombre,email}`, `momento`.
   - Sin Compra ni Datos en la mesa de propuestas, cualquier campo es hipotético.

4. **Custom elements**
   - Descubrimiento e Identidad usan los nombres esperados por el shell (`ucjc-descubrimiento`, `ucjc-identidad`).
   - Compra/Datos: inexistentes.
   - Ninguno exporta `{ nombre, version }` ni construye un único `remote.js`.

5. **Acoplamiento**
   - En código: no hay imports cruzados (bien).
   - En borradores: Descubrimiento asume eventos de Compra (`ucjc:cart:updated`) e Identidad con nombres que Identidad no ha escrito igual → acoplamiento **documental** prematuro.

6. **Preparación para contenedor (shell)**
   - Ambos proyectos con código asumen `index.html` + `/src/main.js` en Vite app mode.
   - El shell del profesor hace `import(url)` de un módulo que debe **definir** el CE al cargarse; hace falta salida tipo librería, no la app de desarrollo.

7. **Tiempos**
   - Nombre de fichero distinto (`TIEMPO.md` vs `TIEMPOS.md`); Identidad sin estimaciones rellenadas.

Estas discrepancias **no se han corregido** a propósito: son el material del mercado de contratos de hoy.

---

## 6. Dudas a resolver hoy en clase

- ¿Quiénes son los integrantes y el responsable de **Compra**? ¿Y de **Datos**?
- ¿El README truncado de Descubrimiento es un accidente de entrega o falta el resto del borrador?
- ¿Aceptan renombrar eventos a `ucjc:<pieza>:<verbo>@n` o negociarán otra convención común **por escrito**?
- ¿Compra necesita solo `productId` o todo el snapshot que propone Descubrimiento?
- ¿Identidad usará `sesion` o `session`? ¿`changed` vs `cambiada`?
- ¿Datos existirá antes del miércoles 12:00?

---

## 7. Riesgos para la integración del miércoles 28 (12:00 → sesión Releases)

| Riesgo | Impacto | Señal actual |
| --- | --- | --- |
| Compra sin código ni CE | Hueco de compra = relleno / «pieza no disponible» | Repo vacío |
| Datos ausente | Misma situación en pedidos | Sin repo |
| Sin tags `v0.1.0` | Aunque haya código en `main`, **no cuenta** para el shell | Cero tags en los tres |
| Sin `remote.js` en Pages | El manifest no puede apuntar a una URL real de equipo | 404 Pages |
| Eventos no negociados | Integración visual posible con CE vacío, pero demo de compra/sesión fallará o divergirá | Borradores incompatibles |
| Solo dos equipos «listos» a medias | Tienda del miércoles = 2 rellenos + 2 piezas mínimas en el mejor caso | Descubrimiento + Identidad |

---

## 8. PREGUNTAS PARA LA CLASE DEL 26 DE OCTUBRE

### A Descubrimiento (responsable: Daniel Molina Vitón)

1. En vuestro README el JSON de `ucjc:cart:add-item` está cortado. ¿Falta subir el resto del borrador (`session:changed`, `cart:updated`)?
2. ¿Por qué el dominio del evento es `cart` y no `descubrimiento`? ¿Quién «posee» el nombre del evento según vosotros: el emisor o el recurso de negocio?
3. Si Compra solo necesita `productId` y `quantity`, ¿por qué viajan `name`, `price` e `imageUrl`? ¿Qué pasa si mañana el precio cambia en el catálogo y el carrito se quedó con una copia?
4. Consumís `ucjc:session:changed`: Identidad ha escrito `ucjc:sesion-cambiada:v1`. ¿Lo descubristeis leyendo su README o lo inventasteis? (Hoy no se abre el borrador hasta el plenario: ¿habéis negociado ya fuera de clase?)
5. El fichero se llama `TIEMPO.md` y no `TIEMPOS.md`. ¿Es consciente el equipo de la convención del enunciado?

### A Compra (responsable: por confirmar)

1. ¿Quién es el responsable y quiénes sois en el equipo? ¿Por qué el README no está en el repo?
2. Sin borrador de eventos, ¿qué necesitáis de Descubrimiento al «añadir al carrito» y qué de Identidad al confirmar?
3. ¿Tenéis ya el custom element `ucjc-compra` en algún sitio que no esté en este remoto?
4. ¿Cómo llegaréis a tag `v0.1.0` antes del miércoles 12:00 partiendo de un `.gitignore`?

### A Identidad (responsable: Sebastián Blanco)

1. Elegisteis `ucjc:sesion-cambiada:v1` en lugar de `ucjc:identidad:sesion@1`. ¿Qué gana el sufijo `:v1` frente a `@1`? ¿Habéis leído el contrato de carga / convención del repo de contratos?
2. Emitís el estado de sesión al cargar la pieza. ¿Qué ocurre si Compra se monta **después** y se perdió ese primer evento? (Tenéis `sesion-consultada`: ¿es obligatorio que Compra la dispare?)
3. El payload lleva `email` del usuario. ¿Eso debe verlo Descubrimiento para precios de alumno, o solo Compra/Datos? ¿Es un dato que Identidad quiere publicar a toda la página?
4. `TIEMPOS.md` no tiene estimación ni real. ¿Cuál es la mediana del equipo para el encargo hasta el miércoles 12:00?
5. Solo hay commits de Sebastian en el historial local. ¿El resto del equipo tiene acceso de escritura al repo de la organización?

### A Datos (si aún no hay repo) / al grupo en plenario

1. ¿Existe ya un responsable y una URL, aunque el profesor no la tenga?
2. Sin Datos, ¿quién persistirá el pedido el miércoles en la demo? ¿Compra retiene estado solo en memoria?

### Transversales (mercado de contratos)

1. ¿Unificamos hoy la plantilla `ucjc:<pieza>:<verbo>@n` o firmamos excepciones por escrito?
2. ¿La versión vive en el nombre, en el `detail`, o en ambos? ¿Qué rompe si solo cambia uno?
3. ¿Qué conflictos subirán como issue a https://github.com/cesar-andress/tienda-ucjc-contratos antes del miércoles?

---

## 9. Después de hoy (recordatorio operativo; no ejecutado en esta revisión)

1. Pegar contrato v0 (foto) y abrir PRs de contratos solo con lo **firmado**.
2. Recordar a Compra/Datos el vacío actual.
3. El miércoles a las 12:00: tags → actualizar `manifest.json` del shell (sustituir rellenos).
4. No «arreglar» los nombres de eventos de los alumnos desde el shell: que lo negocien ellos.
