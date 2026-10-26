// Relleno del profesor: ocupa el hueco de Datos / pedidos hasta que el equipo publique un tag.
// El custom element de esta pieza es ucjc-pedidos (no ucjc-datos).
class Relleno extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML =
      '<p style="color:#888;font-style:italic;margin:0">Relleno · el equipo de <b>datos</b> aún no ha publicado una release.</p>';
  }
}
if (!customElements.get('ucjc-pedidos')) {
  customElements.define('ucjc-pedidos', Relleno);
}
export default { nombre: 'datos', version: '0.0.0', relleno: true };
