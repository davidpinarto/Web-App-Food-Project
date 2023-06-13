/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
class CardContainer extends HTMLElement {
  static render() {
    this.innerHTML = `
        <h2 class="search-result-header">Search Result</h2>

        <card-list></card-list>
    `;
  }
}

customElements.define('card-container', CardContainer);
