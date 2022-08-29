/* global Swiper, WaveSurfer */
window.addEventListener('DOMContentLoaded', () => {
  // Sliders:
  const exempleSilder = document.querySelector('.examples__slider');

  // for "Exemple" section
  if (exempleSilder) {
    new Swiper(exempleSilder, {
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: {
        prevEl: '.button-group__button_prev',
        nextEl: '.button-group__button_next',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1280: {
          spaceBetween: 32,
          slidesPerView: 2,
        },
        1920: {
          spaceBetween: 90,
          slidesPerView: 2,
        },
      },
    });
  }

  // Audio wawes
  const playPauseBtn = document.querySelector('#playPauseButton');
  const acousticsBad = document.querySelector('#acoustics_bad').getAttribute('data-sound');
  const acousticsGreat = document.querySelector('#acoustics_great').getAttribute('data-sound');

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

  const wavesAcousticsBad = WaveSurfer.create({ container: '#acoustics_bad', ...wavesSetting });
  const wavesAcousticsGreat = WaveSurfer.create({ container: '#acoustics_great', ...wavesSetting });

  wavesAcousticsBad.load(acousticsBad);
  wavesAcousticsGreat.load(acousticsGreat);

  function muteAudio() {
    if (audioToggler.getAttribute('data-state') === 'not-active') {
      wavesAcousticsBad.setVolume(1);
      wavesAcousticsGreat.setVolume(0);
    } else {
      wavesAcousticsBad.setVolume(0);
      wavesAcousticsGreat.setVolume(1);
    }
  }

  playPauseBtn.addEventListener('click', () => {
    muteAudio();

    if (playPauseBtn.getAttribute('data-state') === 'pause') {
      playPauseBtn.setAttribute('data-state', 'play');

      wavesAcousticsBad.play();
      wavesAcousticsGreat.play();
    } else {
      playPauseBtn.setAttribute('data-state', 'pause');

      wavesAcousticsBad.pause();
      wavesAcousticsGreat.pause();
    }
  });

  audioToggler.addEventListener('click', () => {
    if (audioToggler.getAttribute('data-state') === 'not-active') {
      audioToggler.setAttribute('data-state', 'active');

      audioLabels.forEach((label) => {
        if (label.id === 'label_great') label.setAttribute('data-state', 'active');
        if (label.id === 'label_bad') label.setAttribute('data-state', 'not-active');
      });
    } else {
      audioToggler.setAttribute('data-state', 'not-active');

      audioLabels.forEach((label) => {
        if (label.id === 'label_great') label.setAttribute('data-state', 'note-active');
        if (label.id === 'label_bad') label.setAttribute('data-state', 'active');
      });
    }

    muteAudio();
  });
});
