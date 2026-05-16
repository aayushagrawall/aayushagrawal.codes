/* =========================================
   aayushagrawal.codes — main.js
   ========================================= */

// ── Intersection Observer for fade-up animations
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.08) + 's';
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ── Typewriter effect
function typewriter(el, texts, speed = 80) {
  let ti = 0, ci = 0, deleting = false;

  function tick() {
    const text = texts[ti];
    if (!deleting) {
      el.textContent = text.slice(0, ++ci);
      if (ci === text.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = text.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % texts.length;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

const roleEl = document.getElementById('typed-role');
if (roleEl) {
  typewriter(roleEl, [
    'AIML Student',
    'Python Dev',
    'Bot Builder',
    'Problem Solver',
    'Open Sourcerer',
  ]);
}

// ── Mobile hamburger
const ham = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (ham) {
  ham.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Navbar active link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const h = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + h) {
      navItems.forEach(a => {
        a.classList.toggle('active-nav', a.getAttribute('href') === '#' + sec.id);
      });
    }
  });
}, { passive: true });

// ── Pencil cursor trail
const canvas = document.createElement('canvas');
canvas.id = 'trail-canvas';
Object.assign(canvas.style, {
  position: 'fixed', inset: '0',
  pointerEvents: 'none', zIndex: '9998',
  width: '100vw', height: '100vh',
});
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const trails = [];
document.addEventListener('mousemove', (e) => {
  trails.push({ x: e.clientX, y: e.clientY, alpha: 0.35, life: 1 });
  if (trails.length > 40) trails.shift();
});

function renderTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (trails.length > 1) {
    ctx.beginPath();
    ctx.moveTo(trails[0].x, trails[0].y);
    for (let i = 1; i < trails.length; i++) {
      ctx.lineTo(trails[i].x, trails[i].y);
    }
    ctx.strokeStyle = 'rgba(139, 115, 85, 0.18)';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }
  requestAnimationFrame(renderTrail);
}
renderTrail();

// ── File tree current section highlighter
function updateFileTree() {
  const scrollY = window.scrollY + 160;
  const map = {
    'hero':     'index.html',
    'about':    'about.html',
    'projects': 'projects.html',
    'contact':  'contact.html',
  };
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const h = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + h) {
      document.querySelectorAll('.tree-file').forEach(f => {
        f.classList.remove('active');
        if (f.dataset.file === map[sec.id]) f.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', updateFileTree, { passive: true });
