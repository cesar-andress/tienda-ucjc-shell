import { defineConfig } from 'vite';

// Copy into your piece repo as vite.config.js.
// Produces a single ES module: dist/remote.js
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      formats: ['es'],
      fileName: () => 'remote.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
