document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initActiveNavLink();
  initMobileMenu();
  initReveal();
  initSlideshow();
  initWhatsAppButtons();
  initWhatsAppForms();
});

function openWhatsAppChat(message = 'Olá! Gostaria de mais informações.') {
  const whatsappNumber = '551920187600';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener');
}

function initWhatsAppButtons() {
  document.querySelectorAll('.whatsapp-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const anchor = event.currentTarget;
      const customMessage = anchor.dataset.message || 'Olá! Gostaria de mais informações.';
      event.preventDefault();
      openWhatsAppChat(customMessage);
    });
  });
}

function initWhatsAppForms() {
  const forms = document.querySelectorAll('form.contact-form, form#contactForm');

  if (!forms.length) {
    return;
  }

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const firstName = document.getElementById('firstName')?.value?.trim() || '';
      const lastName = document.getElementById('lastName')?.value?.trim() || '';
      const email = document.getElementById('email')?.value?.trim() || '';
      const message = document.getElementById('message')?.value?.trim() || '';
      const name = [firstName, lastName].filter(Boolean).join(' ') || 'Cliente';
      const text = [
        'Olá! Gostaria de entrar em contato.',
        `Nome: ${name}`,
        email ? `E-mail: ${email}` : '',
        message ? `Mensagem: ${message}` : '',
        '',
        'Mensagem enviada pelo site Metal Borracha.'
      ].filter(Boolean).join('\n');

      openWhatsAppChat(text);
      form.reset();
    });
  });
}

function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  if (!currentPage) {
    return;
  }

  const activeLink = document.querySelector(
    '.main-nav a[href="produtos-hidraulicos.html"], .main-nav a[href="index.html#produtos"]'
  );

  if (currentPage === 'produtos-hidraulicos.html' && activeLink) {
    activeLink.classList.add('active');
  }
}

function initHeaderScroll() {
  const body = document.body;
  const root = document.documentElement;

  if (!body || !root) {
    return;
  }

  const updateHeaderState = () => {
    const shouldBeScrolled = window.scrollY > 20 || root.scrollTop > 20 || body.scrollTop > 20;
    body.classList.toggle('scrolled', shouldBeScrolled);
    root.classList.toggle('scrolled', shouldBeScrolled);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  window.addEventListener('load', updateHeaderState);
}

function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (!burgerBtn || !mainNav) {
    return;
  }

  burgerBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    const clickedInside = mainNav.contains(event.target) || burgerBtn.contains(event.target);
    if (window.innerWidth <= 900 && mainNav.classList.contains('open') && !clickedInside) {
      mainNav.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    }
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
