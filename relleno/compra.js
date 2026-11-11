// Relleno demo · Compra — escucha añadir + sesión; emite pedido-confirmado@1
const EVT_ADD = 'ucjc:descubrimiento:anadir-al-carrito@1';
const EVT_SES = 'ucjc:identidad:sesion-cambiada@1';
const EVT_PED = 'ucjc:compra:pedido-confirmado@1';
const css = 'p,button,ul{font:14px/1.4 system-ui,sans-serif;margin:0 0 .5rem}ul{padding-left:1.2rem}code{font-size:12px}button:disabled{opacity:.45}';

class Relleno extends HTMLElement {
  #lineas = [];
  #usuarioId = null;
  #onAdd = (e) => {
    this.#lineas.push({ ...e.detail });
    this.#pintar();
  };
  #onSes = (e) => {
    this.#usuarioId = e.detail?.autenticado ? e.detail.usuario?.id ?? null : null;
    this.#pintar();
  };

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    window.addEventListener(EVT_ADD, this.#onAdd);
    window.addEventListener(EVT_SES, this.#onSes);
    this.#pintar();
  }

  disconnectedCallback() {
    window.removeEventListener(EVT_ADD, this.#onAdd);
    window.removeEventListener(EVT_SES, this.#onSes);
  }

  #total() {
    return this.#lineas.reduce((s, l) => s + l.precio * l.cantidad, 0);
  }

  #pintar() {
    const ses = this.#usuarioId ? `usuarioId: <b>${this.#usuarioId}</b>` : 'sin sesión → no se puede confirmar';
    const items = this.#lineas.length
      ? this.#lineas.map((l) => `<li>${l.nombre} × ${l.cantidad}</li>`).join('')
      : '<li><i>carrito vacío</i></li>';
    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <p><b>Relleno Compra</b> · demo del bus</p>
      <p>${ses}</p>
      <ul>${items}</ul>
      <p>Total: ${this.#total().toFixed(2)} €</p>
      <button type="button" ${this.#usuarioId && this.#lineas.length ? '' : 'disabled'}>Confirmar pedido</button>
      <p><code>escucha ${EVT_ADD}</code><br><code>escucha ${EVT_SES}</code><br><code>emite ${EVT_PED}</code></p>`;
    const btn = this.shadowRoot.querySelector('button');
    if (btn && !btn.disabled) {
      btn.onclick = () => {
        const pedidoId = `PED-DEMO-${Date.now()}`;
        const lineas = this.#lineas.map((l) => ({
          productoId: l.productoId,
          nombre: l.nombre,
          precio: l.precio,
          cantidad: l.cantidad,
        }));
        window.dispatchEvent(
          new CustomEvent(EVT_PED, {
            detail: {
              pedidoId,
              usuarioId: this.#usuarioId,
              creadoEn: new Date().toISOString(),
              total: this.#total(),
              lineas,
            },
          })
        );
        this.#lineas = [];
        this.#pintar();
      };
    }
  }
}

if (!customElements.get('ucjc-compra')) {
  customElements.define('ucjc-compra', Relleno);
}
export default { nombre: 'compra', version: '0.0.0', relleno: true };
