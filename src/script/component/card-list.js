/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import './card-item.js';

class CardList extends HTMLElement {
  set meals(meals) {
    this._meals = meals;
    this.render();
  }

  renderError(keyword) {
    this.innerHTML = '';
    this.innerHTML += `<h3>${keyword} not found</h3>`;
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
