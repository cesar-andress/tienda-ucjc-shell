// Relleno del profesor: ocupa el hueco de Descubrimiento hasta que el equipo publique un tag.
class Relleno extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML =
      '<p style="color:#888;font-style:italic;margin:0">Relleno · el equipo de <b>descubrimiento</b> aún no ha publicado una release.</p>';
  }
}
if (!customElements.get('ucjc-descubrimiento')) {
  customElements.define('ucjc-descubrimiento', Relleno);
}
export default { nombre: 'descubrimiento', version: '0.0.0', relleno: true };
