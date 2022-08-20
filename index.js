'use strict';

const navTogglerButton = document.getElementById('Capa_1');
const navLinks = document.querySelector('.nav__links');

const handleNavToggle = () => {
  navLinks.classList.toggle('expanded');
  navTogglerButton.classList.toggle('expanded');
};

const handleNavLinksHover = e => {
  // if(e.target)
  e.target.classList.add('highlight');
};

navTogglerButton.addEventListener('click', handleNavToggle);

navLinks.addEventListener('mouseover', handleNavLinksHover);
