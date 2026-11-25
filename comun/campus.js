/**
 * Tienda UCJC — funciones comunes de campus (contrato presentación-campus@1).
 * El shell las deja en window.ucjcCampus antes de cargar los remote.js.
 */
(() => {
  const VERSION = '1';

  function emitir(nombre, detail) {
    if (typeof nombre !== 'string' || !nombre.startsWith('ucjc:')) {
      throw new Error('ucjcCampus.emitir: el nombre debe empezar por ucjc:');
    }
    const evento = new CustomEvent(nombre, { detail });
    window.dispatchEvent(evento);
    return evento;
  }

  function escuchar(nombre, manejador) {
    if (typeof nombre !== 'string' || !nombre.startsWith('ucjc:')) {
      throw new Error('ucjcCampus.escuchar: el nombre debe empezar por ucjc:');
    }
    window.addEventListener(nombre, manejador);
    return () => window.removeEventListener(nombre, manejador);
  }

  function leerTokens() {
    const estilos = getComputedStyle(document.documentElement);
    const leer = (nombre) => estilos.getPropertyValue(nombre).trim();
    return {
      tinta: leer('--ucjc-ink'),
      suave: leer('--ucjc-muted'),
      marca: leer('--ucjc-brand'),
      marcaClara: leer('--ucjc-brand-bright'),
      hoja: leer('--ucjc-leaf'),
      panel: leer('--ucjc-panel'),
      niebla: leer('--ucjc-fog'),
      bruma: leer('--ucjc-mist'),
      fuenteTexto: leer('--ucjc-font-sans'),
      fuenteTitulo: leer('--ucjc-font-display'),
      radio: leer('--ucjc-radius'),
      presentacion: leer('--ucjc-presentacion') || VERSION,
    };
  }

  const api = {
    version: VERSION,
    emitir,
    escuchar,
    leerTokens,
    // Alias cortos por si alguien ya miró el borrador en inglés
    dispatch: emitir,
    on: escuchar,
    tokens: leerTokens,
  };

  window.ucjcCampus = Object.freeze(api);
})();
