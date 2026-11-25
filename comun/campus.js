/**
 * Tienda UCJC — funciones comunes de campus (contrato presentación-campus@1).
 * El shell las deja en window.ucjcCampus antes de cargar los remote.js.
 */
(() => {
  const VERSION = '1';

  const HREF_CSS = (() => {
    const enlace = document.querySelector('link[rel="stylesheet"][href*="campus.css"]');
    if (enlace?.href) return enlace.href;
    const scripts = document.getElementsByTagName('script');
    const este = scripts[scripts.length - 1];
    if (este?.src) return new URL('campus.css', este.src).href;
    return new URL('./comun/campus.css', document.baseURI).href;
  })();

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

  /**
   * Entrega campus.css dentro del ShadowRoot para que .ucjc-* funcionen.
   * Las variables --ucjc-* se heredan solas; las clases no.
   */
  function adoptar(raizSombra) {
    if (!(raizSombra instanceof ShadowRoot)) {
      throw new Error('ucjcCampus.adoptar: hace falta el ShadowRoot de la pieza');
    }
    if (raizSombra.querySelector('link[data-ucjc-campus="1"]')) return;
    const enlace = document.createElement('link');
    enlace.rel = 'stylesheet';
    enlace.href = HREF_CSS;
    enlace.dataset.ucjcCampus = '1';
    raizSombra.appendChild(enlace);
  }

  const api = {
    version: VERSION,
    emitir,
    escuchar,
    leerTokens,
    adoptar,
    // Alias cortos por si alguien ya miró el borrador en inglés
    dispatch: emitir,
    on: escuchar,
    tokens: leerTokens,
    adopt: adoptar,
  };

  window.ucjcCampus = Object.freeze(api);
})();
