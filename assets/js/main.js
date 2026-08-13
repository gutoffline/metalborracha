document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initReveal();
  initSlideshow();
});

function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (!burgerBtn || !mainNav) {
    return;
  }

  burgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  document.querySelectorAll('.main-nav .dropdown > a').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (window.innerWidth <= 900) {
        event.preventDefault();
        const dropdown = link.closest('.dropdown');
        if (dropdown) {
          dropdown.classList.toggle('open');
        }
      }
    });
  });
}

function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) {
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach((el) => observer.observe(el));
    return;
  }

  revealEls.forEach((el) => el.classList.add('is-visible'));
}

function initSlideshow() {
  const track = document.getElementById('slideTrack');
  if (!track) {
    return;
  }

  const slides = Array.from(track.querySelectorAll('img'));
  const dotsWrap = document.getElementById('slideDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!slides.length || !dotsWrap) {
    return;
  }

  const dots = [];

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    if (index === 0) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });

    dotsWrap.appendChild(dot);
    dots.push(dot);
  });

  let currentIndex = 0;
  let autoplayId;

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  function startAutoplay() {
    autoplayId = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayId);
    startAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    });
  }

  startAutoplay();
}
