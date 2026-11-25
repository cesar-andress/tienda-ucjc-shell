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
      aviso: leer('--ucjc-warn'),
      panel: leer('--ucjc-panel'),
      niebla: leer('--ucjc-fog'),
      bruma: leer('--ucjc-mist'),
      borde: leer('--ucjc-edge'),
      fuenteTexto: leer('--ucjc-font-sans'),
      fuenteTitulo: leer('--ucjc-font-display'),
      radio: leer('--ucjc-radius'),
      espacio: leer('--ucjc-space'),
      espacioGrande: leer('--ucjc-space-lg'),
      presentacion: leer('--ucjc-presentacion').replace(/["']/g, '') || VERSION,
    };
  }

  /**
   * Entrega campus.css dentro del ShadowRoot para que .ucjc-* funcionen.
   * Las variables --ucjc-* se heredan solas; las clases no.
   * Usa adoptedStyleSheets: la hoja no es un nodo del árbol, así que sobrevive
   * a this.shadowRoot.innerHTML = ... en cada repintado. Una sola hoja compartida.
   */
  let hojaCampus = null;
  let cargandoHoja = null;

  function obtenerHoja() {
    if (hojaCampus) return Promise.resolve(hojaCampus);
    if (!cargandoHoja) {
      cargandoHoja = fetch(HREF_CSS)
        .then((respuesta) => {
          if (!respuesta.ok) throw new Error(`campus.css respondió ${respuesta.status}`);
          return respuesta.text();
        })
        .then((texto) => {
          const hoja = new CSSStyleSheet();
          hoja.replaceSync(texto);
          hojaCampus = hoja;
          return hoja;
        });
    }
    return cargandoHoja;
  }

  function adoptar(raizSombra) {
    if (!(raizSombra instanceof ShadowRoot)) {
      throw new Error('ucjcCampus.adoptar: hace falta el ShadowRoot de la pieza');
    }
    return obtenerHoja()
      .then((hoja) => {
        if (!raizSombra.adoptedStyleSheets.includes(hoja)) {
          raizSombra.adoptedStyleSheets = [hoja, ...raizSombra.adoptedStyleSheets];
        }
      })
      .catch((error) => console.warn('[campus] adoptar:', error.message));
  }

  // Se precarga para que la primera pieza no espere.
  obtenerHoja().catch(() => {});

  window.ucjcCampus = Object.freeze({
    version: VERSION,
    emitir,
    escuchar,
    leerTokens,
    adoptar,
  });
})();
