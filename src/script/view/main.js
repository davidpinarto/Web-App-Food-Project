const main = () => {
  // toggle pop up
  const popUp = document.getElementById('card-pop-up');
  const readMoreBtn = document.querySelectorAll('.pop-up-trigger-btn');

  readMoreBtn.forEach((value) => {
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
