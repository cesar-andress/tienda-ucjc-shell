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

## Cómo producir `remote.js` con Vite (modo librería)

Usad el ejemplo de [`examples/vite.config.js`](examples/vite.config.js):

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

Cada versión vive en su propia carpeta para poder volver atrás. Copiad [`examples/publish-tag.yml`](examples/publish-tag.yml) al repo de vuestra pieza como `.github/workflows/release.yml`. Se dispara con cada tag `v*`, construye y copia `dist/` a `gh-pages/<tag>/` **sin eliminar tags anteriores**.

Luego, en el repo de la pieza: *Settings → Pages* → desplegar desde la rama `gh-pages`, carpeta `/`. La URL queda:

`https://<usuario-o-org>.github.io/tienda-ucjc-<pieza>/v0.1.0/remote.js`

```bash
git tag v0.1.0
git push origin v0.1.0
```

**Un tag no se mueve nunca.** Si hay que corregir algo, se publica `v0.1.1`.

## Formatos del manifest

### Semana 1 (URL explícita por pieza)

Así está `manifest.json` hoy (apuntando a los cuatro rellenos):

```json
{
  "descubrimiento": { "version": "0.1.0", "url": "https://…/v0.1.0/remote.js" },
  "compra":         { "version": "0.1.0", "url": "https://…/v0.1.0/remote.js" },
  "identidad":      { "version": "0.1.0", "url": "https://…/v0.1.0/remote.js" },
  "datos":          { "version": "0.1.0", "url": "https://…/v0.1.0/remote.js" }
}
```

### Desde el viernes 30/10 — incertidumbre 1

El shell ya soporta este segundo formato. La incertidumbre 1 se activa **editando solo `manifest.json`**:

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

Si los cuatro repos viven en cuentas distintas, `base` también puede ser un objeto por pieza (`{ "descubrimiento": "https://dani84mol.github.io", … }`). Se anunciará con el cambio.

## Qué hace el shell

- Pide `./manifest.json` con `cache: "no-store"`.
- Resuelve cualquiera de los dos formatos anteriores.
- Importa en dinámico cada URL, comprueba que el custom element esperado esté registrado y lo monta.
- Si falla: muestra `pieza no disponible` en ese hueco y registra el error.
- Intercepta `EventTarget.prototype.dispatchEvent` para imprimir en consola todos los eventos `ucjc:*`.

## Parte de integración

Cada viernes a las 14:00 se integran aquí las versiones etiquetadas activas. El historial de `manifest.json` es la historia de la tienda.

| Fecha | Descubrimiento | Compra | Identidad | Datos | Notas |
| --- | --- | --- | --- | --- | --- |
| 28/10 | | | | | |
