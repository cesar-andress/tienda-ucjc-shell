// Professor filler: holds the Data / orders slot until the team publishes a tag.
// The custom element name for this piece is ucjc-pedidos (not ucjc-datos).
class Filler extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML =
      '<p style="color:#888;font-style:italic;margin:0">Filler · the <b>datos</b> team has not published a release yet.</p>';
  }
}
if (!customElements.get('ucjc-pedidos')) {
  customElements.define('ucjc-pedidos', Filler);
}
export default { nombre: 'datos', version: '0.0.0', relleno: true };
