/* global gsap, Swiper */
window.addEventListener('DOMContentLoaded', () => {
  // Header-menu
  const headerMenuButton = document.querySelector('.header-menu__button');
  const headerMenuBody = document.querySelector('.header-menu__body');
  const headerMenuList = document.querySelector('.header-menu__list');

  headerMenuButton.addEventListener('click', () => {
    if (headerMenuButton.classList.contains('--active')) {
      headerMenuButton.classList.remove('--active');
      document.body.classList.remove('--lock');

      gsap.to(headerMenuBody, {
        duration: 0.5,
        y: 0,
      });
    } else {
      headerMenuButton.classList.add('--active');
      document.body.classList.add('--lock');

      gsap.to(headerMenuBody, {
        duration: 0.5,
        y: '100%',
      });
    }
  });

  headerMenuList.addEventListener('click', (e) => {
    const documentWidth = document.documentElement.clientWidth;

    if (e.target.classList.contains('header-menu__link') && documentWidth < 1280) {
      e.preventDefault();

      if (e.target.classList.contains('--active')) {
        e.target.classList.remove('--active');

        if (e.target.nextElementSibling.classList.contains('header-menu__submenu')) {
          gsap.to(e.target.nextElementSibling, {
            duration: 0.5,
            height: 0,
          });
        }
      } else {
        e.target.classList.add('--active');

        if (e.target.nextElementSibling.classList.contains('header-menu__submenu')) {
          gsap.to(e.target.nextElementSibling, {
            duration: 0.5,
            height: 'auto',
          });
        }
      }
    }
  });

  // sliders
  const articlesSlider = document.querySelector('.articles-slider__slider');

  new Swiper(articlesSlider, {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 92,
    loop: true,
    navigation: {
      prevEl: '.slider-button-group__button-prev',
      nextEl: '.slider-button-group__button-next',
    },
    // Responsive breakpoints
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1280: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      1920: {
        slidesPerView: 2,
        spaceBetween: 92,
      },
    },
  });

  // video
  const videoContent = document.querySelector('#video-new-poject');
  const videoButton = document.querySelector('#video-button-play');

  videoButton.addEventListener('click', () => {
    videoContent.play();
  });
});
