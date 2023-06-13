/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
class CardItem extends HTMLElement {
  set meal(meal) {
    this._meal = meal;
    this.render();
  }

  render() {
    const table = document.createElement('table');
    for (let i = 1; i <= 20; i++) {
      const ingredient = `strIngredient${i}`;
      const measurement = `strMeasure${i}`;
      if (this._meal[ingredient]) {
        const createRow = document.createElement('tr');

        const ingredientElement = document.createElement('td');
        ingredientElement.innerText = this._meal[ingredient];

        const measurementElement = document.createElement('td');
        measurementElement.innerText = this._meal[measurement];

        createRow.append(ingredientElement, measurementElement);
        table.append(createRow);
      }
    }

    this.innerHTML = `
    <h3>${this._meal.strMeal}</h3>
    <figure>
      <img
        src="${this._meal.strMealThumb}"
        alt="${this._meal.strMeal}-Image"
        class="food-image"
      />
      <figcaption>Category: ${this._meal.strCategory}</figcaption>
    </figure>
    <button class="pop-up-trigger-btn">Read More</button>
    `;
    this.insertBefore(table, this.children[2]);
  }
}

customElements.define('card-item', CardItem);
