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
  const videoContent = document.querySelector('#video_new_poject');
  const videoButton = document.querySelector('#video_button_play');

  videoButton.addEventListener('click', () => {
    videoContent.play();
  });

  // Audio wawes
  const playerBytton = document.querySelector('#audio_player_button');
  const audioBad = document.querySelector('#wave_audio_bad').getAttribute('data-sound');
  const audioGreat = document.querySelector('#wave_audio_great').getAttribute('data-sound');

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

  function muteAudio() {
    if (audioToggler.getAttribute('data-state') === 'not-active') {
      wavesAudioBad.setVolume(1);
      wavesAudioGreat.setVolume(0);
    } else {
      wavesAudioBad.setVolume(0);
      wavesAudioGreat.setVolume(1);
    }
  }

  playerBytton.addEventListener('click', () => {
    muteAudio();

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
    if (audioToggler.getAttribute('data-state') === 'not-active') {
      audioToggler.setAttribute('data-state', 'active');

      audioLabels.forEach((label) => {
        if (label.id === 'labe_audio_great') label.setAttribute('data-state', 'active');
        if (label.id === 'labe_audio_bad') label.setAttribute('data-state', 'not-active');
      });
    } else {
      audioToggler.setAttribute('data-state', 'not-active');

      audioLabels.forEach((label) => {
        if (label.id === 'labe_audio_great') label.setAttribute('data-state', 'note-active');
        if (label.id === 'labe_audio_bad') label.setAttribute('data-state', 'active');
      });
    }

    muteAudio();
  });
});
