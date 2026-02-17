// particles.js - Particle background animation
(function() {
    const canvas = document.getElementById('particle-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrame;
    
    const PARTICLE_COUNT = 60;
    const MAX_DIST = 150;
    const PARTICLE_SPEED = 0.15;
    
    function getParticleColor() {
        return getComputedStyle(document.body).getPropertyValue('--accent-teal').trim() || '#2dd4bf';
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * PARTICLE_SPEED,
                vy: (Math.random() - 0.5) * PARTICLE_SPEED,
                r: 1 + Math.random() * 2
            });
        }
    }
    
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }
    
    function drawParticles() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, width, height);
        
        // Update positions
        for (let p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges with damping
            if (p.x < 0 || p.x > width) p.vx *= -0.9;
            if (p.y < 0 || p.y > height) p.vy *= -0.9;
            
            p.x = Math.max(0, Math.min(width, p.x));
            p.y = Math.max(0, Math.min(height, p.y));
        }
        
        // Draw connections
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)';
        ctx.lineWidth = 0.8;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < MAX_DIST) {
                    ctx.globalAlpha = (1 - dist / MAX_DIST) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw particles
        ctx.fillStyle = getParticleColor();
        ctx.shadowBlur = 8;
        ctx.shadowColor = getParticleColor();
        ctx.globalAlpha = 0.6;
        
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        animationFrame = requestAnimationFrame(drawParticles);
    }
    
    function handleThemeChange() {
        // Update particle color when theme changes
        ctx.shadowColor = getParticleColor();
        ctx.fillStyle = getParticleColor();
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
    
    window.addEventListener('themechange', handleThemeChange);
    
    // Start animation
    resizeCanvas();
    drawParticles();
})();