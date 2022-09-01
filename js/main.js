"use strict";

/* global */
window.addEventListener('DOMContentLoaded', function() {
  // Header-menu
  var headerMenu = document.querySelector('.header-menu');

  if (headerMenu) {
    var headerMenuButton = headerMenu.querySelector('.header-menu__button');
    var headerMenuNav = headerMenu.querySelector('.header-menu__nav');
    headerMenuButton.addEventListener('click', function() {
      if (headerMenuNav.classList.contains('--active')) {
        headerMenuNav.classList.remove('--active');
      } else {
        headerMenuNav.classList.add('--active');
      }
    });
    headerMenuNav.addEventListener('click', function(e) {
      e.preventDefault();
      var target = e.target;

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