// Relleno del profesor: ocupa el hueco de Compra hasta que el equipo publique un tag.
class Relleno extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML =
      '<p style="color:#888;font-style:italic;margin:0">Relleno · el equipo de <b>compra</b> aún no ha publicado una release.</p>';
  }
}
if (!customElements.get('ucjc-compra')) {
  customElements.define('ucjc-compra', Relleno);
}
export default { nombre: 'compra', version: '0.0.0', relleno: true };
