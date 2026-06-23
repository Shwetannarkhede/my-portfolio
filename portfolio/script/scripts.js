// ===== AOS INIT =====
AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.add('hide');
    initGSAP();
  }, 1800);
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  setTimeout(() => {
    follower.style.left = mouseX + 'px';
    follower.style.top = mouseY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .project-card, .skill-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => follower.classList.add('hover'));
  el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
});

// ===== NAVBAR =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const cur = window.pageYOffset;
  navbar.classList.toggle('scrolled', cur > 80);
  navbar.style.transform = (cur > lastScroll && cur > 400) ? 'translateY(-100%)' : 'translateY(0)';
  lastScroll = cur;
  document.getElementById('backToTop').classList.toggle('show', cur > 500);
});

// ===== HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// ===== TYPED =====
new Typed('.typed-text', {
  strings: ['Full Stack Developer', 'Java Expert', 'Spring Boot Specialist', 'Problem Solver'],
  typeSpeed: 55, backSpeed: 35, backDelay: 2200, loop: true
});

// ===== PARTICLES =====
particlesJS('particles-js', {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 900 } },
    color: { value: '#00d4aa' },
    shape: { type: 'circle' },
    opacity: { value: 0.3, random: true },
    size: { value: 2, random: true },
    line_linked: { enable: true, distance: 160, color: '#00d4aa', opacity: 0.1, width: 1 },
    move: { enable: true, speed: 1.5, direction: 'none', random: true, out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { grab: { distance: 160, line_linked: { opacity: 0.4 } }, push: { particles_nb: 3 } }
  },
  retina_detect: true
});

// ===== GSAP =====
function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.timeline()
    .from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.7, delay: 0.2 })
    .from('.hero-title', { opacity: 0, y: 24, duration: 0.7 }, '-=0.4')
    .from('.hero-subtitle', { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
    .from('.hero-description', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from('.hero-buttons .btn', { opacity: 0, y: 16, duration: 0.5, stagger: 0.12 }, '-=0.3')
    .from('.hero-visual', { opacity: 0, x: 30, duration: 0.9 }, '-=0.7');

  // Skill bars
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const level = bar.getAttribute('data-level');
    ScrollTrigger.create({
      trigger: bar, start: 'top 90%', once: true,
      onEnter: () => gsap.to(bar, { width: level + '%', duration: 1.4, ease: 'power2.out' })
    });
  });

  // Stat counters
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-value'));
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(el, {
        textContent: target, duration: 1.5, ease: 'power1.out',
        snap: { textContent: 1 },
        onUpdate() { el.textContent = Math.ceil(this.targets()[0].textContent); }
      })
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #00d4aa, #00a88a)';
  setTimeout(() => {
    btn.innerHTML = 'Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ===== RESUME =====
function downloadResume() {
  const a = document.createElement('a');
  a.href = './SHWETA NILKANTH NARKHEDE.pdf';
  a.download = 'Shweta_Narkhede_Resume.pdf';
  a.click();
}

// ===== THEME TOGGLE =====
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}
// Load saved theme
(function() {
  if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');
})();

// ===== SKILLS TABS =====
function initSkillMeters(panel) {
  panel.querySelectorAll('.sm-fill').forEach(fill => {
    const level = fill.getAttribute('data-level');
    fill.style.width = '0';
    requestAnimationFrame(() => {
      setTimeout(() => { fill.style.width = level + '%'; }, 80);
    });
  });
}

document.querySelectorAll('.stab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + btn.dataset.tab);
    panel.classList.add('active');
    initSkillMeters(panel);
  });
});

// Init meters on scroll for first visible tab
ScrollTrigger && ScrollTrigger.create({
  trigger: '#skills', start: 'top 80%', once: true,
  onEnter: () => {
    const active = document.querySelector('.skills-panel.active');
    if (active) initSkillMeters(active);
  }
});

// ===== SKILLS — Ring Animations =====
function animateRings() {
  document.querySelectorAll('.ring-fill').forEach(ring => {
    const pct = parseInt(ring.getAttribute('data-pct'));
    const circumference = 2 * Math.PI * 32; // r=32
    const offset = circumference - (pct / 100) * circumference;
    ring.style.strokeDashoffset = offset;
  });
}

// Trigger ring animation when skills section enters viewport
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateRings(); observer.disconnect(); }
    });
  }, { threshold: 0.15 });
  observer.observe(skillsSection);
}

// ===== SKILLS — Tab Filter =====
document.querySelectorAll('.sk-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.sk-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.getAttribute('data-cat');
    document.querySelectorAll('.sk-card').forEach(card => {
      if (cat === 'all' || card.getAttribute('data-cat') === cat) {
        card.classList.remove('hidden');
        card.style.animation = 'skCardIn 0.35s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
    // Re-animate rings for visible cards
    setTimeout(animateRings, 50);
  });
});

// Add keyframe via JS
const styleEl = document.createElement('style');
styleEl.textContent = '@keyframes skCardIn { from { opacity:0; transform:translateY(16px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }';
document.head.appendChild(styleEl);
