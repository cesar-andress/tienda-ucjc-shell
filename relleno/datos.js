// Relleno demo · Datos (ucjc-pedidos) — escucha pedido-confirmado + sesión
const EVT_PED = 'ucjc:compra:pedido-confirmado@1';
const EVT_SES = 'ucjc:identidad:sesion-cambiada@1';
const css = 'p,ul{font:14px/1.4 system-ui,sans-serif;margin:0 0 .5rem}ul{padding-left:1.2rem}code{font-size:12px}';

class Relleno extends HTMLElement {
  #pedidos = [];
  #usuarioId = null;
  #onPed = (e) => {
    this.#pedidos.push(e.detail);
    this.#pintar();
  };
  #onSes = (e) => {
    if (!e.detail?.autenticado) {
      this.#usuarioId = null;
      this.#pintar();
      return;
    }
    this.#usuarioId = e.detail.usuario?.id ?? null;
    this.#pintar();
  };

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    window.addEventListener(EVT_PED, this.#onPed);
    window.addEventListener(EVT_SES, this.#onSes);
    this.#pintar();
  }

  disconnectedCallback() {
    window.removeEventListener(EVT_PED, this.#onPed);
    window.removeEventListener(EVT_SES, this.#onSes);
  }

  #pintar() {
    const visibles = this.#usuarioId
      ? this.#pedidos.filter((p) => p.usuarioId === this.#usuarioId)
      : [];
    const lista = !this.#usuarioId
      ? '<li><i>sin sesión — lista vacía</i></li>'
      : visibles.length
        ? visibles
            .map(
              (p) =>
                `<li><b>${p.pedidoId}</b> · ${p.total.toFixed(2)} € · ${p.lineas.length} línea(s)</li>`
            )
            .join('')
        : '<li><i>sin pedidos para este usuario</i></li>';
    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <p><b>Relleno Datos</b> · CE <code>ucjc-pedidos</code> · demo del bus</p>
      <p>Filtro: ${this.#usuarioId ? `<b>${this.#usuarioId}</b>` : '<i>ninguno</i>'}</p>
      <ul>${lista}</ul>
      <p><code>escucha ${EVT_PED}</code><br><code>escucha ${EVT_SES}</code></p>`;
  }
}

if (!customElements.get('ucjc-pedidos')) {
  customElements.define('ucjc-pedidos', Relleno);
}
export default { nombre: 'datos', version: '0.0.0', relleno: true };
