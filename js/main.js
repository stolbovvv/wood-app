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

/* global gsap, Swiper, WaveSurfer */
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
  }); // sliders

  var articlesSlider = document.querySelector('.articles-slider__slider');
  var applicationSlider = document.querySelector('.application-slider');

  if (applicationSlider) {
    var prev = applicationSlider.closest('.application').querySelector('.slider-button-group__button-prev');
    var next = applicationSlider.closest('.application').querySelector('.slider-button-group__button-next');
    new Swiper(applicationSlider, {
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
          spaceBetween: 32
        }
      }
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
        nextEl: '.slider-button-group__button-next'
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
  } // video


  var videoContent = document.querySelector('#video_new_poject');
  var videoButton = document.querySelector('#video_button_play');

  if (videoContent && videoButton) {
    videoButton.addEventListener('click', function() {
      videoContent.play();
    });
  } // Audio wawes


  var audioBad = document.querySelector('#wave_audio_bad').getAttribute('data-sound');
  var audioGreat = document.querySelector('#wave_audio_great').getAttribute('data-sound');

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
    wavesAudioBad.load(audioBad);
    wavesAudioGreat.load(audioGreat);
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
  } // spoilers


  var spoilersList = document.querySelectorAll('.spoiler[data-spoiler-state]');

  if (spoilersList.length > 0) {
    spoilersList.forEach(function(spoiler) {
      var spoilerHead = spoiler.querySelector('.spoiler__head');
      var spoilerBody = spoiler.querySelector('.spoiler__body');
      spoilerHead.addEventListener('click', function() {
        console.log();

        switch (spoiler.getAttribute('data-spoiler-state')) {
          case 'open':
            spoiler.setAttribute('data-spoiler-state', 'close');
            gsap.to(spoilerBody, {
              duration: 0.5,
              height: 0
            });
            break;

          case 'close':
            spoiler.setAttribute('data-spoiler-state', 'open');
            gsap.to(spoilerBody, {
              duration: 0.5,
              height: 'auto'
            });
            break;

          default:
            break;
        }
      });
    });
  }
});