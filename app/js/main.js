/* global */
window.addEventListener('DOMContentLoaded', () => {
  // Header-menu
  const headerMenu = document.querySelector('.header-menu');

  if (headerMenu) {
    const headerMenuButton = headerMenu.querySelector('.header-menu__button');
    const headerMenuNav = headerMenu.querySelector('.header-menu__nav');

    headerMenuButton.addEventListener('click', () => {
      if (headerMenuNav.classList.contains('--active')) {
        headerMenuNav.classList.remove('--active');
      } else {
        headerMenuNav.classList.add('--active');
      }
    });

    headerMenuNav.addEventListener('click', (e) => {
      e.preventDefault();

      const target = e.target;

      if (target && target.classList.contains('header-menu__nav-link')) {
        if (target.nextElementSibling.classList.contains('header-menu__subnav')) {
          if (target.nextElementSibling.classList.contains('--active')) {
            target.nextElementSibling.classList.remove('--active');
          } else {
            target.nextElementSibling.classList.add('--active');
          }
        }
      }
    });
  }
});
