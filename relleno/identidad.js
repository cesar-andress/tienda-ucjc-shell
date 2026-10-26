// Relleno del profesor: ocupa el hueco de Identidad hasta que el equipo publique un tag.
class Relleno extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML =
      '<p style="color:#888;font-style:italic;margin:0">Relleno · el equipo de <b>identidad</b> aún no ha publicado una release.</p>';
  }
}
if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', Relleno);
}
export default { nombre: 'identidad', version: '0.0.0', relleno: true };
