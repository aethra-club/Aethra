// ============================================
// HOMEPAGE ENHANCED - ADVANCED INTERACTIONS
// ============================================

(function() {
    'use strict';

    // Page Loader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        }
    });

    // Particles.js Configuration
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#7c4dff', '#5da9e9', '#8b5cf6']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#7c4dff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Magnetic Button Effect
    const magneticButtons = document.querySelectorAll('.btn-magnetic, .btn--primary, .btn--secondary');
    
    magneticButtons.forEach(btn => {
        btn.classList.add('btn-magnetic');
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                btn.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px)`;
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
        
        // Ripple effect on click
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 3D Card Tilt Effect
    const cards3D = document.querySelectorAll('.benefit-card, .counter-card, .event-card');
    
    cards3D.forEach(card => {
        card.classList.add('card-3d');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        });
    });

    // Spotlight Effect
    const spotlightContainers = document.querySelectorAll('.event-card, .benefit-card');
    
    spotlightContainers.forEach(container => {
        container.classList.add('spotlight-container');
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            container.style.setProperty('--spotlight-x', `${x}%`);
            container.style.setProperty('--spotlight-y', `${y}%`);
        });
    });

    // Parallax Scroll Effect
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        });
    }

    // Scroll-Triggered Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .vision-item, .benefit-card, .counter-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // Enhanced Counter Animation
    const counters = document.querySelectorAll('.counter-card__number');
    let counterAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    if (counters.length > 0) {
        counterObserver.observe(counters[0].closest('.counters-grid'));
    }
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Cursor Trail Effect (Desktop Only)
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        let trails = [];
        const maxTrails = 20;
        
        document.addEventListener('mousemove', (e) => {
            if (trails.length >= maxTrails) {
                const oldTrail = trails.shift();
                oldTrail.remove();
            }
            
            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            
            document.body.appendChild(trail);
            trails.push(trail);
            
            setTimeout(() => {
                trail.remove();
                trails = trails.filter(t => t !== trail);
            }, 500);
        });
    }

    // Typing Effect for Hero Eyebrow
    const heroEyebrow = document.querySelector('.hero__eyebrow');
    if (heroEyebrow) {
        const text = heroEyebrow.textContent;
        heroEyebrow.textContent = '';
        heroEyebrow.style.width = '0';
        
        setTimeout(() => {
            heroEyebrow.style.width = 'fit-content';
            let index = 0;
            
            const typeWriter = () => {
                if (index < text.length) {
                    heroEyebrow.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        heroEyebrow.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            typeWriter();
        }, 500);
    }

    // Smooth Scroll with Easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#back-to-top') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Glassmorphism Cards
    const cards = document.querySelectorAll('.benefit-card, .connect-card, .vision-item');
    cards.forEach(card => {
        card.classList.add('glass-card');
    });

    // Animate Event Card Badge
    const eventBadge = document.querySelector('.event-card__badge');
    if (eventBadge) {
        setInterval(() => {
            eventBadge.style.animation = 'none';
            setTimeout(() => {
                eventBadge.style.animation = '';
            }, 10);
        }, 4000);
    }

    // Header Background on Scroll
    const header = document.querySelector('.aethra-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 15, 31, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = '';
                header.style.backdropFilter = '';
                header.style.boxShadow = '';
            }
        });
    }

    // Floating Badges Animation
    function createFloatingBadge(content, className) {
        const badge = document.createElement('div');
        badge.className = `floating-badge ${className}`;
        badge.innerHTML = content;
        badge.style.cssText = `
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, rgba(124, 77, 255, 0.2), rgba(93, 169, 233, 0.2));
            backdrop-filter: blur(10px);
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 0.9rem;
            font-weight: 600;
            color: #fff;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;
        return badge;
    }

    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 1024) {
        const badges = [
            { content: '🚀 323+ Participants', class: 'floating-badge-1' },
            { content: '💰 $1,860+ Prizes', class: 'floating-badge-2' },
            { content: '🏆 10 Categories', class: 'floating-badge-3' },
            { content: '🌐 Global Event', class: 'floating-badge-4' }
        ];
        
        badges.forEach(({ content, class: className }) => {
            const badge = createFloatingBadge(content, className);
            hero.appendChild(badge);
        });
    }

    // Scroll Progress Indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);

    const updateScrollProgress = () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', updateScrollProgress);

    // Enhanced Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        // Replace existing content with enhanced version
        scrollIndicator.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Hide when scrolled
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // Section Title Reveal Enhancement
    const sectionTitles = document.querySelectorAll('.section__title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.5
    });

    sectionTitles.forEach(title => titleObserver.observe(title));

    // Smooth Chip Hover Effect
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        chip.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic Quote Enhancement
    const quotes = document.querySelectorAll('.quote');
    quotes.forEach(quote => {
        quote.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        quote.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Counter Cards Perspective Effect
    const counterCards = document.querySelectorAll('.counter-card');
    counterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(10deg) scale(1.05)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) scale(1)';
        });
    });

    // Enhanced Button Effects
    const heroCtas = document.querySelectorAll('.hero__ctas .btn');
    heroCtas.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stagger Animation for Multiple Elements
    const staggerElements = (selector, delay = 100) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * delay}ms`;
        });
    };

    staggerElements('.benefit-card', 150);
    staggerElements('.connect-card', 150);

    console.log('🎨 Enhanced Homepage Loaded with Advanced Animations!');

})();
