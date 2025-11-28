// =========================
// HAMBURGER MENU
// =========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// =========================
// SCROLL FADE-IN
// =========================

const sections = document.querySelectorAll('header, section');

window.addEventListener('scroll', () => {
    const trigger = window.innerHeight / 5 * 4;

    sections.forEach(sec => {
        const boxTop = sec.getBoundingClientRect().top;

        if (boxTop < trigger) {
            sec.classList.add('visible');
        }
    });
});

// =========================
// FIRE EFFECT (INTRO)
// =========================

const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 300; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedY: Math.random() * 1 + 0.5,
        alpha: Math.random()
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        ctx.fillStyle = `rgba(255, ${Math.random() * 50}, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y -= p.speedY;
        if (p.y < 0) p.y = canvas.height;
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// =========================
// SHOW MAIN CONTENT AFTER INTRO
// =========================

function showMain() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    document.querySelector('#headerSection').classList.add('visible');
}

// Show main content after 4 seconds
setTimeout(showMain, 4000);

// =========================
// CANVAS RESIZE
// =========================

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
