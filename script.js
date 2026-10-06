const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.textContent = open ? 'Close' : 'Menu';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = 'Menu';
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

// Let keyboard users dismiss the mobile navigation.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = 'Menu';
    navToggle.focus();
  }
});

const themeButton = document.querySelector('.theme-toggle');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeButton.innerHTML = `${dark ? '☀' : '☾'} <span>Theme</span>`;
}
let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch {}
applyTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch {}
});

const focusDescriptions = {
  backend: 'Secure APIs, transaction safety and maintainable Java services.',
  data: 'Python, statistical analysis and practical insights from financial data.',
  algorithms: 'Graph-based pathfinding, simulation and mathematical problem solving.'
};
document.querySelectorAll('[data-focus]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-focus]').forEach(item => {
      item.classList.toggle('selected', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelector('.focus-description').textContent = focusDescriptions[button.dataset.focus];
  });
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('selected', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      if (!project.hidden) count++;
    });
    document.querySelector('.filter-status').textContent = `Showing ${count} project${count === 1 ? '' : 's'}`;
  });
});

const backTop = document.querySelector('.back-top');
const progress = document.querySelector('.scroll-progress');
let scrollScheduled = false;
function updateScroll() {
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progress.style.width = `${height > 0 ? Math.min(100, window.scrollY / height * 100) : 0}%`;
  backTop.classList.toggle('show', window.scrollY > 600);
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScroll); }
}, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();
backTop.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  document.querySelector('.brand').focus({preventScroll:true});
});
