/**
 * Tienda UCJC — API mínima de campus (contrato presentacion-campus@1).
 * Disponible en window.ucjcCampus antes de cargar los remote.js.
 */
(() => {
  const VERSION = '1';

  function dispatch(nombre, detail) {
    if (typeof nombre !== 'string' || !nombre.startsWith('ucjc:')) {
      throw new Error('ucjcCampus.dispatch: el nombre debe empezar por ucjc:');
    }
    const evento = new CustomEvent(nombre, { detail });
    window.dispatchEvent(evento);
    return evento;
  }

  function on(nombre, handler) {
    if (typeof nombre !== 'string' || !nombre.startsWith('ucjc:')) {
      throw new Error('ucjcCampus.on: el nombre debe empezar por ucjc:');
    }
    window.addEventListener(nombre, handler);
    return () => window.removeEventListener(nombre, handler);
  }

  function tokens() {
    const estilos = getComputedStyle(document.documentElement);
    const leer = (nombre) => estilos.getPropertyValue(nombre).trim();
    return {
      ink: leer('--ucjc-ink'),
      muted: leer('--ucjc-muted'),
      brand: leer('--ucjc-brand'),
      brandBright: leer('--ucjc-brand-bright'),
      leaf: leer('--ucjc-leaf'),
      panel: leer('--ucjc-panel'),
      fog: leer('--ucjc-fog'),
      mist: leer('--ucjc-mist'),
      fontSans: leer('--ucjc-font-sans'),
      fontDisplay: leer('--ucjc-font-display'),
      radius: leer('--ucjc-radius'),
      presentacion: leer('--ucjc-presentacion') || VERSION,
    };
  }

  window.ucjcCampus = Object.freeze({
    version: VERSION,
    dispatch,
    on,
    tokens,
  });
})();
