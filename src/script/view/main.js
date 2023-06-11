/* eslint-disable no-plusplus */
import DataSource from '../data/data-source';

const main = () => {
  const contentContainer = document.getElementById('content-container');
  const searchElement = document.getElementById('searchElement');
  const searchBtnElement = document.getElementById('searchBtnElement');
  const cardList = document.querySelector('.card-list');

  const renderResult = (results) => {
    cardList.innerHTML = '';
    results.forEach((value) => {
      const cardItem = document.createElement('div');
      cardItem.classList.add('card-item');

      const mealTitle = document.createElement('h3');
      mealTitle.innerText = value.strMeal;

      const imgThumbContainer = document.createElement('figure');
      const imgThumb = document.createElement('img');
      imgThumb.setAttribute('src', `${value.strMealThumb}`);
      imgThumb.setAttribute('alt', `${value.strMeal}-image`);
      imgThumb.classList.add('food-image');
      const imgThumbCaption = document.createElement('figcaption');
      imgThumbCaption.innerText = `Category: ${value.strCategory}`;
      imgThumbContainer.append(imgThumb, imgThumbCaption);

      const ingredientTable = document.createElement('table');
      const tableHeaderRow = document.createElement('tr');
      const ingredientTh = document.createElement('th');
      ingredientTh.innerText = 'Ingredients';
      const measurementTh = document.createElement('th');
      measurementTh.innerText = 'Measurement';

      tableHeaderRow.append(ingredientTh, measurementTh);
      ingredientTable.append(tableHeaderRow);

      for (let i = 1; i <= 20; i++) {
        const ingredient = `strIngredient${i}`;
        const measurement = `strMeasure${i}`;
        if (value[ingredient]) {
          const createRow = document.createElement('tr');
          const ingredientElement = document.createElement('td');
          ingredientElement.innerText = value[ingredient];
          const measurementElement = document.createElement('td');
          measurementElement.innerText = value[measurement];

          createRow.append(ingredientElement, measurementElement);
          ingredientTable.append(createRow);
        }
      }

      const mealBtn = document.createElement('button');
      mealBtn.classList.add('pop-up-trigger-btn');
      mealBtn.innerText = 'Read More';

      cardItem.append(
        mealTitle,
        imgThumbContainer,
        ingredientTable,
        mealBtn,
      );
      cardList.append(cardItem);
      // console.log(value.strMeal);
    });

    // toggle pop up
    const popUp = document.getElementById('card-pop-up');
    const mealBtn = document.querySelectorAll('.pop-up-trigger-btn');
    const popUpCloseElement = document.querySelectorAll('.pop-up-close-btn');

    mealBtn.forEach((value) => {
      value.addEventListener('click', () => {
        contentContainer.removeChild(contentContainer.children[2]);
        const popUpElement = document.createElement('div');
        popUpElement.classList.add('pop-up');
        popUpElement.setAttribute('id', 'card-pop-up');

        const popUpOverlay = document.createElement('div');
        popUpOverlay.classList.add('overlay');
      });
    });

    // const popUpToggleFunction = () => {
    //   popUp.classList.toggle('active');
    //   if (popUp.matches('.active')) {
    //     document.body.style.overflow = 'hidden';
    //   } else {
    //     document.body.style.overflow = 'auto';
    //   }
    // };

    // mealBtn.forEach((value) => {
    //   value.addEventListener('click', popUpToggleFunction);
    // });

    // popUpCloseElement.forEach((value) => {
    //   value.addEventListener('click', popUpToggleFunction);
    // });
  };

  const fallbackResult = (message) => {
    cardList.innerHTML = '';
    const errorElement = document.createElement('h3');
    errorElement.innerText = `${message} not found`;

    cardList.append(errorElement);
  };

  const onBtnSearchClicked = async () => {
    try {
      const result = await DataSource.listMealByName(searchElement.value);
      const { meals } = result;
      if (meals.length > 8) meals.length = 8;
      // console.log(meals[0].strMeal);
      renderResult(meals);
    } catch (message) {
      // console.error(message);
      fallbackResult(searchElement.value);
    }
  };

  searchBtnElement.addEventListener('click', onBtnSearchClicked);

  // nav-bars
  const topNavigation = document.querySelector('.top-navigation');
  const navBars = document.querySelector('.nav-bars');
  const navXMark = document.querySelector('.nav-xmark');
  const navOverlay = document.querySelector('.nav-overlay');

  const navToggle = [navBars, navXMark, navOverlay];

  navToggle.forEach((value) => {
    value.addEventListener('click', () => {
      topNavigation.classList.toggle('nav-bars-active');
      navXMark.classList.toggle('nav-xmark-active');
      navOverlay.classList.toggle('nav-overlay-active');
      if (topNavigation.matches('.top-navigation.nav-bars-active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  });
};

export default main;
