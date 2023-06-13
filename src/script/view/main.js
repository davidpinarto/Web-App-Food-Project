/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
import '../component/card-list.js';
import DataSource from '../data/data-source';

const main = () => {
  const contentContainer = document.getElementById('content-container');
  const searchElement = document.getElementById('searchElement');
  const searchBtnElement = document.getElementById('searchBtnElement');
  const cardList = document.querySelector('card-list');

  const renderResult = (results) => {
    cardList.meals = results;

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

  const fallbackResult = (keyword) => {
    cardList.renderError(keyword);

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
