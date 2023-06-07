const main = () => {
  const testAPI = async () => {
    try {
      const response = await fetch('https://themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
      const responseJson = await response.json();
      console.log(responseJson.meals[0].strInstructions);
    } catch (error) {
      console.log(error);
    }
  };

  // testAPI();

  // toggle pop up
  const popUp = document.getElementById('card-pop-up');
  const readMoreBtn = document.querySelectorAll('.pop-up-trigger-btn');

  readMoreBtn.forEach((value) => {
    console.log(value);
    value.addEventListener('click', () => {
      popUp.classList.toggle('active');
      if (popUp.matches('.active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  });

  // nav-bars
  const topNavigation = document.querySelector('.top-navigation');
  const navBars = document.querySelector('.nav-bars');
  const navXMark = document.querySelector('.nav-xmark');
  const navOverlay = document.querySelector('.nav-overlay');
  console.log(navXMark);

  navBars.addEventListener('click', () => {
    topNavigation.classList.toggle('nav-bars-active');
    navXMark.classList.toggle('nav-xmark-active');
    navOverlay.classList.toggle('.nav-overlay-active');
    if (topNavigation.matches('.top-navigation.nav-bars-active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  navXMark.addEventListener('click', () => {
    topNavigation.classList.toggle('nav-bars-active');
    navXMark.classList.toggle('nav-xmark-active');
    navOverlay.classList.toggle('.nav-overlay-active');
    if (topNavigation.matches('.top-navigation.nav-bars-active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
};

export default main;
