// Relleno demo · Descubrimiento — emite ucjc:descubrimiento:anadir-al-carrito@1
const EVT = 'ucjc:descubrimiento:anadir-al-carrito@1';
const css = 'p,button{font:14px/1.4 system-ui,sans-serif;margin:0 0 .5rem}code{font-size:12px}';

class Relleno extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>${css}</style>
      <p><b>Relleno Descubrimiento</b> · demo del bus</p>
      <p>Producto demo: Camiseta UCJC · 19,99 €</p>
      <button type="button">Añadir al carrito</button>
      <p><code>${EVT}</code></p>`;
    this.shadowRoot.querySelector('button').onclick = () => {
      window.dispatchEvent(
        new CustomEvent(EVT, {
          detail: {
            productoId: 'prod-101',
            nombre: 'Camiseta UCJC',
            precio: 19.99,
            cantidad: 1,
          },
        })
      );
    };
  }
}

if (!customElements.get('ucjc-descubrimiento')) {
  customElements.define('ucjc-descubrimiento', Relleno);
}
export default { nombre: 'descubrimiento', version: '0.0.0', relleno: true };
