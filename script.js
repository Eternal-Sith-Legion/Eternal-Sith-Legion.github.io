// script.js — defensive version with debug logs
document.addEventListener('DOMContentLoaded', () => {
  try {
    // ---------- HAMBURGER MENU ----------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger) console.warn('hamburger element not found (id="hamburger")');
    if (!navMenu) console.warn('navMenu element not found (id="navMenu")');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });

      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
        });
      });
    }

    // ---------- SCROLL FADE-IN ----------
    const sections = document.querySelectorAll('header, section');
    if (!sections || sections.length === 0) {
      console.warn('No header/section elements found for scroll fade-in');
    } else {
      const onScroll = () => {
        const trigger = (window.innerHeight / 5) * 4;
        sections.forEach(sec => {
          const boxTop = sec.getBoundingClientRect().top;
          if (boxTop < trigger) sec.classList.add('visible');
        });
      };
      window.addEventListener('scroll', onScroll);
      // run once in case some are already in view
      onScroll();
    }

    // ---------- FIRE EFFECT (INTRO) ----------
    const canvas = document.getElementById('fireCanvas');
    if (!canvas) {
      console.warn('Canvas #fireCanvas not found — skipping fire effect');
    } else {
      const ctx = canvas.getContext('2d');
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      let particles = [];
      const particleCount = 300;
      const resetParticles = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            speedY: Math.random() * 1 + 0.5,
            alpha: Math.random() * 0.9 + 0.1
          });
        }
      };
      resetParticles();

      function animateParticles() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          // subtle color variation
          const green = Math.floor(Math.random() * 40);
          ctx.fillStyle = `rgba(255, ${green}, 0, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.y -= p.speedY;
          if (p.y < 0) p.y = canvas.height + Math.random() * 50;
        });
        requestAnimationFrame(animateParticles);
      }
      animateParticles();
    }

    // ---------- SHOW MAIN CONTENT AFTER INTRO ----------
    function showMain() {
      const intro = document.getElementById('intro');
      const mainContent = document.getElementById('mainContent');
      const headerSection = document.getElementById('headerSection');

      if (!intro) console.warn('#intro not found');
      if (!mainContent) console.warn('#mainContent not found');

      if (intro) intro.style.display = 'none';
      if (mainContent) mainContent.style.display = 'block';
      if (headerSection) headerSection.classList.add('visible');
    }

    // show main after 4s (only if elements present)
    setTimeout(showMain, 4000);

    console.log('script.js loaded successfully');
  } catch (err) {
    console.error('Unexpected error in script.js:', err);
  }
});
