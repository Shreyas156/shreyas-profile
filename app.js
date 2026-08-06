// Interactive Application Logic for Shreyas Peherkar QA Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initSkillsFilter();
  initResumeModal();
  initContactForm();
  initScrollAnimations();
});

/* ----------------------------------------------------
 * 1. Theme Toggle (Dark / Light Mode)
 * ---------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  const sunIcon = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`;
  const moonIcon = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`;

  // Saved theme or default dark
  const savedTheme = localStorage.getItem('shreyas_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  themeIcon.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;

  themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('shreyas_theme', newTheme);
    themeIcon.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon;
    showToast(`Switched to ${newTheme} mode`);
  });
}

/* ----------------------------------------------------
 * 2. Navigation & Scroll Highlights
 * ---------------------------------------------------- */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ----------------------------------------------------
 * 3. QA & Automation Playground Simulators
 * ---------------------------------------------------- */


/* Helper Delay Function */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ----------------------------------------------------
 * 4. Skills Filter & Progress Animation
 * ---------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Animate Progress Bars on Scroll */
function initScrollAnimations() {
  const progressFills = document.querySelectorAll('.skill-progress-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-progress');
        entry.target.style.width = targetWidth;
      }
    });
  }, { threshold: 0.2 });

  progressFills.forEach(fill => observer.observe(fill));
}

/* ----------------------------------------------------
 * 5. Resume Drawer Modal
 * ---------------------------------------------------- */
function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('openResumeBtn');
  const closeBtn = document.getElementById('closeResumeBtn');
  const printBtn = document.getElementById('printResumeBtn');

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  printBtn.addEventListener('click', () => {
    window.print();
  });
}

/* ----------------------------------------------------
 * 6. Contact Form & Toast Notifications
 * ---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    
    showToast(`Thank you ${name}! Your message has been sent to Shreyas.`);
    form.reset();
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary-emerald);"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
