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

/* global gsap, Power0, Swiper, WaveSurfer */
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
  } // VIDEO


  var videoContent = document.querySelector('#video_new_poject');
  var videoButton = document.querySelector('#video_button_play');

  if (videoContent && videoButton) {
    videoButton.addEventListener('click', function() {
      videoContent.play();
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
  var visualizationSlider = document.querySelector('.visualization-slider');
  var goodsSlider = document.querySelector('.goods-slider__slider');

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
    var slider = applicationSlider.querySelector('.swiper');
    var application = slider.closest('.application');
    var prevBtn = application.querySelector('.slider-button-group__button-prev');
    var nextBtn = application.querySelector('.slider-button-group__button-next');
    new Swiper(slider, {
      // Default parameters
      slidesPerView: 1,
      spaceBetween: 15,
      loopAdditionalSlides: 2,
      loop: true,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn
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

  if (visualizationSlider) {
    var _slider = visualizationSlider.querySelector('.swiper');

    var _prevBtn = _slider.previousElementSibling;
    var _nextBtn = _slider.nextElementSibling;
    new Swiper(_slider, {
      // Default parameters
      slidesPerView: 3,
      spaceBetween: 16,
      navigation: {
        prevEl: _prevBtn,
        nextEl: _nextBtn
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


  var visualizationTabs = document.querySelectorAll('.visualization__item[data-visualization-tab-id]');
  var visualizationTriggers = document.querySelectorAll('.visualization-slider__slide[data-visualization-id]');

  if (visualizationTriggers.length > 0 && visualizationTabs.length > 0) {
    visualizationTriggers.forEach(function(product) {
      product.addEventListener('click', function() {
        visualizationTabs.forEach(function(tab) {
          if (tab.getAttribute('data-visualization-tab-id') === product.getAttribute('data-visualization-id')) {
            tab.classList.add('--active');
            gsap.to(tab, {
              duration: 1,
              display: 'block',
              opacity: 1
            });
          } else {
            tab.classList.remove('--active');
            gsap.to(tab, {
              duration: 1,
              display: 'none',
              opacity: 0
            });
          }
        });
      });
    });
  } // COLORS TABS


  var colorContainers = document.querySelectorAll('.color-slider');

  if (colorContainers.length > 0) {
    colorContainers.forEach(function(container) {
      var colors = container.querySelectorAll('.color-slider__slide-round');

      if (colors.length > 0) {
        colors.forEach(function(item) {
          item.style.background = item.getAttribute('data-panel-color');
        });
      }

      container.addEventListener('click', function(e) {
        var target = e.target;

        if (target && target.classList.contains('color-slider__slide-round')) {
          colors.forEach(function(item) {
            return item.classList.remove('--active');
          });
          target.classList.add('--active');
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
  } // VIDEO ASIDE


  var asideBtnOpen = document.querySelector('.aside-video__button-open');
  var asideBtnBack = document.querySelector('.aside-video__back-button');
  var asideBody = document.querySelector('.aside-video');
  var adminAside = gsap.to(asideBody, {
    top: '0',
    duration: 0.5
  }).reverse();

  if (asideBtnOpen && asideBtnBack && asideBody) {
    asideBtnOpen.addEventListener('click', function() {
      return adminAside.play();
    });
    asideBtnBack.addEventListener('click', function() {
      return adminAside.reverse();
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
  }
});