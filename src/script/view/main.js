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
    });

    const mealBtn = document.querySelectorAll('.pop-up-trigger-btn');

    mealBtn.forEach((value) => {
      value.addEventListener('click', () => {
        const popUpElement = document.createElement('div');
        popUpElement.classList.add('pop-up');
        popUpElement.setAttribute('id', 'card-pop-up');

        const popUpOverlay = document.createElement('div');
        popUpOverlay.classList.add('overlay');

        const popUpContent = document.createElement('div');
        popUpContent.classList.add('content');

        const popUpCloseBtn = document.createElement('div');
        popUpCloseBtn.classList.add('close-btn', 'pop-up-close-btn');
        const popUpXMark = document.createElement('i');
        popUpXMark.classList.add('fa-solid', 'fa-circle-xmark');
        popUpCloseBtn.append(popUpXMark);

        const popUpCardItem = document.createElement('div');
        popUpCardItem.classList.add('card-item-pop-up');

        const cardItemChildren = value.parentElement.cloneNode(true).children;

        const arr = [...cardItemChildren];

        for (let i = 0; i < arr.length - 1; i++) {
          popUpCardItem.append(arr[i]);
        }

        const findTheTitleText = arr.filter((child) => child.innerText === arr[0].innerText);
        const findDescriptionByTitle = results
          .filter((child) => child.strMeal === findTheTitleText[0].innerText);

        const mealInstructionsTitle = document.createElement('h3');
        mealInstructionsTitle.innerText = 'Instructions';

        const mealInstructionsBody = document.createElement('p');
        mealInstructionsBody.innerText = findDescriptionByTitle[0].strInstructions;

        popUpCardItem.append(mealInstructionsTitle, mealInstructionsBody);

        popUpContent.append(popUpCloseBtn, popUpCardItem);

        popUpElement.append(popUpOverlay, popUpContent);
        contentContainer.append(popUpElement);
        const popUpToggleFunction = () => {
          popUpElement.classList.toggle('active');
          if (popUpElement.matches('.active')) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = 'auto';
            contentContainer.removeChild(contentContainer.children[2]);
          }
        };

        popUpXMark.addEventListener('click', popUpToggleFunction);
        popUpOverlay.addEventListener('click', popUpToggleFunction);
        popUpToggleFunction();
      });
    });

    const cardContainer = document.querySelector('.card-container');
    const footer = document.querySelector('footer');
    cardContainer.style.display = 'flex';
    footer.style.display = 'block';

    // cardContainer.scrollIntoView({ behavior: 'smooth' });
    function scrollToTargetAdjusted() {
      const element = cardContainer;
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    scrollToTargetAdjusted();
  };

  const fallbackResult = (message) => {
    cardList.innerHTML = '';
    const errorElement = document.createElement('h3');
    errorElement.innerText = `${message} not found`;

    cardList.append(errorElement);

    const cardContainer = document.querySelector('.card-container');
    const footer = document.querySelector('footer');
    cardContainer.style.display = 'flex';
    footer.style.display = 'block';

    function scrollToTargetAdjusted() {
      const element = cardContainer;
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    scrollToTargetAdjusted();
  };

  const onBtnSearchClicked = async () => {
    try {
      const result = await DataSource.listMealByName(searchElement.value);
      const { meals } = result;
      renderResult(meals);
    } catch (message) {
      fallbackResult(searchElement.value);
    }
  };

  searchBtnElement.addEventListener('click', onBtnSearchClicked);

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
