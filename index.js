'use strict';

//DEFINITIONS
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.btn--close-modal');
const navTogglerButton = document.getElementById('Capa_1');
const navLinks = document.querySelector('.nav__links');
const ctaBtns = document.querySelectorAll('#btn--cta');
// const navBarContainer = document.querySelector('.nav');

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

// const handleHover = e => {
//   if (e.target.classList.contains('nav__link')) {
//     navBarContainer.style.opacity = 0.8;
//     e.target.style.opacity = 1;
//   }
// };

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

// navBarContainer.addEventListener('mouseover', handleHover);
