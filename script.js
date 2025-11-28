document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro");
    const main = document.getElementById("mainContent");

    const canvas = document.getElementById("fireCanvas");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.7;
    }

    resize();
    window.addEventListener("resize", resize);

    let particles = [];

    for (let i = 0; i < 250; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            speedY: Math.random() * 1 + 0.5,
            alpha: Math.random()
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.fillStyle = `rgba(255, ${Math.random() * 60}, 0, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.y -= p.speedY;

            if (p.y < 0) p.y = canvas.height;
        });

        requestAnimationFrame(animate);
    }

    animate();

    // SHOW MAIN PAGE AFTER INTRO
    setTimeout(() => {
        intro.style.display = "none";
        main.style.display = "block";
    }, 3500);
});
