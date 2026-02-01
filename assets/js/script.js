/*
  PORTFOLIO GENNARO CECCO
*/

// LOADER

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 2000);
});

// NAVBAR SCROLL EFFECT

const navbar = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// SMOOTH SCROLLING & ACTIVE NAV LINK

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarCollapse).hide();
      }
    }
  });
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

// ANIMATED STATISTICS COUNTER

const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);

        if (stat.dataset.infinite === "true") {
          stat.textContent = Math.floor(current);

          setTimeout(() => {
            // fade out
            stat.style.transition = "opacity 0.45s ease, transform 0.45s ease";
            stat.style.opacity = "0";
            stat.style.transform = "translateY(-8px)";

            setTimeout(() => {
              // cambia in infinito
              stat.textContent = "∞";

              // fade in
              stat.style.transform = "translateY(0)";
              stat.style.opacity = "1";
            }, 350);

          }, 300);

        } else {
          stat.textContent = Math.floor(current);
        }

      } else {
        stat.textContent = Math.floor(current);
      }

    }, 16);
  });
  
  statsAnimated = true;
}

// Trigger stats animation when in viewport
const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
    }
  });
}, { threshold: 0.5 });

if (aboutSection) {
  observer.observe(aboutSection);
}

// SKILL BARS ANIMATION

const skillBars = document.querySelectorAll('.skill-bar-fill');
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    }, index * 100);
  });
  
  skillsAnimated = true;
}

const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
    }
  });
}, { threshold: 0.5 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll('.project-card, .skill-category, .contact-card, .small-project-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// BACK TO TOP BUTTON

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// TYPING EFFECT FOR HERO TITLE

function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//   const originalText = heroTitle.textContent;
//   setTimeout(() => {
//     typeWriter(heroTitle, originalText, 50);
//   }, 500);
// }

// PARALLAX EFFECT ON HERO IMAGE

const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
  if (heroImage && window.scrollY < window.innerHeight) {
    const scrolled = window.scrollY;
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// PROJECT CARDS TILT EFFECT

const projectCards = document.querySelectorAll('.small-project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// SKILL PILLS SHUFFLE ANIMATION

function shuffleSkills() {
  const skillCategories = document.querySelectorAll('.skill-category');
  
  skillCategories.forEach(category => {
    const pills = category.querySelectorAll('.skill-pill');
    const pillsArray = Array.from(pills);
    
    // Random shuffle animation on hover
    category.addEventListener('mouseenter', () => {
      pills.forEach((pill, index) => {
        setTimeout(() => {
          pill.style.transform = 'scale(1.1)';
          setTimeout(() => {
            pill.style.transform = 'scale(1)';
          }, 200);
        }, index * 50);
      });
    });
  });
}

shuffleSkills();

// CONSOLE EASTER EGG

console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #00ff88;');
console.log('%cLooking for something? Check out the source code on GitHub!', 'font-size: 14px; color: #8892b0;');
console.log('%chttps://github.com/GennaroCecco', 'font-size: 14px; color: #00ff88; text-decoration: underline;');

// KONAMI CODE EASTER EGG

let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateKonamiCode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateKonamiCode() {
  // Fun effect: make everything neon for 3 seconds
  document.body.style.filter = 'hue-rotate(180deg) saturate(3)';
  setTimeout(() => {
    document.body.style.filter = 'none';
  }, 3000);
  
  console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'font-size: 30px; font-weight: bold; color: #00ff88; text-shadow: 0 0 10px #00ff88;');
}

// DYNAMIC YEAR IN FOOTER

const footerText = document.querySelector('.footer-text');
if (footerText && footerText.textContent.includes('2024')) {
  const currentYear = new Date().getFullYear();
  footerText.textContent = footerText.textContent.replace('2024', currentYear);
}

// KEYBOARD NAVIGATION

document.addEventListener('keydown', (e) => {
  // Press 'h' to go to home
  if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
    const homeSection = document.getElementById('home');
    if (homeSection && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// PERFORMANCE MONITORING

if ('PerformanceObserver' in window) {
  // Monitor First Contentful Paint
  const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log(`⚡ FCP: ${entry.startTime.toFixed(2)}ms`);
      }
    }
  });
  
  perfObserver.observe({ entryTypes: ['paint'] });
}

// THEME TOGGLE (OPTIONAL)

// Uncomment to add light/dark theme toggle
/*
let isDarkMode = true;

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Check saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  toggleTheme();
}
*/





// INITIALIZE

console.log('%c✨ Portfolio Loaded Successfully!', 'font-size: 16px; font-weight: bold; color: #00ff88;');
console.log('%cBuilt with ❤️ by Gennaro Cecco', 'font-size: 12px; color: #8892b0;');