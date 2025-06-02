document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    // Toggle mobile menu visibility
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Decrypt heading animation effect
    function decryptHeading() {
        const heading = document.querySelector('.hero h1');
        if (!heading) return;

        const originalHTML = heading.innerHTML;
        const highlightSpan = heading.querySelector('.highlight');
        const highlightText = highlightSpan?.textContent || '';

        // Split heading into before, highlight, and after parts
        const parts = originalHTML.split(/<span class="highlight">|<\/span>/);
        const before = parts[0] || '';
        const after = parts[2] || '';

        // Character sets for scrambling
        const crypticChars = "!@#$%^&*()_+-=[]{}|;:,./<>?`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const numeric = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,./<>?`~";

        const fullText = before + highlightText + after;
        const totalChars = [...fullText].filter(c => !/\s|&|;/.test(c)).length;

        let currentIndex = 0;

        // Check if character should be decrypted
        const isDecryptable = char => !/\s|&|;/.test(char);

        // Get a random character for scrambling animation
        const getRandomChar = (finalChar, progress) => {
            const chance = progress > 0.6 && Math.random() < 0.3;
            if (!chance) return crypticChars[Math.floor(Math.random() * crypticChars.length)];
            if (/[A-Za-z]/.test(finalChar)) return alpha[Math.floor(Math.random() * alpha.length)];
            if (/\d/.test(finalChar)) return numeric[Math.floor(Math.random() * numeric.length)];
            return symbols[Math.floor(Math.random() * symbols.length)];
        };

        // Scramble the heading text
        const scrambleText = () => {
            if (currentIndex >= totalChars) return;

            let result = '';
            let pos = 0;

            // Build each segment (before, highlight, after)
            const buildSegment = (text, isHighlight = false) => {
                if (isHighlight) result += '<span class="highlight">';
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    if (!isDecryptable(char)) {
                        result += char;
                    } else if (pos < currentIndex) {
                        result += char;
                    } else {
                        const progress = currentIndex / totalChars;
                        result += getRandomChar(char, progress);
                    }
                    if (isDecryptable(char)) pos++;
                }
                if (isHighlight) result += '</span>';
            };

            buildSegment(before);
            buildSegment(highlightText, true);
            buildSegment(after);

            heading.innerHTML = result;
            setTimeout(scrambleText, 80);
        };

        // Reveal the correct characters one by one
        const decryptStep = () => {
            if (currentIndex >= totalChars) {
                heading.innerHTML = originalHTML;
                heading.classList.add('decryption-complete');
                return;
            }
            currentIndex++;
            setTimeout(decryptStep, 50 + Math.random() * 20 - 10);
        };

        heading.innerHTML = scrambleText(); // Initial scramble
        setTimeout(scrambleText, 800);      // Animate remaining scrambled text
        setTimeout(decryptStep, 1000);      // Begin sequential decryption
    }

    // Initialize decryption effect
    decryptHeading();

    // Feature card hover effect (icon animation)
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.icon i');
            icon.classList.add('fa-beat');

            setTimeout(() => {
                icon.classList.remove('fa-beat');
            }, 1000);
        });
    });

    // Animate stats counter when in viewport
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const current = parseInt(stat.textContent);

            if (current < target) {
                const increment = Math.ceil(target / 50);
                const newValue = Math.min(current + increment, target);
                stat.textContent = newValue;

                if (newValue < target) {
                    setTimeout(() => animateStats(), 30);
                }
            }
        });
    }

    // Terminal typing effect for terminal window
    function initTerminal() {
        const terminal = document.querySelector('.terminal-body');
        if (!terminal) return;

        const lines = terminal.querySelectorAll('.line');

        // Hide all lines initially except the first one
        lines.forEach((line, index) => {
            if (index > 0) {
                line.style.opacity = '0';
                line.style.height = '0';
                line.style.margin = '0';
                line.style.overflow = 'hidden';
            }
        });

        let currentLine = 0;

        // Reveal each line one by one
        function typeLine() {
            if (currentLine >= lines.length) return;

            const line = lines[currentLine];
            line.style.opacity = '1';
            line.style.height = 'auto';
            line.style.marginBottom = '5px';
            line.style.overflow = 'visible';

            currentLine++;

            if (currentLine < lines.length) {
                setTimeout(typeLine, 1000);
            }
        }

        // Start typing after a delay
        setTimeout(typeLine, 1000);
    }

    // Intersection Observer for triggering animations on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-grid')) {
                    animateStats();
                } else if (entry.target.classList.contains('terminal-window')) {
                    initTerminal();
                } else {
                    entry.target.classList.add('animated');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.features-grid, .programs-grid, .stats-grid, .events-grid, .terminal-window');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add particle background to hero section if browser supports it
    function initParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'particles-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';

        hero.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];

        // Resize canvas to fit hero section
        function resizeCanvas() {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Particle class definition
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = 'rgba(255, 255, 255, 0.3)';
            }

            // Update particle position
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;

                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }

            // Draw particle
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        function initParticles() {
            particles = [];
            const particlesCount = canvas.width * canvas.height / 10000;
            for (let i = 0; i < particlesCount; i++) {
                particles.push(new Particle());
            }
        }

        // Draw lines between close particles
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animate particles and connections
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            connectParticles();
            requestAnimationFrame(animate);
        }

        initParticles();
        animate();
    }

    // Only init particles if device is not mobile (for performance)
    if (window.innerWidth > 768) {
        initParticles();
    }

    // Tech stack grid scrolling logic
    const grid = document.getElementById('techStackGrid');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    // Clone elements for looping effect
    const items = Array.from(grid.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        grid.appendChild(clone);
    });

    // Manual scroll left
    scrollLeftBtn.addEventListener('click', () => {
        grid.scrollBy({ left: -200, behavior: 'smooth' });
    });

    // Manual scroll right
    scrollRightBtn.addEventListener('click', () => {
        grid.scrollBy({ left: 200, behavior: 'smooth' });
    });

    // Infinite auto-scroll for tech stack grid
    let autoScroll = setInterval(() => {
        grid.scrollLeft += 1;
        // Reset when we reach the end of the original items
        if (grid.scrollLeft >= grid.scrollWidth / 2) {
            grid.scrollLeft = 0;
        }
    }, 20);

    // Pause auto-scroll on hover
    grid.addEventListener('mouseenter', () => clearInterval(autoScroll));
    grid.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            grid.scrollLeft += 1;
            if (grid.scrollLeft >= grid.scrollWidth / 2) {
                grid.scrollLeft = 0;
            }
        }, 20);
    });
});
