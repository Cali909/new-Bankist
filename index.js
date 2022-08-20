'use strict';

const navTogglerButton = document.getElementById('Capa_1');
const navLinks = document.querySelector('.nav__links');

const handleNavToggle = () => {
  navLinks.classList.toggle('expanded');
  navTogglerButton.classList.toggle('expanded');
};

navTogglerButton.addEventListener('click', handleNavToggle);
