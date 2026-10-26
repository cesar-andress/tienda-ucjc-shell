// Professor filler: holds the Purchase slot until the team publishes a tag.
class Filler extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML =
      '<p style="color:#888;font-style:italic;margin:0">Filler · the <b>compra</b> team has not published a release yet.</p>';
  }
}
if (!customElements.get('ucjc-compra')) {
  customElements.define('ucjc-compra', Filler);
}
export default { nombre: 'compra', version: '0.0.0', relleno: true };
