'use strict';

const navTogglerButton = document.getElementById('Capa_1');
const navLinks = document.querySelector('.nav__links');
// const navBarContainer = document.querySelector('.nav');

const handleNavToggle = () => {
  navLinks.classList.toggle('expanded');
  navTogglerButton.classList.toggle('expanded');
};

// const handleHover = e => {
//   if (e.target.classList.contains('nav__link')) {
//     navBarContainer.style.opacity = 0.8;
//     e.target.style.opacity = 1;
//   }
// };

navTogglerButton.addEventListener('click', handleNavToggle);

// navBarContainer.addEventListener('mouseover', handleHover);
