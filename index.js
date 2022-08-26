'use strict';

//DEFINITIONS
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.btn--close-modal');
const navTogglerButton = document.getElementById('Capa_1');
const navLinks = document.querySelector('.nav__links');
const ctaBtns = document.querySelectorAll('#btn--cta');
const navBarContainer = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const featuresImgs = document.querySelectorAll('img[data-src]');
const sections = document.querySelectorAll('.section');

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
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};

const handleScrollToSection1 = e => {
  e.preventDefault();
  section1.scrollIntoView({
    behavior: 'smooth',
  });
};

const handleSmoothScrolling = e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
};

const handleLoadImg = (entries, observer) => {
  const [entry] = entries;
  const targetImg = entry.target;
  if (!entry.isIntersecting) return;
  targetImg.src = targetImg.dataset.src;
  targetImg.addEventListener('load', function () {
    targetImg.classList.remove('img--lazy');
  });
  observer.unobserve(targetImg);
};

const handleRevealSection = (entries, observer) => {
  const [entry] = entries;
  const targetSection = entry.target;
  if (!entry.isIntersecting) return;
  targetSection.classList.remove('section--hidden');
  observer.unobserve(targetSection);
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

btnScrollTo.addEventListener('click', handleScrollToSection1);

navBarContainer.addEventListener('click', handleSmoothScrolling);

//OBSERVERS
const imgObserver = new IntersectionObserver(handleLoadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
featuresImgs.forEach(img => imgObserver.observe(img));

const sectionObserver = new IntersectionObserver(handleRevealSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
