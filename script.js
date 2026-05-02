/* ===========================
   Dr. Jyotsna's SkinDoc – script.js
   =========================== */

'use strict';

/* ---- Navbar scroll ---- */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateScrollTop();
}, { passive: true });

/* ---- Mobile menu ---- */
if (hamburger && navLinks) {
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
}

/* ---- Service Tabs ---- */
function initTabs() {
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabPanels  = document.querySelectorAll('.tab-content');

  if (!tabBtns.length) return;

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
        
        // Smart Navigation: Update URL parameter for deep linking without reloading
        if (window.history.replaceState) {
          const url = new URL(window.location);
          url.searchParams.set('tab', target);
          window.history.replaceState(null, '', url);
        }
      }
    });
  });

  // Check URL for specific tab on load (e.g. ?tab=laser)
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('tab');
  if (activeTab) {
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${activeTab}"]`);
    if (targetBtn) targetBtn.click();
  }
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
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 768) return 2;
    return 1;
  }

  function getCardWidth() {
    if (!cards[0]) return 0;
    const marginRight = parseFloat(window.getComputedStyle(cards[0]).marginRight) || 0;
    return cards[0].getBoundingClientRect().width + marginRight;
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

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - perView); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current >= maxIndex ? 0 : current + perView); resetAuto(); });

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

/* ---- Fetch Live Google Reviews ---- */
function initGoogleReviews() {
  const track = document.getElementById('testimonialsTrack');
  // If Google Maps API is loaded properly
  if (track && typeof google === 'object' && typeof google.maps === 'object') {
    const map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);
    
    // Replace with your actual Google Place ID
    const request = { placeId: 'YOUR_PLACE_ID', fields: ['reviews'] };
    
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
        // Filter for high-quality reviews (4 and 5 stars only) to protect your brand
        const positiveReviews = place.reviews.filter(r => r.rating >= 4);
        
        const reviewsHTML = positiveReviews.map(r => {
          const text = r.text || '';
          return `
          <div class="testimonial-card">
            <div class="stars">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</div>
            <p>"${text.length > 180 ? text.substring(0, 180) + '...' : text}"</p>
            <div class="testimonial-author">
              <div class="author-avatar"><img src="${r.profile_photo_url}" alt="${r.author_name}" style="width:100%; border-radius:50%;" referrerpolicy="no-referrer"></div>
              <div>
                <strong>${r.author_name}</strong>
                <span>Verified Google Review</span>
              </div>
            </div>
          </div>
        `}).join('');
        track.insertAdjacentHTML('afterbegin', reviewsHTML);
      }
      initSlider(); // Init slider AFTER reviews are added
    });
  } else {
    initSlider(); // Fallback if API fails to load
  }
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
    const emailEl = document.getElementById('email');
    const email   = emailEl ? emailEl.value.trim() : '';
    const service = serviceInput.value;
    const date    = dateInput.value;
    const timeEl  = document.getElementById('apptTime');
    const time    = (timeEl && timeEl.value) ? timeEl.value : 'Not specified';
    const notesEl = document.getElementById('message');
    const notes   = notesEl ? notesEl.value.trim() : '';

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

    const waURL = `https://wa.me/919921358563?text=${encodeURIComponent(lines)}`;

    // Reliable redirect - works on mobile (opens WhatsApp app) and desktop (WhatsApp Web)
    const a = document.createElement('a');
    a.href = waURL;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    form.reset();
    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { successMsg.style.display = 'none'; }, 7000);
    }
  });

  [nameInput, phoneInput, serviceInput, dateInput].forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });
}

/* ---- Scroll to Top ---- */
const scrollTopBtn = document.getElementById('scrollTop');
function updateScrollTop() {
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Smooth anchor scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return; // Defensive check against invalid selectors

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();

      // SMART SCROLL: If the target is hidden inside an inactive tab, open it first
      const parentTab = target.closest('.tab-content');
      if (parentTab && !parentTab.classList.contains('active')) {
        const tabId = parentTab.id.replace('tab-', '');
        const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (tabBtn) tabBtn.click();
      }

      // Delay slightly to let the browser render the newly active tab
      setTimeout(() => {
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 10);
    }
  });
});

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAOS();
  initGoogleReviews();
  initForm();
});
