// Professor filler: holds the Identity slot until the team publishes a tag.
class Filler extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML =
      '<p style="color:#888;font-style:italic;margin:0">Filler · the <b>identidad</b> team has not published a release yet.</p>';
  }
}
if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', Filler);
}
export default { nombre: 'identidad', version: '0.0.0', relleno: true };
