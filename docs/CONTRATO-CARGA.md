# Contrato de carga (shell)

> Documento técnico para alumnos y para el profesor.  
> Visión general, equipos y cómo arrancar el shell: [`../README.md`](../README.md).

El shell lee `manifest.json`, importa el `remote.js` de cada pieza y monta su custom element en el hueco correspondiente. **Solo cuentan las releases etiquetadas.** Lo que no tiene tag no existe para la tienda.

Mientras un equipo no publique, el hueco muestra un relleno del profesor (`relleno/`). Si la URL del manifest falla, el hueco muestra **pieza no disponible**.

Abrid la consola del navegador en clase: cada evento `ucjc:*` se registra como `[evento ucjc]`.

## Contrato de carga (lo que debe publicar cada equipo)

1. **Un único fichero `remote.js`**, módulo ES, ya construido (salida de `vite build`), accesible por HTTPS desde cualquier origen. GitHub Pages cumple CORS; **el repositorio del equipo debe ser público**.
2. Al importarse, el módulo **registra su custom element** con `customElements.define(...)`. Nombres fijos:

   | Pieza (clave del manifest) | Custom element |
   | --- | --- |
   | `descubrimiento` | `ucjc-descubrimiento` |
   | `compra` | `ucjc-compra` |
   | `identidad` | `ucjc-identidad` |
   | `datos` | `ucjc-pedidos` |

