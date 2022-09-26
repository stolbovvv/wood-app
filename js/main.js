"use strict";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/* global gsap, Power0, Swiper, WaveSurfer, Plyr, ScrollTrigger */
window.addEventListener('DOMContentLoaded', function() {
  // Header-menu
  var headerMenuButton = document.querySelector('.header-menu__button');
  var headerMenuBody = document.querySelector('.header-menu__body');
  var headerMenuList = document.querySelector('.header-menu__list');
  headerMenuButton.addEventListener('click', function() {
    if (headerMenuButton.classList.contains('--active')) {
      headerMenuButton.classList.remove('--active');
      document.body.classList.remove('--lock');
      gsap.to(headerMenuBody, {
        duration: 0.5,
        y: 0
      });
    } else {
      headerMenuButton.classList.add('--active');
      document.body.classList.add('--lock');
      gsap.to(headerMenuBody, {
        duration: 0.5,
        y: '100%'
      });
    }
  });
  headerMenuList.addEventListener('click', function(e) {
    var documentWidth = document.documentElement.clientWidth;

    if (e.target.classList.contains('header-menu__link') && documentWidth < 1280) {
      e.preventDefault();

      if (e.target.classList.contains('--active')) {
        e.target.classList.remove('--active');

        if (e.target.nextElementSibling.classList.contains('header-menu__submenu')) {
          gsap.to(e.target.nextElementSibling, {
            duration: 0.5,
            height: 0
          });
        }
      } else {
        e.target.classList.add('--active');

        if (e.target.nextElementSibling.classList.contains('header-menu__submenu')) {
          gsap.to(e.target.nextElementSibling, {
            duration: 0.5,
            height: 'auto'
          });
        }
      }
    }
  }); // COUNTER

  var counterArray = document.querySelectorAll('.goods-counter');

  if (counterArray.length > 0) {
    counterArray.forEach(function(counter) {
      var input = counter.querySelector('input.goods-counter__input');
      var incrementBtn = counter.querySelector('.goods-counter__button[data-type="increment"]');
      var decrementBtn = counter.querySelector('.goods-counter__button[data-type="decrement"]');
      counter.addEventListener('click', function(e) {
        if (e.target && e.target === incrementBtn) input.value = +input.value + 1;
        if (e.target && e.target === decrementBtn && input.value > 0) input.value = +input.value - 1;
      });
    });
  } // AUDIO WAWES


  var audioBad = document.querySelector('#wave_audio_bad');
  var audioGreat = document.querySelector('#wave_audio_great');

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
    var playerBytton = document.querySelector('#audio_player_button');
    var audioToggler = document.querySelector('.difference__switch-toggler');
    var audioLabels = document.querySelectorAll('.difference__switch-label');
    var wavesSetting = {
      waveColor: '#CACACA',
      progressColor: '#787d46',
      cursorColor: 'transparent',
      height: 100,
      barHeight: 5,
      barMinHeight: 4,
      barWidth: 4,
      barRadius: 2,
      barGap: 3
    };
    var wavesAudioBad = WaveSurfer.create(_objectSpread({
      container: '#wave_audio_bad'
    }, wavesSetting));
    var wavesAudioGreat = WaveSurfer.create(_objectSpread({
      container: '#wave_audio_great'
    }, wavesSetting));
    wavesAudioBad.load(audioBad.getAttribute('data-sound'));
    wavesAudioGreat.load(audioGreat.getAttribute('data-sound'));
    playerBytton.addEventListener('click', function() {
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
    audioToggler.addEventListener('click', function() {
      if (audioToggler.getAttribute('data-state') === 'audio-bad') {
        audioToggler.setAttribute('data-state', 'audio-great');
        audioToggler.classList.add('--active');
        audioLabels.forEach(function(label) {
          if (label.id === 'labe_audio_great') label.classList.add('--active');
          if (label.id === 'labe_audio_bad') label.classList.remove('--active');
        });
      } else {
        audioToggler.setAttribute('data-state', 'audio-bad');
        audioToggler.classList.remove('--active');
        audioLabels.forEach(function(label) {
          if (label.id === 'labe_audio_great') label.classList.remove('--active');
          if (label.id === 'labe_audio_bad') label.classList.add('--active');
        });
      }

      muteAudio(audioToggler, wavesAudioBad, wavesAudioGreat);
    });
  } // SLIDERS


  var colorSlider = document.querySelectorAll('.color-slider');
  var simpleSlider = document.querySelectorAll('.simple-slider');
  var teamSlider = document.querySelectorAll('.team-slider');
  var applicationSlider = document.querySelector('.application-slider');
  var acousticPanelSlider = document.querySelectorAll('.acoustic-panel');
  var visualSlider = document.querySelector('.visual__slider');
  var goodsSlider = document.querySelector('.goods-slider__slider');

  if (visualSlider) {
    var slider = visualSlider.querySelector('.swiper');
    var prevBtn = slider.previousElementSibling;
    var nextBtn = slider.nextElementSibling;
    new Swiper(slider, {
      // Default parameters
      slidesPerView: 3,
      spaceBetween: 16,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn
      },
      // Responsive breakpoints
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 32
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 32
        },
        1920: {
          slidesPerView: 6,
          spaceBetween: 32
        }
      }
    });
  }

  if (colorSlider.length > 0) {
    colorSlider.forEach(function(slider) {
      new Swiper(slider.querySelector('.swiper'), {
        // Default parameters
        slidesPerView: 'auto',
        navigation: {
          prevEl: slider.querySelector('.color-slider__button-prev'),
          nextEl: slider.querySelector('.color-slider__button-next')
        }
      });
    });
  }

  if (simpleSlider.length > 0) {
    simpleSlider.forEach(function(item) {
      var slider = item.querySelector('.swiper');
      var prev = item.querySelector('.slider-button-group__button-prev');
      var next = item.querySelector('.slider-button-group__button-next');
      new Swiper(slider, {
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        navigation: {
          prevEl: prev,
          nextEl: next
        },
        // Responsive breakpoints
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 15
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 32
          },
          1920: {
            slidesPerView: 2,
            spaceBetween: 92
          }
        }
      });
    });
  }

  if (teamSlider.length > 0) {
    teamSlider.forEach(function(item) {
      var slider = item.querySelector('.swiper');
      var prev = item.querySelector('.slider-button-group__button-prev');
      var next = item.querySelector('.slider-button-group__button-next');
      new Swiper(slider, {
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 15,
        loopAdditionalSlides: 5,
        loopedSlides: 5,
        loop: true,
        navigation: {
          prevEl: prev,
          nextEl: next
        },
        // Responsive breakpoints
        breakpoints: {
          768: {
            width: 352,
            spaceBetween: -32
          }
        }
      });
    });
  }

  if (applicationSlider) {
    var _slider = applicationSlider.querySelector('.swiper');

    var application = _slider.closest('.application');

    var _prevBtn = application.querySelector('.slider-button-group__button-prev');

    var _nextBtn = application.querySelector('.slider-button-group__button-next');

    new Swiper(_slider, {
      // Default parameters
      slidesPerView: 1,
      spaceBetween: 15,
      loopAdditionalSlides: 2,
      loop: true,
      navigation: {
        prevEl: _prevBtn,
        nextEl: _nextBtn
      },
      // Responsive breakpoints
      breakpoints: {
        768: {
          width: 230
        },
        1280: {
          width: 350,
          spaceBetween: 15
        },
        1600: {
          width: 539,
          spaceBetween: 0
        },
        1920: {
          width: 737,
          spaceBetween: -5
        }
      }
    });
  }

  if (acousticPanelSlider.length > 0) {
    acousticPanelSlider.forEach(function(item) {
      var slider = item.querySelector('.acoustic-panel__img-swiper');
      var prevBtn = item.querySelector('.slider-button-group__button-prev');
      var nextBtn = item.querySelector('.slider-button-group__button-next');
      new Swiper(slider, {
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 15,
        effect: 'fade',
        loop: true,
        navigation: {
          prevEl: prevBtn,
          nextEl: nextBtn
        }
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
        nextEl: '.slider-button-group__button-next'
      },
      // Responsive breakpoints
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 32
        }
      }
    });
  } // SELECTS


  var selectsArray = document.querySelectorAll('.custom-select');

  function animationActiveSelect(element, icon) {
    element.classList.add('--active');
    gsap.to(icon, {
      rotation: 90,
      duration: 0.25
    });
  }

  function animationDeactivationSelect(element, icon) {
    element.classList.remove('--active');
    gsap.to(icon, {
      rotation: 0,
      duration: 0.25
    });
  }

  function animationSelect(element) {
    var icon = element.querySelector('.goods__summary-size-select-icon');

    if (element.classList.contains('--active')) {
      animationDeactivationSelect(element, icon);
    } else {
      animationActiveSelect(element, icon);
    }
  }

  if (selectsArray.length > 0) {
    selectsArray.forEach(function(select) {
      var selectBody = select.querySelector('select');
      select.classList.remove('--active');
      selectBody.addEventListener('click', function() {
        return animationSelect(select);
      });
      selectBody.addEventListener('blur', function() {
        animationDeactivationSelect(select, select.querySelector('.goods__summary-size-select-icon'));
      });
    });
  } // SPOILERS


  var spoilerContainer = document.querySelectorAll('.spoilers-container');

  function createAnimationForSpoiler(element) {
    var body = element.querySelector('.spoiler__body');
    var head = element.querySelector('.spoiler__head');
    var icon = element.querySelector('.spoiler__head-icon');
    gsap.set(body, {
      height: 'auto'
    });
    var animationBody = gsap.from(body, {
      height: 0,
      duration: 0.25,
      ease: Power0.easeNone
    }).reverse();
    var animationHead = gsap.to(head, {
      color: '#787d46',
      duration: 0.25,
      ease: Power0.easeNone
    }).reverse();
    var animationIcon = gsap.to(icon, {
      rotation: 90,
      duration: 0.1,
      ease: Power0.easeNone
    }).reverse();
    return function(clickedHead) {
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
    spoilerContainer.forEach(function(container) {
      var spoilersGroup = gsap.utils.toArray(container.querySelectorAll('.spoiler'));
      var spoilersHead = gsap.utils.toArray(container.querySelectorAll('.spoiler__head'));
      var spoilersToggles = spoilersGroup.map(createAnimationForSpoiler);

      function toggleMenu(clickedHead) {
        spoilersToggles.forEach(function(toggleFn) {
          return toggleFn(clickedHead);
        });
      }

      spoilersHead.forEach(function(menu) {
        menu.addEventListener('click', function() {
          return toggleMenu(menu);
        });
      });
    });
  } // VISUALIZATION TABS


  var visualImgContainer = document.querySelector('.visual__img-wrapper');
  var visualCardContainer = document.querySelector('.visual__card');
  var visualTabsContainer = document.querySelector('.visual__slider-wrapper');

  function activeTabContent(tabs, previews) {
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    tabs[i].classList.add('--active');
    previews.forEach(function(preview) {
      if (preview.getAttribute('data-visual-id') === tabs[i].id) {
        preview.style['opacity'] = 1;
        preview.style['z-index'] = 2;
      }
    });
  }

  function deactivateTabContent(tabs, previews) {
    tabs.forEach(function(item) {
      return item.classList.remove('--active');
    });
    previews.forEach(function(preview) {
      preview.style['opacity'] = 0.25;
      preview.style['z-index'] = 1;
    });
  }

  if (visualImgContainer && visualCardContainer && visualTabsContainer) {
    var visualTabsItem = visualTabsContainer.querySelectorAll('.visual__slider-slide');
    var visualCardImg = visualCardContainer.querySelector('#visual-card-img');
    var visualCardName = visualCardContainer.querySelector('#visual-card-name');
    var visualCardPrice = visualCardContainer.querySelector('#visual-card-price');
    var visualCardLink = visualCardContainer.querySelector('#visual-card-link');

    if (visualTabsItem.length > 0) {
      visualTabsItem.forEach(function(item) {
        var visualPreviewImg = document.createElement('img');
        visualPreviewImg.classList.add('visual__img');
        visualPreviewImg.setAttribute('data-visual-id', item.id);
        visualPreviewImg.src = item.getAttribute('data-visual-preview-img');
        visualImgContainer.append(visualPreviewImg);
      });
      var visualPreviewImgItem = visualImgContainer.querySelectorAll('.visual__img');
      deactivateTabContent(visualTabsItem, visualPreviewImgItem);
      activeTabContent(visualTabsItem, visualPreviewImgItem);
      visualCardImg.src = visualTabsItem[0].getAttribute('data-visual-card-img');
      visualCardName.textContent = visualTabsItem[0].getAttribute('data-visual-card-name');
      visualCardPrice.textContent = visualTabsItem[0].getAttribute('data-visual-card-price');
      visualCardLink.href = visualTabsItem[0].getAttribute('data-visual-card-link');
      visualTabsContainer.addEventListener('click', function(e) {
        var target = e.target;

        if (target && target.classList.contains('visual__slider-slide')) {
          visualTabsItem.forEach(function(tab, i) {
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
  } // SET COLOR FOR SLIDES ROUND COLOR


  var slideRoundColor = document.querySelectorAll('[data-goods-short-color]');

  if (slideRoundColor.length > 0) {
    slideRoundColor.forEach(function(round) {
      round.style['background'] = round.getAttribute('data-goods-short-color');
    });
  } // COLORS TABS


  var colorTabsContainers = document.querySelectorAll('.color-slider__wrapper');
  var colorImgContainer = document.querySelector('.acoustic-panel__img-wrapper');

  function activeColorTab(tabs) {
    var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    tabs[i].classList.add('--active');

    if (images.length > 0) {
      images.forEach(function(image) {
        if (image.getAttribute('data-goods-short-id') === tabs[i].id) {
          image.style['opacity'] = 1;
          image.style['z-index'] = 2;
        }
      });
    }
  }

  function deactiveColorTab(tabs) {
    var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    tabs.forEach(function(tab) {
      return tab.classList.remove('--active');
    });

    if (images.length > 0) {
      images.forEach(function(image) {
        image.style['opacity'] = 0.25;
        image.style['z-index'] = 1;
      });
    }
  }

  if (colorTabsContainers.length > 0) {
    colorTabsContainers.forEach(function(container) {
      var colorTabs = container.querySelectorAll('.color-slider__slide-round');
      var goodsShortColor = document.querySelector('#goods-short-color');
      var goodsShortNumber = document.querySelector('#goods-short-number');
      var goodsShortName = document.querySelector('#goods-short-name');
      var colorImgArr = [];

      if (colorImgContainer) {
        colorTabs.forEach(function(item) {
          var colorImg = document.createElement('img');
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
      container.addEventListener('click', function(e) {
        var target = e.target;

        if (target && target.classList.contains('color-slider__slide-round')) {
          deactiveColorTab(colorTabs, colorImgArr);
          colorTabs.forEach(function(tab, i) {
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
  } // DELIVERY TABS


  var tabsWrapper = document.querySelectorAll('.tabs-wrapper');

  function hideTabsContent(triggersArr, contentsArr) {
    triggersArr.forEach(function(trigger) {
      return trigger.classList.remove('--active');
    });
    contentsArr.forEach(function(content) {
      return content.style.display = 'none';
    });
  }

  function showTabsContent(triggersArr, contentsArr) {
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    triggersArr[i].classList.add('--active');
    contentsArr.forEach(function(content) {
      if (content.getAttribute('data-content-id') === triggersArr[i].getAttribute('data-tab-id')) {
        content.style.display = 'block';
      }
    });
  }

  if (tabsWrapper.length > 0) {
    tabsWrapper.forEach(function(item) {
      var tabsTriggers = item.querySelector('.tabs-triggers');
      var tabsTriggersItems = item.querySelectorAll('.tabs-triggers-item');
      var tabsContentItems = item.querySelectorAll('.tabs-content-item');

      if (tabsTriggersItems.length > 0 && tabsContentItems.length > 0) {
        hideTabsContent(tabsTriggersItems, tabsContentItems);
        showTabsContent(tabsTriggersItems, tabsContentItems);
        tabsTriggers.addEventListener('click', function(e) {
          var target = e.target;

          if (target && target.classList.contains('tabs-triggers-item')) {
            tabsTriggersItems.forEach(function(tab, i) {
              if (target === tab) {
                hideTabsContent(tabsTriggersItems, tabsContentItems);
                showTabsContent(tabsTriggersItems, tabsContentItems, i);
              }
            });
          }
        });
      }
    });
  } // SAMPLES


  var samplesSelectorList = document.querySelector('.samples__selector-list');
  var samplesSelectorInfo = document.querySelector('.samples__selector-info');
  var samplesSelectorTotal = document.querySelector('.samples__selector-total');
  var samplesGallery = document.querySelector('.samples__gallery');

  function updateSampleSum(arrElements, attr) {
    var total = 0;
    arrElements.forEach(function(item) {
      return total += +item.getAttribute(attr);
    });
    return total;
  }

  function createSampleThumbnail(id, thubnailSrc) {
    var sampleImgWrapper = document.createElement('div');
    var sampleImgThunbnail = document.createElement('img');
    sampleImgWrapper.classList.add('samples__gallery-img-wrapper');
    sampleImgWrapper.setAttribute('data-sample-id', id);
    sampleImgThunbnail.classList.add('samples__gallery-img');
    sampleImgThunbnail.src = thubnailSrc;
    gsap.from(sampleImgThunbnail, {
      duration: 0.5,
      opacity: 0
    });
    sampleImgWrapper.append(sampleImgThunbnail);
    return sampleImgWrapper;
  }

  if (samplesSelectorList) {
    var numberSelectedSamples = samplesSelectorInfo.querySelector('#samples_chosen_num');
    var priceSelectedSamples = samplesSelectorTotal.querySelector('#samples_total_price');
    var galleryNoChosen = samplesGallery.querySelector('.samples__gallery-no-chosen');
    var galleryWrapper = samplesGallery.querySelector('.samples__gallery-wrapper');
    var galleryItems = galleryWrapper.querySelector('.samples__gallery-items');
    numberSelectedSamples.textContent = '0';
    priceSelectedSamples.textContent = '0.00';
    samplesSelectorList.addEventListener('click', function(e) {
      var target = e.target;
      var chosenSapmplesList = samplesSelectorList.querySelectorAll('.samples-card__input:checked');
      var chosenGalleryItems = galleryItems.querySelectorAll('.samples__gallery-img-wrapper');

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
          chosenGalleryItems.forEach(function(item) {
            if (item.getAttribute('data-sample-id') === target.id) item.remove();
          });
        }
      }
    });
  } // MENU ASIDE


  var asideMenu = document.querySelector('.aside-page-menu');

  if (asideMenu) {
    var asideMenuItem = asideMenu.querySelectorAll('.aside-page-menu__item');
    asideMenuItem[0].classList.add('--active');
    asideMenu.addEventListener('click', function(e) {
      var target = e.target;
      var tergetItems = asideMenu.querySelectorAll('.aside-page-menu__item');
      tergetItems.forEach(function(item) {
        return item.classList.remove('--active');
      });

      if (target && target.classList.contains('aside-page-menu__link')) {
        target.parentElement.classList.add('--active');
      }
    });
  } // VIDEO ASIDE


  var asideBtnOpen = document.querySelector('.aside-video__button-open');
  var asideBtnBack = document.querySelector('.aside-video__back-button');
  var asideBody = document.querySelector('.aside-video');

  if (asideBtnOpen && asideBtnBack && asideBody) {
    asideBtnOpen.addEventListener('click', function() {
      return asideBody.classList.add('--active');
    });
    asideBtnBack.addEventListener('click', function() {
      return asideBody.classList.remove('--active');
    });
  } // VIDEO


  var homePageVideo = document.querySelector('#video_new_poject');
  if (homePageVideo) new Plyr(homePageVideo, {
    resetOnEnd: true
  }); // PARALLAX

  gsap.registerPlugin(ScrollTrigger);
  var parallaxArr = document.querySelectorAll('.parallax');

  if (parallaxArr.length > 0) {
    parallaxArr.forEach(function(parallax) {
      var scale = parallax.getAttribute('data-parallax-scale');
      var source = parallax.getAttribute('data-parallax-src');
      parallax.style['position'] = 'relative';
      parallax.style['overflow'] = 'hidden';

      if (source) {
        var image = document.createElement('img');
        image.classList.add('.parallax__img');
        image.style['position'] = 'absolute';
        image.style['left'] = '0';
        image.style['bottom'] = '0';
        image.style['width'] = '100%';
        image.style['height'] = scale ? "".concat(100 * scale, "%") : '100%';
        image.style['object-fit'] = 'cover';
        image.src = source;
        parallax.append(image);
        gsap.to(image, {
          y: scale ? "".concat(100 * (scale - 1), "%") : '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: parallax,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });
  } // MODALS


  var accauntButton = document.querySelector('.accaunt-button');
  var goodsSummaryButtons = document.querySelectorAll('.goods__summary-button');
  var modalAccaunt = document.querySelector('.modal-accaunt');
  var modalAddToCart = document.querySelector('.modal-add-to-cart');
  var modalCompetition = document.querySelector('.modal-competition');
  var modalOrderSamples = document.querySelector('.modal-order-samples');
  var modalButtons = document.querySelectorAll('.modal-button');

  function showModal(modal) {
    var lockBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var dialogs = modal.querySelectorAll('.modal__dialog');
    modal.classList.add('--active');
    dialogs[0].classList.add('--active');
    if (lockBody) document.body.classList.add('--lock');
  }

  function hideModal(modal) {
    var dialogs = modal.querySelectorAll('.modal__dialog');
    modal.classList.remove('--active');
    dialogs.forEach(function(dialog) {
      return dialog.classList.remove('--active');
    });
    document.body.classList.remove('--lock');
  }

  function chageDialog(modal, target) {
    var dialogs = modal.querySelectorAll('.modal__dialog');
    dialogs.forEach(function(dialog) {
      if (dialog.getAttribute('data-dialog') === target) {
        dialog.classList.add('--active');
      } else {
        dialog.classList.remove('--active');
      }
    });
  }

  function addEventListenerForModal(modal) {
    modal.addEventListener('click', function(e) {
      var target = e.target; // hide modal

      if (target && target.classList.contains('modal')) hideModal(modal);
      if (target && target.getAttribute('data-modal-action') === 'close') hideModal(modal); // change dialogs

      if (target && target.getAttribute('data-change-dialog-to')) {
        e.preventDefault();
        chageDialog(modal, target.getAttribute('data-change-dialog-to'));
      }
    });
  }

  function setTimeoutForModal(modal) {
    if (modal && modal.getAttribute('data-modal-timeout') && modal.getAttribute('data-modal-timeout') > 0) {
      return modal.getAttribute('data-modal-timeout') * 1000;
    } else {
      return 0;
    }
  }

  var modalCompetitionID = setTimeout(function() {
    if (modalCompetition) showModal(modalCompetition, false);
  }, setTimeoutForModal(modalCompetition));
  var modalOrderSamplesID = setTimeout(function() {
    if (modalOrderSamples) showModal(modalOrderSamples, false);
  }, setTimeoutForModal(modalOrderSamples));
  if (accauntButton) accauntButton.addEventListener('click', function() {
    return showModal(modalAccaunt);
  });

  if (goodsSummaryButtons.length > 0) {
    goodsSummaryButtons.forEach(function(button) {
      return button.addEventListener('click', function() {
        return showModal(modalAddToCart);
      });
    });
  }

  if (modalButtons.length > 0) {
    modalButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        var target = e.target;

        if (target && target.getAttribute('data-show-modal') === 'modal-competition') {
          clearTimeout(modalCompetitionID);
          showModal(modalCompetition, false);
        }

        if (target && target.getAttribute('data-show-modal') === 'modal-order-samples') {
          clearTimeout(modalOrderSamplesID);
          showModal(modalOrderSamples, false);
        }
      });
    });
  }

  if (modalAccaunt) addEventListenerForModal(modalAccaunt);
  if (modalAddToCart) addEventListenerForModal(modalAddToCart);
  if (modalCompetition) addEventListenerForModal(modalCompetition);
  if (modalOrderSamples) addEventListenerForModal(modalOrderSamples);
});