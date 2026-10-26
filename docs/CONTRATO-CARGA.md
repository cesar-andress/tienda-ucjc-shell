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
4. El módulo **exporta por defecto** `{ nombre, version }`.
5. La comunicación con el resto es **solo** por eventos en `window`:

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

### A. Estado actual (26/10/2026)

El fichero real `manifest.json` del shell apunta a los **cuatro rellenos del profesor**. Versión `0.0.0` y rutas relativas:

```json
{
  "descubrimiento": { "version": "0.0.0", "url": "./relleno/descubrimiento.js" },
  "compra":         { "version": "0.0.0", "url": "./relleno/compra.js" },
  "identidad":      { "version": "0.0.0", "url": "./relleno/identidad.js" },
  "datos":          { "version": "0.0.0", "url": "./relleno/datos.js" }
}
```

Ninguna URL de repositorio GitHub de alumnos forma parte del manifest. Ningún `v0.1.0` de estudiante está activo todavía.

### B. Estado futuro (ilustrativo)

Cuando un equipo publique un `remote.js` HTTPS **probado**, el profesor sustituirá **solo esa entrada** en el manifest. Ejemplo ficticio (no son URLs reales):

```json
{
  "descubrimiento": {
    "version": "0.1.0",
    "url": "https://<usuario>.github.io/tienda-ucjc-descubrimiento/v0.1.0/remote.js"
  },
  "compra":         { "version": "0.0.0", "url": "./relleno/compra.js" },
  "identidad":      { "version": "0.0.0", "url": "./relleno/identidad.js" },
  "datos":          { "version": "0.0.0", "url": "./relleno/datos.js" }
}
```

El resto puede seguir en relleno hasta tener release válida. Volver a una URL/versión anterior en el manifest es el **rollback**.

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
| 28/10 | | | | | |
