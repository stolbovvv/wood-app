/* global gsap, Power0, Swiper, WaveSurfer */
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

  // TABS COLORS
  const colorContainers = document.querySelectorAll('.color-slider');

  if (colorContainers.length > 0) {
    colorContainers.forEach((container) => {
      const colors = container.querySelectorAll('.color-slider__slide-round');

      if (colors.length > 0) {
        colors.forEach((item) => {
          item.style.background = item.getAttribute('data-panel-color');
        });
      }

      container.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('color-slider__slide-round')) {
          colors.forEach((item) => item.classList.remove('--active'));
          target.classList.add('--active');
        }
      });
    });
  }

  // VISUALIZATION TABS
  const visualizationTabs = document.querySelectorAll('.visualization__item[data-visualization-tab-id]');
  const visualizationTriggers = document.querySelectorAll('.visualization-slider__slide[data-visualization-id]');

  if (visualizationTriggers.length > 0 && visualizationTabs.length > 0) {
    visualizationTriggers.forEach((product) => {
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

  // VIDEO
  const videoContent = document.querySelector('#video_new_poject');
  const videoButton = document.querySelector('#video_button_play');

  if (videoContent && videoButton) {
    videoButton.addEventListener('click', () => {
      videoContent.play();
    });
  }

  // AUDIO WAWES
  const audioBad = document.querySelector('#wave_audio_bad');
  const audioGreat = document.querySelector('#wave_audio_great');

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

    wavesAudioBad.load(audioBad.getAttribute('data-sound'));
    wavesAudioGreat.load(audioGreat.getAttribute('data-sound'));

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
  const spoilerContainer = document.querySelectorAll('.spoilers-container');

  function createAnimationForSpoiler(element) {
    const body = element.querySelector('.spoiler__body');
    const head = element.querySelector('.spoiler__head');
    const icon = element.querySelector('.spoiler__head-icon');

    gsap.set(body, { height: 'auto' });

    const animationBody = gsap
      .from(body, {
        height: 0,
        duration: 0.25,
        ease: Power0.easeNone,
      })
      .reverse();

    const animationHead = gsap
      .to(head, {
        color: '#787d46',
        duration: 0.25,
        ease: Power0.easeNone,
      })
      .reverse();

    const animationIcon = gsap
      .to(icon, {
        rotation: 90,
        duration: 0.1,
        ease: Power0.easeNone,
      })
      .reverse();

    return function (clickedHead) {
      if (clickedHead === head) {
        animationBody.reversed(!animationBody.reversed());
        animationHead.reversed(!animationHead.reversed());
        animationIcon.reversed(!animationIcon.reversed());
      } else {
        animationBody.reverse();
        animationHead.reverse();
        animationIcon.reverse();
      }
    };
  }

  if (spoilerContainer.length > 0) {
    spoilerContainer.forEach((container) => {
      const spoilersGroup = gsap.utils.toArray(container.querySelectorAll('.spoiler'));
      const spoilersHead = gsap.utils.toArray(container.querySelectorAll('.spoiler__head'));
      const spoilersToggles = spoilersGroup.map(createAnimationForSpoiler);

      function toggleMenu(clickedHead) {
        spoilersToggles.forEach((toggleFn) => toggleFn(clickedHead));
      }

      spoilersHead.forEach((menu) => {
        menu.addEventListener('click', () => toggleMenu(menu));
      });
    });
  }

  // SELECTS
  const selectsArray = document.querySelectorAll('.custom-select');

  function animationActiveSelect(element, icon) {
    element.classList.add('--active');
    gsap.to(icon, { rotation: 90, duration: 0.25 });
  }
  function animationDeactivationSelect(element, icon) {
    element.classList.remove('--active');
    gsap.to(icon, { rotation: 0, duration: 0.25 });
  }
  function animationSelect(element) {
    const icon = element.querySelector('.goods__summary-size-select-icon');

    if (element.classList.contains('--active')) {
      animationDeactivationSelect(element, icon);
    } else {
      animationActiveSelect(element, icon);
    }
  }

  if (selectsArray.length > 0) {
    selectsArray.forEach((select) => {
      const selectBody = select.querySelector('select');
      select.classList.remove('--active');
      selectBody.addEventListener('click', () => animationSelect(select));
      selectBody.addEventListener('blur', () => {
        animationDeactivationSelect(select, select.querySelector('.goods__summary-size-select-icon'));
      });
    });
  }

  // COUNTER
  const counterArray = document.querySelectorAll('.goods-counter');

  if (counterArray.length > 0) {
    counterArray.forEach((counter) => {
      const input = counter.querySelector('input.goods-counter__input');
      const incrementBtn = counter.querySelector('.goods-counter__button[data-type="increment"]');
      const decrementBtn = counter.querySelector('.goods-counter__button[data-type="decrement"]');

      counter.addEventListener('click', (e) => {
        if (e.target && e.target === incrementBtn) input.value = +input.value + 1;
        if (e.target && e.target === decrementBtn && input.value > 0) input.value = +input.value - 1;
      });
    });
  }

  // SLIDERS
  const colorSlider = document.querySelectorAll('.color-slider');
  const visualizationSlider = document.querySelector('.visualization-slider');
  const applicationSlider = document.querySelector('.application-slider');
  const articlesSlider = document.querySelector('.articles-slider__slider');
  const acousticPanelSlider = document.querySelectorAll('.acoustic-panel');
  const goodsSlider = document.querySelector('.goods-slider__slider');
  const ordersSlider = document.querySelector('.personal-area__orders-slider');

  if (colorSlider.length > 0) {
    colorSlider.forEach((slider) => {
      new Swiper(slider.querySelector('.swiper'), {
        // Default parameters
        slidesPerView: 'auto',
        navigation: {
          prevEl: slider.querySelector('.color-slider__button-prev'),
          nextEl: slider.querySelector('.color-slider__button-next'),
        },
      });
    });
  }

  if (visualizationSlider) {
    const slider = visualizationSlider.querySelector('.swiper');
    const prevBtn = slider.previousElementSibling;
    const nextBtn = slider.nextElementSibling;

    new Swiper(slider, {
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
    const slider = applicationSlider.querySelector('.swiper');
    const application = slider.closest('.application');
    const prevBtn = application.querySelector('.slider-button-group__button-prev');
    const nextBtn = application.querySelector('.slider-button-group__button-next');

    new Swiper(slider, {
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

  if (acousticPanelSlider.length > 0) {
    acousticPanelSlider.forEach((item) => {
      const slider = item.querySelector('.acoustic-panel__img-swiper');
      const prevBtn = item.querySelector('.slider-button-group__button-prev');
      const nextBtn = item.querySelector('.slider-button-group__button-next');

      new Swiper(slider, {
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 15,
        effect: 'fade',
        loop: true,
        navigation: {
          prevEl: prevBtn,
          nextEl: nextBtn,
        },
      });
    });
  }

  if (goodsSlider) {
    new Swiper(goodsSlider, {
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
          slidesPerView: 4,
          spaceBetween: 32,
        },
      },
    });
  }

  if (ordersSlider) {
    new Swiper(ordersSlider, {
      // Default parameters
      slidesPerView: 1,
      spaceBetween: 15,
      direction: 'vertical',
      navigation: {
        prevEl: '.personal-area__orders-button-prev',
        nextEl: '.personal-area__orders-button-next',
      },
      // Responsive breakpoints
      breakpoints: {},
    });
  }

  // SAMPLES
  const samplesSelectorList = document.querySelector('.samples__selector-list');
  const samplesSelectorInfo = document.querySelector('.samples__selector-info');
  const samplesSelectorTotal = document.querySelector('.samples__selector-total');
  const samplesGallery = document.querySelector('.samples__gallery');

  function updateSampleSum(arrElements, attr) {
    let total = 0;

    arrElements.forEach((item) => (total += +item.getAttribute(attr)));

    return total;
  }

  function createSampleThumbnail(id, thubnailSrc) {
    const sampleImgWrapper = document.createElement('div');
    const sampleImgThunbnail = document.createElement('img');

    sampleImgWrapper.classList.add('samples__gallery-img-wrapper');
    sampleImgWrapper.setAttribute('data-sample-id', id);
    sampleImgThunbnail.classList.add('samples__gallery-img');
    sampleImgThunbnail.src = thubnailSrc;

    gsap.from(sampleImgThunbnail, {
      duration: 0.5,
      opacity: 0,
    });

    sampleImgWrapper.append(sampleImgThunbnail);

    return sampleImgWrapper;
  }

  if (samplesSelectorList) {
    const numberSelectedSamples = samplesSelectorInfo.querySelector('#samples_chosen_num');
    const priceSelectedSamples = samplesSelectorTotal.querySelector('#samples_total_price');
    const galleryNoChosen = samplesGallery.querySelector('.samples__gallery-no-chosen');
    const galleryWrapper = samplesGallery.querySelector('.samples__gallery-wrapper');
    const galleryItems = galleryWrapper.querySelector('.samples__gallery-items');

    numberSelectedSamples.textContent = '0';
    priceSelectedSamples.textContent = '0.00';

    samplesSelectorList.addEventListener('click', (e) => {
      const target = e.target;
      const chosenSapmplesList = samplesSelectorList.querySelectorAll('.samples-card__input:checked');
      const chosenGalleryItems = galleryItems.querySelectorAll('.samples__gallery-img-wrapper');

      if (chosenSapmplesList.length > 0) {
        galleryNoChosen.style.display = 'none';
        galleryWrapper.style.display = 'flex';
      } else {
        galleryNoChosen.style.display = 'flex';
        galleryWrapper.style.display = 'none';
      }

      if (chosenSapmplesList.length > 9) {
        galleryItems.classList.add('samples__gallery-items_col-4');
      } else {
        galleryItems.classList.remove('samples__gallery-items_col-4');
      }

      if (target && target.classList.contains('samples-card__input')) {
        numberSelectedSamples.textContent = chosenSapmplesList.length;
        priceSelectedSamples.textContent = updateSampleSum(chosenSapmplesList, 'data-sample-price').toFixed(2);

        // galleryItems.append(createSampleThumbnail(target.id, target.getAttribute('data-sample-thumb')));

        if (target.checked) {
          galleryItems.append(createSampleThumbnail(target.id, target.getAttribute('data-sample-thumb')));
        } else {
          chosenGalleryItems.forEach((item) => {
            if (item.getAttribute('data-sample-id') === target.id) item.remove();
          });
        }
      }
    });
  }
});
