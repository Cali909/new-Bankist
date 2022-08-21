'use strict';

//DEFINITIONS
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.btn--close-modal');
const navTogglerButton = document.getElementById('Capa_1');
const navLinks = document.querySelector('.nav__links');
const ctaBtns = document.querySelectorAll('#btn--cta');
const navBarContainer = document.querySelector('.nav');

//FUNCTIONS
const handleShowModal = () => {
  overlayEl.classList.remove('hidden');
  modalEl.classList.remove('hidden');
};

const handleCloseModal = () => {
  overlayEl.classList.add('hidden');
  modalEl.classList.add('hidden');
};

const handleNavToggle = () => {
  navLinks.classList.toggle('expanded');
  navTogglerButton.classList.toggle('expanded');
};

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

//EVENTLISTENERS
ctaBtns.forEach(btn => btn.addEventListener('click', handleShowModal));
overlayEl.addEventListener('click', handleCloseModal);
closeModalBtn.addEventListener('click', handleCloseModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
    handleCloseModal();
  }
});

navTogglerButton.addEventListener('click', handleNavToggle);

navBarContainer.addEventListener('mouseover', handleHover.bind(0.5));
navBarContainer.addEventListener('mouseout', handleHover.bind(1));