3. El módulo **no toca nada fuera de su elemento**: ni `document.body`, ni estilos globales, ni otros elementos. Los estilos van dentro del elemento (Shadow DOM recomendado, no obligatorio).
4. **Presentación campus `@1`** (estilo y script del shell): variables `--ucjc-*`, clases `.ucjc-*` y `window.ucjcCampus` (`emitir`, `escuchar`, `leerTokens`). Contrato firmable en [tienda-ucjc-contratos/presentacion](https://github.com/cesar-andress/tienda-ucjc-contratos/tree/main/presentacion). El shell carga `comun/campus.css` y `comun/campus.js` **antes** de vuestro `remote.js`.
5. El módulo **exporta por defecto** `{ nombre, version }`.
6. La comunicación con el resto es **solo** por eventos en `window`:

   ```js
   window.dispatchEvent(
     new CustomEvent('ucjc:<pieza>:<verbo>@<n>', { detail: { /* campos */ } }),
   );
   window.addEventListener('ucjc:<pieza>:<verbo>@<n>', (e) => { /* ... */ });
   ```

   Los nombres y los campos de `detail` son los firmados en [tienda-ucjc-contratos](https://github.com/cesar-andress/tienda-ucjc-contratos). Un campo que viaja sin estar en el contrato no existe.

   El sufijo `@n` es la **versión del contrato del evento**. La release del micro-frontend usa **otro** número (`v0.1.0`, `v0.2.0`, …). No son equivalentes.

## Cómo producir `remote.js` con Vite (modo librería)

Usad el ejemplo de [`../examples/vite.config.js`](../examples/vite.config.js):

```js
import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      formats: ['es'],
      fileName: () => 'remote.js',
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
```

`npm run build` deja `dist/remote.js`. Ese fichero es el que se publica.

## Publicar cada tag en `gh-pages/vX.Y.Z/` sin borrar los anteriores

Cada versión vive en su propia carpeta para poder volver atrás. Copiad [`../examples/publish-tag.yml`](../examples/publish-tag.yml) al repo de vuestra pieza como `.github/workflows/release.yml`. Se dispara con cada tag `v*`, construye y copia `dist/` a `gh-pages/<tag>/` **sin eliminar tags anteriores**.

Luego, en el repo de la pieza: *Settings → Pages* → desplegar desde la rama `gh-pages`, carpeta `/`. La URL queda:

`https://<usuario-o-org>.github.io/tienda-ucjc-<pieza>/v0.1.0/remote.js`

```bash
git tag v0.1.0
git push origin v0.1.0
```

**Un tag no se mueve nunca.** Si hay que corregir algo, se publica `v0.1.1`.

## Manifest

### A. Estado actual · shell tag `v0.3.9`

El `manifest.json` apunta a releases HTTPS de alumnos.  
`ab` es un **mapa** pieza → `{ defecto, variantes }`. Podéis tener A/B/C en varias piezas a la vez (identidad, descubrimiento, datos, compra).

```json
"ab": {
  "identidad": {
    "defecto": "a",
    "variantes": {
      "a": { "version": "0.2.5", "url": "https://ucjc-ecommerce-identidad.github.io/tienda-ucjc-identidad/v0.2.5/remote.js" },
      "b": { "version": "0.3.0", "url": "https://cdn.jsdelivr.net/gh/Juampee/ucjc-identidad-plus@gh-pages/v0.3.0/remote.js" }
    }
  },
  "descubrimiento": {
    "defecto": "a",
    "variantes": {
      "a": { "version": "0.2.3", "url": "https://dani84mol.github.io/tienda-ucjc-descubrimiento/v0.2.3/remote.js" },
      "b": { "version": "0.1.1", "url": "https://tienda-ucjc-compra.github.io/tienda-ucjc-descubrimiento-B/v0.1.1/remote.js" },
      "c": { "version": "0.1.0", "url": "https://juampee.github.io/descubrimiento-muy-mejorado/v0.1.0/remote.js" }
    }
  },
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

Query: `?identidad=b&descubrimiento=c&datos=a&compra=b`. El formato antiguo (`ab.pieza` + `ab.variantes`) sigue valiendo como un solo slot.  
Identidad B usa jsDelivr mientras `juampee.github.io/.../v0.3.0/remote.js` dé 404 (Pages del repo sirve la demo, no `gh-pages`).

### B. Cómo conmutar A/B/C (aula)

Un conmutador por pieza listada en `ab`. Recargar tras cambiar.  
Editar `manifest.json` y push a `main` para añadir o quitar slots.

### C. Formato alternativo (viernes 30/10 — incertidumbre 1)

El shell **ya soporta** este segundo formato en código, pero **no está activo** en el `manifest.json` actual. Se activará editando solo el manifest:

```json
{
  "base": "https://<usuario-o-org>.github.io",
  "piezas": {
    "descubrimiento": "0.1.0",
    "compra": "0.1.0",
    "identidad": "0.1.0",
    "datos": "0.1.0"
  }
}
```

El shell construye: `${base}/tienda-ucjc-${pieza}/v${version}/remote.js`.

Si los cuatro repos viven en cuentas distintas, `base` también puede ser un objeto por pieza. Se anunciará con el cambio.

## Qué hace el shell

- Pide `./manifest.json` con `cache: "no-store"`.
- Resuelve el formato de URL explícita (semana 1) o el de `base` + `piezas` (cuando se active).
- Importa en dinámico cada URL, comprueba que el custom element esperado esté registrado y lo monta.
- Si falla: muestra `pieza no disponible` en ese hueco y registra el error.
- Intercepta `EventTarget.prototype.dispatchEvent` para imprimir en consola todos los eventos `ucjc:*`.

## Parte de integración

Cada viernes a las 14:00 se revisan las versiones etiquetadas. El historial de `manifest.json` es la historia de la tienda.

| Fecha | Descubrimiento | Compra | Identidad | Datos | Notas |
| --- | --- | --- | --- | --- | --- |
| 28/10 | — | — | — | — | Arranque |
| 04/11 | relleno | relleno | relleno | relleno | Shell + Pages; candidatos HTTPS aún no enchufados |
| 11/11 | `0.2.0` (raíz Pages) | `0.2.0` | `0.2.2` | A `0.2.0` | Tag shell **`v0.2.0`**; contratos **`v0.2.0`**; B en reserva |
| 18/11 | `0.2.3` | `0.2.0` | `0.2.3` | B `0.2.1` (defecto) · A `0.2.0` | Slot A/B genérico (una pieza); reto auditoría |
| 23/11 | `0.2.3` | A `0.2.0` · B `compra-b` `0.2.0` | `0.2.3` | A `0.2.4` · B `0.2.1` (defecto) | Shell **`v0.3.0`** · A/B multi · contratos **`v0.2.4`** (BF `propuesto`) |
| 23/11 (tarde) | `0.2.3` | A `0.2.0` · B `0.2.0` | A `0.2.3` · B plus `0.3.0` | A `0.2.4` · B `0.2.1` | Shell **`v0.3.1`** · Identidad B vía jsDelivr (Pages demo vs `gh-pages`) |
| 23/11 (noche) | `0.2.3` | A `0.2.0` · B `0.2.0` | A `0.2.5` · B plus `0.3.0` | A `0.2.4` · B `0.2.1` | Shell **`v0.3.2`** · Identidad A rediseño; Desc `0.2.5` sigue fuera (aula) |
| 23/11 (noche+) | A `0.2.3` · B `0.1.1` · C `0.1.0` | A `0.2.0` · B `0.2.0` | A `0.2.5` · B plus `0.3.0` | A `0.2.4` · B `0.2.1` | Shell **`v0.3.3`** · `ab.descubrimiento` A/B/C; Compra C sigue fuera |
| 23/11 (UI) | = | = | = | = | Shell **`v0.3.4`** · Pages scroll continuo (mismo manifest) |
| 25/11 | A `0.2.7` · B `0.1.3` · C `0.1.0` | A `0.2.0` · B `0.3.0` · C `0.2.0` | A `0.2.7` · B plus `0.3.1` | A `0.2.5` · B `0.4.0` | Shell **`v0.3.5`** · entrega + lienzo único + Compra C |

Las hojas A/B/C de Semana 1 son material de aula, no variantes del micro-frontend.
