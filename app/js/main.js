/* global gsap, Swiper, WaveSurfer */
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

  // TABS
  // acoustic-panel tabs
  const acousticPanelColorSlider = document.querySelector('.acoustic-panel__sldier');
  const acousticPanelColorItem = document.querySelectorAll('.color-slider__slide-round');

  if (acousticPanelColorSlider) {
    if (acousticPanelColorItem.length > 0) {
      acousticPanelColorItem.forEach((item) => {
        item.style.background = item.getAttribute('data-panel-color');
      });
    }

    acousticPanelColorSlider.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList.contains('color-slider__slide-round')) {
        acousticPanelColorItem.forEach((item) => item.classList.remove('--active'));
        target.classList.add('--active');
      }
    });
  }

  // visualization tabs
  const visualizationTabs = document.querySelectorAll('.visualization__item[data-visualization-tab-id]');
  const visualizationProduct = document.querySelectorAll('.product-slider__slide[data-visualization-id]');

  if (visualizationProduct.length > 0 && visualizationTabs.length > 0) {
    visualizationProduct.forEach((product) => {
      product.addEventListener('click', () => {
        visualizationTabs.forEach((tab) => {
          if (tab.getAttribute('data-visualization-tab-id') === product.getAttribute('data-visualization-id')) {
            tab.classList.add('--active');
            gsap.to(tab, {
              duration: 1,
              display: 'block',
              opacity: 1,
            });
          } else {
            tab.classList.remove('--active');
            gsap.to(tab, {
              duration: 1,
              display: 'none',
              opacity: 0,
            });
          }
        });
      });
    });
  }

  // SLIDERS
  const colorSlider = document.querySelector('.color-slider > .swiper');
  const producrSlider = document.querySelector('.product-slider > .swiper');
  const applicationSlider = document.querySelector('.application-slider > .swiper');
  const articlesSlider = document.querySelector('.articles-slider__slider');

  if (colorSlider) {
    const prevBtn = colorSlider.previousElementSibling;
    const nextBtn = colorSlider.nextElementSibling;

    new Swiper(colorSlider, {
      // Default parameters
      slidesPerView: 4,
      spaceBetween: 16,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
    });
  }

  if (producrSlider) {
    const prevBtn = producrSlider.previousElementSibling;
    const nextBtn = producrSlider.nextElementSibling;

    new Swiper(producrSlider, {
      // Default parameters
      slidesPerView: 3,
      spaceBetween: 16,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
      // Responsive breakpoints
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 32,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1920: {
          slidesPerView: 6,
          spaceBetween: 32,
        },
      },
    });
  }

  if (applicationSlider) {
    const application = applicationSlider.closest('.application');
    const prevBtn = application.querySelector('.slider-button-group__button-prev');
    const nextBtn = application.querySelector('.slider-button-group__button-next');

    new Swiper(applicationSlider, {
      // Default parameters
      slidesPerView: 1,
      spaceBetween: 15,
      loopAdditionalSlides: 2,
      loop: true,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
      // Responsive breakpoints
      breakpoints: {
        768: {
          width: 230,
        },
        1280: {
          width: 350,
          spaceBetween: 15,
        },
        1600: {
          width: 539,
          spaceBetween: 0,
        },
        1920: {
          width: 737,
          spaceBetween: -5,
        },
      },
    });
  }

  if (articlesSlider) {
    new Swiper(articlesSlider, {
      // Default parameters
      slidesPerView: 1,
      spaceBetween: 15,
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
  }

  // VIDEO
  const videoContent = document.querySelector('#video_new_poject');
  const videoButton = document.querySelector('#video_button_play');

  if (videoContent && videoButton) {
    videoButton.addEventListener('click', () => {
      videoContent.play();
    });
  }

  // AUDIO WAWES
  const audioBad = document.querySelector('#wave_audio_bad').getAttribute('data-sound');
  const audioGreat = document.querySelector('#wave_audio_great').getAttribute('data-sound');

  function muteAudio(toggler, audioBad, audioGrat) {
    if (toggler.getAttribute('data-state') === 'audio-bad') {
      audioBad.setVolume(1);
      audioGrat.setVolume(0);
    } else {
      audioBad.setVolume(0);
      audioGrat.setVolume(1);
    }
  }

  if (audioBad && audioGreat) {
    const playerBytton = document.querySelector('#audio_player_button');
    const audioToggler = document.querySelector('.difference__switch-toggler');
    const audioLabels = document.querySelectorAll('.difference__switch-label');

    const wavesSetting = {
      waveColor: '#CACACA',
      progressColor: '#787d46',
      cursorColor: 'transparent',
      height: 100,
      barHeight: 5,
      barMinHeight: 4,
      barWidth: 4,
      barRadius: 2,
      barGap: 3,
    };

    const wavesAudioBad = WaveSurfer.create({ container: '#wave_audio_bad', ...wavesSetting });
    const wavesAudioGreat = WaveSurfer.create({ container: '#wave_audio_great', ...wavesSetting });

    wavesAudioBad.load(audioBad);
    wavesAudioGreat.load(audioGreat);

    playerBytton.addEventListener('click', () => {
      muteAudio(audioToggler, wavesAudioBad, wavesAudioGreat);

      if (playerBytton.getAttribute('data-state') === 'pause') {
        playerBytton.setAttribute('data-state', 'play');

        wavesAudioBad.play();
        wavesAudioGreat.play();
      } else {
        playerBytton.setAttribute('data-state', 'pause');

        wavesAudioBad.pause();
        wavesAudioGreat.pause();
      }
    });

    audioToggler.addEventListener('click', () => {
      if (audioToggler.getAttribute('data-state') === 'audio-bad') {
        audioToggler.setAttribute('data-state', 'audio-great');
        audioToggler.classList.add('--active');

        audioLabels.forEach((label) => {
          if (label.id === 'labe_audio_great') label.classList.add('--active');
          if (label.id === 'labe_audio_bad') label.classList.remove('--active');
        });
      } else {
        audioToggler.setAttribute('data-state', 'audio-bad');
        audioToggler.classList.remove('--active');

        audioLabels.forEach((label) => {
          if (label.id === 'labe_audio_great') label.classList.remove('--active');
          if (label.id === 'labe_audio_bad') label.classList.add('--active');
        });
      }

      muteAudio(audioToggler, wavesAudioBad, wavesAudioGreat);
    });
  }

  // SPOILERS
  const spoilersList = document.querySelectorAll('.spoiler[data-spoiler-state]');

  if (spoilersList.length > 0) {
    spoilersList.forEach((spoiler) => {
      const spoilerHead = spoiler.querySelector('.spoiler__head');
      const spoilerBody = spoiler.querySelector('.spoiler__body');

      spoilerHead.addEventListener('click', () => {
        console.log();

        switch (spoiler.getAttribute('data-spoiler-state')) {
          case 'open':
            spoiler.setAttribute('data-spoiler-state', 'close');
            gsap.to(spoilerBody, {
              duration: 0.5,
              height: 0,
            });
            break;

          case 'close':
            spoiler.setAttribute('data-spoiler-state', 'open');
            gsap.to(spoilerBody, {
              duration: 0.5,
              height: 'auto',
            });
            break;

          default:
            break;
        }
      });
    });
  }
});