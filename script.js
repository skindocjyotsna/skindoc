/* ===========================
   Dr. Jyotsna's SkinDoc – script.js
   =========================== */

'use strict';

/* ---- Navbar scroll ---- */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateScrollTop();
}, { passive: true });

/* ---- Mobile menu ---- */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- Service Tabs ---- */
function initTabs() {
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabPanels  = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) {
        panel.classList.add('active');
        // Re-trigger AOS for newly visible cards
        panel.querySelectorAll('[data-aos]').forEach(el => {
          el.classList.add('aos-animate');
        });
      }
    });
  });
}

/* ---- AOS (Animate On Scroll) ---- */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.getAttribute('data-aos-delay') || 0, 10);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ---- Testimonials Slider ---- */
function initSlider() {
  const track    = document.getElementById('testimonialsTrack');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('sliderDots');

  if (!track) return;

  const cards  = track.querySelectorAll('.testimonial-card');
  let current  = 0;
  let perView  = getPerView();
  const total  = cards.length;
  let maxIndex = Math.max(0, total - perView);
  let autoTimer;

  function getPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640)  return 2;
    return 1;
  }

  function getCardWidth() {
    if (!cards[0]) return 0;
    const marginRight = parseFloat(window.getComputedStyle(cards[0]).marginRight) || 0;
    return cards[0].offsetWidth + marginRight;
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const numDots = Math.ceil(total / perView);
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => { goTo(i * perView); resetAuto(); });
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === Math.round(current / perView));
    });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex));
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;
    updateDots();
  }

  prevBtn.addEventListener('click', () => { goTo(current - perView); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current >= maxIndex ? 0 : current + perView); resetAuto(); });

  function startAuto() { autoTimer = setInterval(() => goTo(current >= maxIndex ? 0 : current + perView), 4500); }
  function resetAuto()  { clearInterval(autoTimer); startAuto(); }

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) {
      goTo(diff > 0 ? current + perView : current - perView);
      resetAuto();
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    perView  = getPerView();
    maxIndex = Math.max(0, total - perView);
    current  = Math.min(current, maxIndex);
    buildDots();
    goTo(current);
  });

  buildDots();
  startAuto();
}

/* ---- Appointment Form ---- */
function initForm() {
  const form         = document.getElementById('appointmentForm');
  const nameInput    = document.getElementById('fullName');
  const phoneInput   = document.getElementById('phone');
  const serviceInput = document.getElementById('service');
  const dateInput    = document.getElementById('apptDate');
  const successMsg   = document.getElementById('formSuccess');

  if (!form) return;

  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  function setError(input, msgId, msg) {
    input.classList.add('error');
    const el = document.getElementById(msgId);
    if (el) el.textContent = msg;
  }
  function clearError(input, msgId) {
    input.classList.remove('error');
    const el = document.getElementById(msgId);
    if (el) el.textContent = '';
  }

  function validate() {
    let ok = true;

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameInput, 'nameError', 'Please enter your full name.');
      ok = false;
    } else { clearError(nameInput, 'nameError'); }

    const ph = phoneInput.value.trim().replace(/[\s\-()]/g, '');
    if (!ph || !/^\+?\d{10,15}$/.test(ph)) {
      setError(phoneInput, 'phoneError', 'Please enter a valid 10-digit phone number.');
      ok = false;
    } else { clearError(phoneInput, 'phoneError'); }

    if (!serviceInput.value) {
      setError(serviceInput, 'serviceError', 'Please select a treatment.');
      ok = false;
    } else { clearError(serviceInput, 'serviceError'); }

    if (!dateInput.value) {
      setError(dateInput, 'dateError', 'Please select a preferred date.');
      ok = false;
    } else if (dateInput.value < today) {
      setError(dateInput, 'dateError', 'Please select a future date.');
      ok = false;
    } else { clearError(dateInput, 'dateError'); }

    return ok;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const name    = nameInput.value.trim();
    const phone   = phoneInput.value.trim();
    const email   = document.getElementById('email').value.trim();
    const service = serviceInput.value;
    const date    = dateInput.value;
    const time    = document.getElementById('apptTime').value || 'Not specified';
    const notes   = document.getElementById('message').value.trim();

    const lines = [
      `Hi Dr. Jyotsna, I would like to book an appointment at SkinDoc.`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      email ? `*Email:* ${email}` : null,
      `*Treatment:* ${service}`,
      `*Preferred Date:* ${date}`,
      `*Preferred Time:* ${time}`,
      notes ? `*Notes:* ${notes}` : null,
    ].filter(line => line !== null).join('\n');

    const waURL = `https://wa.me/9921358563?text=${encodeURIComponent(lines)}`;

    // Reliable redirect — works on mobile (opens WhatsApp app) and desktop (WhatsApp Web)
    const a = document.createElement('a');
    a.href = waURL;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    form.reset();
    successMsg.style.display = 'block';
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { successMsg.style.display = 'none'; }, 7000);
  });

  [nameInput, phoneInput, serviceInput, dateInput].forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });
}

/* ---- Scroll to Top ---- */
const scrollTopBtn = document.getElementById('scrollTop');
function updateScrollTop() {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- Smooth anchor scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAOS();
  initSlider();
  initForm();
});
