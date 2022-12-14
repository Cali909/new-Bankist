'use strict';

//CALL TO ACTION (CTA) BITTON
const ctaBtns = document.querySelectorAll('.btn--cta');

//MODAL and OVERLAY
const overlayEl = document.querySelector('.overlay');
const modalEl = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.btn--close-modal');

const handleShowModal = () => {
  overlayEl.classList.remove('hidden');
  modalEl.classList.remove('hidden');
};

const handleCloseModal = () => {
  overlayEl.classList.add('hidden');
  modalEl.classList.add('hidden');
};

ctaBtns.forEach(btn => btn.addEventListener('click', handleShowModal));
overlayEl.addEventListener('click', handleCloseModal);
closeModalBtn.addEventListener('click', handleCloseModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
    handleCloseModal();
  }
});

//NAVIGATION BAR
const navTogglerButton = document.getElementById('Capa_1');
const navLinks = document.querySelector('.nav__links');
const navBarContainer = document.querySelector('.nav');
// const ctaBtns = document.querySelectorAll('.btn--cta');

const handleNavToggle = () => {
  navLinks.classList.toggle('expanded');
  navTogglerButton.classList.toggle('expanded');
};

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el =>
      el.addEventListener('click', function () {
        navLinks.classList.remove('expanded');
      })
    );
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};

navTogglerButton.addEventListener('click', handleNavToggle);
navBarContainer.addEventListener('mouseover', handleHover.bind(0.5));
navBarContainer.addEventListener('mouseout', handleHover.bind(1));

//HERO LINK
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const handleScrollToSection1 = e => {
  e.preventDefault();
  section1.scrollIntoView({
    behavior: 'smooth',
  });
};

btnScrollTo.addEventListener('click', handleScrollToSection1);

//LAZY LOADING FOR FEATURES IMAGES
const featuresImgs = document.querySelectorAll('img[data-src]');

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

const imgObserver = new IntersectionObserver(handleLoadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
featuresImgs.forEach(img => imgObserver.observe(img));

//SMOOTH SCROLL INTO SECTION VIEWS (Click on Nav Bar Links)
const sections = document.querySelectorAll('.section');

const handleSmoothScrolling = e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
};

navBarContainer.addEventListener('click', handleSmoothScrolling);

//TAB COMPONENT
const operationTabsContainer = document.querySelector(
  '.operations__tabs-container'
);
const operationsContent = document.querySelectorAll('.operation__content');

const handleShowTab = e => {
  const tab = e.target.closest('.operation__tab');
  if (!tab) return;
  const tabs = tab
    .closest('.operations__tabs-container')
    .querySelectorAll('.operation__tab');
  tabs.forEach(tab => tab.classList.remove('operation__tab--active'));
  operationsContent.forEach(content =>
    content.classList.remove('operation__content--active')
  );
  tab.classList.add('operation__tab--active');
  const content = document.querySelector(
    `.operation__content--${tab.dataset.tab}`
  );
  content.classList.add('operation__content--active');
};

operationTabsContainer.addEventListener('click', handleShowTab);

//SLIDER COMPONENT
const slides = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

const slider = () => {
  //Slider
  let currentSlide = 0;
  const lastSlide = slides.length - 1;

  //Slider General Functions
  const goToSlide = slideNumber => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - slideNumber)}%)`;
    });
  };

  const nextSlide = function () {
    if (currentSlide === lastSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = lastSlide;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  //Slider Event Listeners
  sliderBtnRight.addEventListener('click', nextSlide);
  sliderBtnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  //Dots

  //Dots General Functions
  const createDots = () => {
    slides.forEach((_, index) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="dot dot--active" data-slide="${index}"></div>`
      );
    });
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.dot')
      .forEach(dot => dot.classList.remove('dot--active'));

    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add('dot--active');
  };

  const handleDotChange = e => {
    if (e.target.classList.contains('dot')) {
      const slideNumber = e.target.dataset.slide;
      goToSlide(slideNumber);
      activateDot(slideNumber);
    }
  };
  //Dots Event listeners
  dotsContainer.addEventListener('click', handleDotChange);

  //Initial State for Whole Slider and Dots
  const initializeSliderStatus = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  initializeSliderStatus();

  setInterval(nextSlide, 15000);
};

slider();

//REVEAL SECTIONS WHEN REACHED
const handleRevealSection = (entries, observer) => {
  const [entry] = entries;
  const targetSection = entry.target;
  if (!entry.isIntersecting) return;
  targetSection.classList.remove('section--hidden');
  observer.unobserve(targetSection);
};

const sectionObserver = new IntersectionObserver(handleRevealSection, {
  root: null,
  threshold: 0.15,
  // rootMargin: '-200px',
});
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
