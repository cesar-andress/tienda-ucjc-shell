// Relleno demo · Identidad — emite ucjc:identidad:sesion-cambiada@1
const EVT = 'ucjc:identidad:sesion-cambiada@1';
const css = 'p,button{font:14px/1.4 system-ui,sans-serif;margin:0 0 .5rem}button{margin-right:.4rem}code{font-size:12px}';

class Relleno extends HTMLElement {
  #autenticado = false;

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.#pintar();
    this.#emitir();
  }

  #pintar() {
    const estado = this.#autenticado
      ? 'sesión: <b>u-demo</b> (demo@alumno.ucjc.edu)'
      : 'sesión: <i>cerrada</i>';
    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <p><b>Relleno Identidad</b> · demo del bus</p>
      <p>${estado}</p>
      <button type="button" data-a="in">Iniciar sesión</button>
      <button type="button" data-a="out">Cerrar sesión</button>
      <p><code>${EVT}</code></p>`;
    this.shadowRoot.querySelector('[data-a="in"]').onclick = () => {
      this.#autenticado = true;
      this.#pintar();
      this.#emitir();
    };
    this.shadowRoot.querySelector('[data-a="out"]').onclick = () => {
      this.#autenticado = false;
      this.#pintar();
      this.#emitir();
    };
  }

  #emitir() {
    const detail = this.#autenticado
      ? {
          autenticado: true,
          usuario: { id: 'u-demo', email: 'demo@alumno.ucjc.edu', nombre: 'Usuario demo' },
          momento: new Date().toISOString(),
        }
      : { autenticado: false, usuario: null, momento: new Date().toISOString() };
    window.dispatchEvent(new CustomEvent(EVT, { detail }));
  }
}

if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', Relleno);
}
export default { nombre: 'identidad', version: '0.0.0', relleno: true };
