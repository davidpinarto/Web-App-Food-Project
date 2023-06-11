/* eslint-disable no-underscore-dangle */
class CardList extends HTMLElement {
  set meals(meals) {
    this._meals = meals;
    this.render();
  }

  renderError(message) {
    this.innerHTML = '';
    this.innerHTML += `<h2 class="placeholder">${message}</h2>`;
  }

  render() {
    this.innerHTML = '';
    this._meals.forEach((meal) => {
      const cardItemElement = document.createElement('card-item');
      cardItemElement.meal = meal;
      this.appendChild(cardItemElement);
    });
  }
}

customElements.define('card-list', CardList);
