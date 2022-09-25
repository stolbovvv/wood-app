/* global gsap, Power0, Swiper, WaveSurfer, Plyr, ScrollTrigger */
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

  // SLIDERS
  const colorSlider = document.querySelectorAll('.color-slider');
  const simpleSlider = document.querySelectorAll('.simple-slider');
  const teamSlider = document.querySelectorAll('.team-slider');
  const applicationSlider = document.querySelector('.application-slider');
  const acousticPanelSlider = document.querySelectorAll('.acoustic-panel');
  const visualSlider = document.querySelector('.visual__slider');
  const goodsSlider = document.querySelector('.goods-slider__slider');

  if (visualSlider) {
    const slider = visualSlider.querySelector('.swiper');
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

  if (simpleSlider.length > 0) {
    simpleSlider.forEach((item) => {
      const slider = item.querySelector('.swiper');
      const prev = item.querySelector('.slider-button-group__button-prev');
      const next = item.querySelector('.slider-button-group__button-next');

      new Swiper(slider, {
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        navigation: {
          prevEl: prev,
          nextEl: next,
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
    });
  }

  if (teamSlider.length > 0) {
    teamSlider.forEach((item) => {
      const slider = item.querySelector('.swiper');
      const prev = item.querySelector('.slider-button-group__button-prev');
      const next = item.querySelector('.slider-button-group__button-next');

      new Swiper(slider, {
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 15,
        loopAdditionalSlides: 5,
        loopedSlides: 5,
        loop: true,
        navigation: {
          prevEl: prev,
          nextEl: next,
        },
        // Responsive breakpoints
        breakpoints: {
          768: {
            width: 352,
            spaceBetween: -32,
          },
        },
      });
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

  // VISUALIZATION TABS
  const visualImgContainer = document.querySelector('.visual__img-wrapper');
  const visualCardContainer = document.querySelector('.visual__card');
  const visualTabsContainer = document.querySelector('.visual__slider-wrapper');

  function activeTabContent(tabs, previews, i = 0) {
    tabs[i].classList.add('--active');

    previews.forEach((preview) => {
      if (preview.getAttribute('data-visual-id') === tabs[i].id) {
        preview.style['opacity'] = 1;
        preview.style['z-index'] = 2;
      }
    });
  }

  function deactivateTabContent(tabs, previews) {
    tabs.forEach((item) => item.classList.remove('--active'));

    previews.forEach((preview) => {
      preview.style['opacity'] = 0.25;
      preview.style['z-index'] = 1;
    });
  }

  if (visualImgContainer && visualCardContainer && visualTabsContainer) {
    const visualTabsItem = visualTabsContainer.querySelectorAll('.visual__slider-slide');
    const visualCardImg = visualCardContainer.querySelector('#visual-card-img');
    const visualCardName = visualCardContainer.querySelector('#visual-card-name');
    const visualCardPrice = visualCardContainer.querySelector('#visual-card-price');
    const visualCardLink = visualCardContainer.querySelector('#visual-card-link');

    if (visualTabsItem.length > 0) {
      visualTabsItem.forEach((item) => {
        const visualPreviewImg = document.createElement('img');
        visualPreviewImg.classList.add('visual__img');
        visualPreviewImg.setAttribute('data-visual-id', item.id);
        visualPreviewImg.src = item.getAttribute('data-visual-preview-img');
        visualImgContainer.append(visualPreviewImg);
      });

      const visualPreviewImgItem = visualImgContainer.querySelectorAll('.visual__img');

      deactivateTabContent(visualTabsItem, visualPreviewImgItem);
      activeTabContent(visualTabsItem, visualPreviewImgItem);

      visualCardImg.src = visualTabsItem[0].getAttribute('data-visual-card-img');
      visualCardName.textContent = visualTabsItem[0].getAttribute('data-visual-card-name');
      visualCardPrice.textContent = visualTabsItem[0].getAttribute('data-visual-card-price');
      visualCardLink.href = visualTabsItem[0].getAttribute('data-visual-card-link');

      visualTabsContainer.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('visual__slider-slide')) {
          visualTabsItem.forEach((tab, i) => {
            if (target === tab) {
              deactivateTabContent(visualTabsItem, visualPreviewImgItem);
              activeTabContent(visualTabsItem, visualPreviewImgItem, i);

              visualCardImg.src = target.getAttribute('data-visual-card-img');
              visualCardName.textContent = target.getAttribute('data-visual-card-name');
              visualCardPrice.textContent = target.getAttribute('data-visual-card-price');
              visualCardLink.href = target.getAttribute('data-visual-card-link');
            }
          });
        }
      });
    }
  }

  // SET COLOR FOR SLIDES ROUND COLOR
  const slideRoundColor = document.querySelectorAll('[data-goods-short-color]');

  if (slideRoundColor.length > 0) {
    slideRoundColor.forEach((round) => {
      round.style['background'] = round.getAttribute('data-goods-short-color');
    });
  }

  // COLORS TABS
  const colorTabsContainers = document.querySelectorAll('.color-slider__wrapper');
  const colorImgContainer = document.querySelector('.acoustic-panel__img-wrapper');

  function activeColorTab(tabs, images = [], i = 0) {
    tabs[i].classList.add('--active');

    if (images.length > 0) {
      images.forEach((image) => {
        if (image.getAttribute('data-goods-short-id') === tabs[i].id) {
          image.style['opacity'] = 1;
          image.style['z-index'] = 2;
        }
      });
    }
  }

  function deactiveColorTab(tabs, images = []) {
    tabs.forEach((tab) => tab.classList.remove('--active'));

    if (images.length > 0) {
      images.forEach((image) => {
        image.style['opacity'] = 0.25;
        image.style['z-index'] = 1;
      });
    }
  }

  if (colorTabsContainers.length > 0) {
    colorTabsContainers.forEach((container) => {
      const colorTabs = container.querySelectorAll('.color-slider__slide-round');
      const goodsShortColor = document.querySelector('#goods-short-color');
      const goodsShortNumber = document.querySelector('#goods-short-number');
      const goodsShortName = document.querySelector('#goods-short-name');

      let colorImgArr = [];

      if (colorImgContainer) {
        colorTabs.forEach((item) => {
          const colorImg = document.createElement('img');
          colorImg.classList.add('acoustic-panel__img');
          colorImg.setAttribute('data-goods-short-id', item.id);
          colorImg.src = item.getAttribute('data-goods-short-img');
          colorImgContainer.append(colorImg);
        });

        colorImgArr = colorImgContainer.querySelectorAll('.acoustic-panel__img');
      }

      deactiveColorTab(colorTabs, colorImgArr);
      activeColorTab(colorTabs, colorImgArr);

      if (goodsShortColor) goodsShortColor.style['background'] = colorTabs[0].getAttribute('data-goods-short-color');
      if (goodsShortNumber) goodsShortNumber.textContent = colorTabs[0].getAttribute('data-goods-short-number');
      if (goodsShortName) goodsShortName.textContent = colorTabs[0].getAttribute('data-goods-short-name');

      container.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('color-slider__slide-round')) {
          deactiveColorTab(colorTabs, colorImgArr);

          colorTabs.forEach((tab, i) => {
            if (target === tab) {
              activeColorTab(colorTabs, colorImgArr, i);

              if (goodsShortColor) {
                goodsShortColor.style['background'] = colorTabs[i].getAttribute('data-goods-short-color');
              }
              if (goodsShortNumber) {
                goodsShortNumber.textContent = colorTabs[i].getAttribute('data-goods-short-number');
              }
              if (goodsShortName) {
                goodsShortName.textContent = colorTabs[i].getAttribute('data-goods-short-name');
              }
            }
          });
        }
      });
    });
  }

  // DELIVERY TABS
  const tabsWrapper = document.querySelectorAll('.tabs-wrapper');

  function hideTabsContent(triggersArr, contentsArr) {
    triggersArr.forEach((trigger) => trigger.classList.remove('--active'));
    contentsArr.forEach((content) => (content.style.display = 'none'));
  }
  function showTabsContent(triggersArr, contentsArr, i = 0) {
    triggersArr[i].classList.add('--active');

    contentsArr.forEach((content) => {
      if (content.getAttribute('data-content-id') === triggersArr[i].getAttribute('data-tab-id')) {
        content.style.display = 'block';
      }
    });
  }

  if (tabsWrapper.length > 0) {
    tabsWrapper.forEach((item) => {
      const tabsTriggers = item.querySelector('.tabs-triggers');
      const tabsTriggersItems = item.querySelectorAll('.tabs-triggers-item');
      const tabsContentItems = item.querySelectorAll('.tabs-content-item');

      if (tabsTriggersItems.length > 0 && tabsContentItems.length > 0) {
        hideTabsContent(tabsTriggersItems, tabsContentItems);
        showTabsContent(tabsTriggersItems, tabsContentItems);

        tabsTriggers.addEventListener('click', (e) => {
          const target = e.target;

          if (target && target.classList.contains('tabs-triggers-item')) {
            tabsTriggersItems.forEach((tab, i) => {
              if (target === tab) {
                hideTabsContent(tabsTriggersItems, tabsContentItems);
                showTabsContent(tabsTriggersItems, tabsContentItems, i);
              }
            });
          }
        });
      }
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

  // MENU ASIDE
  const asideMenu = document.querySelector('.aside-page-menu');

  if (asideMenu) {
    const asideMenuItem = asideMenu.querySelectorAll('.aside-page-menu__item');

    asideMenuItem[0].classList.add('--active');

    asideMenu.addEventListener('click', (e) => {
      const target = e.target;
      const tergetItems = asideMenu.querySelectorAll('.aside-page-menu__item');

      tergetItems.forEach((item) => item.classList.remove('--active'));

      if (target && target.classList.contains('aside-page-menu__link')) {
        target.parentElement.classList.add('--active');
      }
    });
  }

  // VIDEO ASIDE
  const asideBtnOpen = document.querySelector('.aside-video__button-open');
  const asideBtnBack = document.querySelector('.aside-video__back-button');
  const asideBody = document.querySelector('.aside-video');

  if (asideBtnOpen && asideBtnBack && asideBody) {
    asideBtnOpen.addEventListener('click', () => asideBody.classList.add('--active'));
    asideBtnBack.addEventListener('click', () => asideBody.classList.remove('--active'));
  }

  // VIDEO
  const homePageVideo = document.querySelector('#video_new_poject');

  if (homePageVideo) new Plyr(homePageVideo, { resetOnEnd: true });

  // MODALS
  const modalAccaunt = document.querySelector('.modal-accaunt');
  const modalDialogLogin = modalAccaunt.querySelector('.modal-accaunt-login');
  const modalDialogRegistration = modalAccaunt.querySelector('.modal-accaunt-registration');
  const modalOrderSamples = document.querySelector('.modal-order-samples');
  const modalAddToCard = document.querySelector('.modal-add-to-card');
  const modalCompetition = document.querySelector('.modal-bunner-competition');

  const modalAccountOpenButton = document.querySelector('.accaunt-button');
  const modalAddToCartButtons = document.querySelectorAll('button[data-button-action="add-to-cart"]');

  function showModal(modal) {
    const dialogs = modal.querySelectorAll('.modal__dialog');

    document.body.classList.add('--lock');
    modal.style['visibility'] = 'visible';
    modal.style['opacity'] = 1;

    dialogs[0].style['visibility'] = 'visible';
    dialogs[0].style['opacity'] = 1;
  }

  function hideModal(modal) {
    const dialogs = modal.querySelectorAll('.modal__dialog');

    document.body.classList.remove('--lock');
    modal.style['visibility'] = 'hidden';
    modal.style['opacity'] = 0;

    dialogs.forEach((dialog) => {
      dialog.style['visibility'] = 'hidden';
      dialog.style['opacity'] = 0;
    });
  }

  function chsngeDialog(hide, show) {
    hide.style['visibility'] = 'hidden';
    hide.style['opacity'] = 0;

    setTimeout(() => {
      show.style['visibility'] = 'visible';
      show.style['opacity'] = 1;
    }, 250);
  }

  function addEventListenerToModal(modal) {
    modal.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList.contains('modal')) hideModal(modal);
      if (target && target.getAttribute('data-modal-action') === 'close') hideModal(modal);

      if (target && target.getAttribute('data-modal-change-to') === 'login') {
        e.preventDefault();
        chsngeDialog(modalDialogRegistration, modalDialogLogin);
      }
      if (target && target.getAttribute('data-modal-change-to') === 'registration') {
        e.preventDefault();
        chsngeDialog(modalDialogLogin, modalDialogRegistration);
      }
    });
  }

  modalAccountOpenButton.addEventListener('click', () => showModal(modalAccaunt));

  if (modalAddToCartButtons.length > 0) {
    modalAddToCartButtons.forEach((button) => {
      button.addEventListener('click', () => {
        showModal(modalAddToCard);
      });
    });
  }

  if (modalCompetition) {
    modalCompetition.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.getAttribute('data-modal-action') === 'close') {
        modalCompetition.classList.remove('--active');
      }

      if (target && target.classList.contains('modal-bunner')) {
        modalCompetition.classList.remove('--active');
      }
    });

    setTimeout(() => modalCompetition.classList.add('--active'), 5000);
  }

  if (modalOrderSamples) setTimeout(() => showModal(modalOrderSamples), 10000);

  if (modalAccaunt) addEventListenerToModal(modalAccaunt);
  if (modalAddToCard) addEventListenerToModal(modalAddToCard);
  if (modalOrderSamples) addEventListenerToModal(modalOrderSamples);

  // PARALLAX
  gsap.registerPlugin(ScrollTrigger);

  const parallaxArr = document.querySelectorAll('.parallax');

  if (parallaxArr.length > 0) {
    parallaxArr.forEach((parallax) => {
      const scale = parallax.getAttribute('data-parallax-scale');
      const source = parallax.getAttribute('data-parallax-src');

      parallax.style['position'] = 'relative';
      parallax.style['overflow'] = 'hidden';

      if (source) {
        const image = document.createElement('img');

        image.classList.add('.parallax__img');
        image.style['position'] = 'absolute';
        image.style['left'] = '0';
        image.style['bottom'] = '0';
        image.style['width'] = '100%';
        image.style['height'] = scale ? `${100 * scale}%` : '100%';
        image.style['object-fit'] = 'cover';
        image.src = source;

        parallax.append(image);

        gsap.to(image, {
          y: scale ? `${100 * (scale - 1)}%` : '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: parallax,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });
  }
});
