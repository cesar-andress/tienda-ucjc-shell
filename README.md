# tienda-ucjc-shell

Integration shell for the **UCJC Store** (DFE 76042, UCJC 2026/2027). Owned by the lecturer. Student teams have no write access here.

Live store (after GitHub Pages is enabled on `main`):  
https://cesar-andress.github.io/tienda-ucjc-shell/

The shell reads `manifest.json`, imports each piece’s `remote.js`, and mounts its custom element in the matching slot. **Only tagged releases count.** Whatever is not on a tag does not exist for the store.

Until a team publishes, the slot shows a professor filler from `relleno/`. If a listed URL fails to load, the slot shows **piece unavailable**.

Open the browser console in class: every `ucjc:*` event is logged as `[ucjc event]`.

## Load contract (what every team must ship)

1. **A single `remote.js` file**, ES module, already built (output of `vite build`), reachable over HTTPS from any origin. GitHub Pages satisfies CORS; **the team repository must be public**.
2. On import, the module **registers its custom element** with `customElements.define(...)`. Fixed names:

   | Piece (manifest key) | Custom element |
   | --- | --- |
   | `descubrimiento` | `ucjc-descubrimiento` |
   | `compra` | `ucjc-compra` |
   | `identidad` | `ucjc-identidad` |
   | `datos` | `ucjc-pedidos` |

3. The module **must not touch anything outside its element**: not `document.body`, not global styles, not other elements. Styles stay inside the element (Shadow DOM recommended, not required).
4. The module **default-exports** `{ nombre, version }`.
5. Communication with other pieces happens **only** through events on `window`:

   ```js
   window.dispatchEvent(
     new CustomEvent('ucjc:<pieza>:<verbo>@<n>', { detail: { /* fields */ } }),
   );
   window.addEventListener('ucjc:<pieza>:<verbo>@<n>', (e) => { /* ... */ });
   ```

   Event names and `detail` fields are the ones signed in [tienda-ucjc-contratos](https://github.com/cesar-andress/tienda-ucjc-contratos). A field that travels without being in the contract does not exist.

## Produce `remote.js` with Vite (library mode)

Use the sample at [`examples/vite.config.js`](examples/vite.config.js):

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

`npm run build` leaves `dist/remote.js`. That file is what you publish.

## Publish each tag under `gh-pages/vX.Y.Z/` without deleting previous ones

Each version lives in its own folder so the shell can roll back. Copy [`examples/publish-tag.yml`](examples/publish-tag.yml) into your piece repo as `.github/workflows/release.yml`. It runs on every `v*` tag, builds, and copies `dist/` to `gh-pages/<tag>/` **without removing earlier tags**.

Then in the piece repo: *Settings → Pages* → deploy from branch `gh-pages`, folder `/`. The resulting URL is:

`https://<user-or-org>.github.io/tienda-ucjc-<pieza>/v0.1.0/remote.js`

```bash
git tag v0.1.0
git push origin v0.1.0
```

**Never move a tag.** If you need a fix, publish `v0.1.1`.

## Manifest formats

### Week 1 (explicit URL per piece)

This is what `manifest.json` uses today (pointing at the four fillers):

```json
{
  "descubrimiento": { "version": "0.1.0", "url": "https://…/v0.1.0/remote.js" },
  "compra":         { "version": "0.1.0", "url": "https://…/v0.1.0/remote.js" },
  "identidad":      { "version": "0.1.0", "url": "https://…/v0.1.0/remote.js" },
  "datos":          { "version": "0.1.0", "url": "https://…/v0.1.0/remote.js" }
}
```

### From Friday 30 Oct — uncertainty 1

The shell already supports this second format. Uncertainty 1 is activated by **editing only `manifest.json`**:

```json
{
  "base": "https://<user-or-org>.github.io",
  "piezas": {
    "descubrimiento": "0.1.0",
    "compra": "0.1.0",
    "identidad": "0.1.0",
    "datos": "0.1.0"
  }
}
```

The shell builds: `${base}/tienda-ucjc-${pieza}/v${version}/remote.js`.

If the four piece repos live under different GitHub accounts, `base` may also be an object keyed by piece (`{ "descubrimiento": "https://dani84mol.github.io", … }`). That will be announced with the change.

## What the shell does

- Fetches `./manifest.json` with `cache: "no-store"`.
- Resolves either format above.
- Dynamic-imports each URL, checks that the expected custom element is registered, mounts it.
- On failure: shows `piece unavailable` in that slot and logs the error.
- Patches `EventTarget.prototype.dispatchEvent` to print every `ucjc:*` event to the console.

## Integration log

Every Friday at 14:00 the active tagged versions are integrated here. The history of `manifest.json` is the history of the store.

| Date | Discovery | Purchase | Identity | Data | Notes |
| --- | --- | --- | --- | --- | --- |
| 28/10 | | | | | |
