// ============================================
// GLOBAL VARIABLES
// ============================================

let currentChallengeType = '';

// ============================================
// DOM CONTENT LOADED
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeCounters();
    initializeParticles();
    initializeBackToTop();
    initializeSmoothScroll();
    initializeEcoIcons(); // Add eco icons to sections
});

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');

        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', function () {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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

// ============================================
// SMOOTH SCROLL
// ============================================

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('id-ID');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('id-ID');
            }
        };

        updateCounter();
    };

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                counters.forEach(counter => {
                    if (counter.getAttribute('data-target')) {
                        animateCounter(counter);
                    }
                });
                hasAnimated = true;
            }
        });
    }, observerOptions);

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }

    // Also observe join stats
    const joinStats = document.querySelector('.join-stats');
    if (joinStats) {
        let joinHasAnimated = false;
        const joinObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !joinHasAnimated) {
                    const joinCounters = joinStats.querySelectorAll('.stat-number');
                    joinCounters.forEach(counter => {
                        if (counter.getAttribute('data-target')) {
                            animateCounter(counter);
                        }
                    });
                    joinHasAnimated = true;
                }
            });
        }, observerOptions);

        joinObserver.observe(joinStats);
    }
}

// ============================================
// FLOATING PARTICLES
// ============================================

function initializeParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';

        particlesContainer.appendChild(particle);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.3;
            }
            25% {
                transform: translate(20px, -30px) rotate(90deg);
                opacity: 0.6;
            }
            50% {
                transform: translate(-20px, -60px) rotate(180deg);
                opacity: 0.3;
            }
            75% {
                transform: translate(30px, -30px) rotate(270deg);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// FLOATING SHAPES (JOIN SECTION)
// ============================================

function createFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    if (!shapesContainer) return;

    const shapes = ['circle', 'square', 'triangle'];
    const shapeCount = 15;

    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];

        shape.style.position = 'absolute';
        shape.style.width = Math.random() * 50 + 20 + 'px';
        shape.style.height = shape.style.width;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.opacity = '0.1';
        shape.style.animation = `floatShape ${Math.random() * 15 + 10}s infinite ease-in-out`;
        shape.style.animationDelay = Math.random() * 5 + 's';

        if (shapeType === 'circle') {
            shape.style.borderRadius = '50%';
            shape.style.background = 'white';
        } else if (shapeType === 'square') {
            shape.style.background = 'white';
            shape.style.borderRadius = '10px';
        } else {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = '25px solid transparent';
            shape.style.borderRight = '25px solid transparent';
            shape.style.borderBottom = '50px solid white';
        }

        shapesContainer.appendChild(shape);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatShape {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            33% {
                transform: translate(30px, -40px) rotate(120deg);
            }
            66% {
                transform: translate(-30px, -80px) rotate(240deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize floating shapes
document.addEventListener('DOMContentLoaded', createFloatingShapes);

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// ANIMATIONS
// ============================================

function initializeAnimations() {
    // Add entrance animations to cards
    const cards = document.querySelectorAll('.about-card, .knowledge-card, .tip-card, .innovation-card, .gallery-item, .testimonial-card');

    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ============================================
// CHALLENGE MODAL
// ============================================

function openChallengeModal(type) {
    currentChallengeType = type;
    const modal = document.getElementById('challengeModal');
    const modalMessage = document.getElementById('modalMessage');

    if (type === '7days') {
        modalMessage.textContent = 'Siap untuk tantangan 7 hari tanpa plastik sekali pakai? Isi form di bawah untuk bergabung!';
    } else if (type === '30days') {
        modalMessage.textContent = 'Tantangan 30 hari adalah komitmen besar! Isi form di bawah untuk memulai perjalananmu!';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeChallengeModal() {
    const modal = document.getElementById('challengeModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function submitChallengeForm() {
    const form = document.getElementById('challengeForm');
    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#10b981';
        }
    });

    if (isValid) {
        // Show success message
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="modal-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Selamat!</h3>
            <p>Kamu berhasil mendaftar untuk tantangan ${currentChallengeType === '7days' ? '7 Hari' : '30 Hari'}!</p>
            <p>Kami akan mengirimkan email konfirmasi dan panduan lengkap ke email kamu.</p>
            <button class="btn btn-primary" onclick="closeChallengeModal()">
                <span>Mulai Sekarang</span>
                <i class="fas fa-rocket"></i>
            </button>
        `;

        // Reset form after 3 seconds
        setTimeout(() => {
            closeChallengeModal();
            form.reset();
        }, 3000);
    } else {
        alert('Mohon lengkapi semua field!');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function (e) {
    const modal = document.getElementById('challengeModal');
    if (e.target === modal) {
        closeChallengeModal();
    }
});

// ============================================
// CHALLENGE SUBMISSION
// ============================================

function submitChallenge() {
    const name = document.getElementById('participantName').value;
    const challengeType = document.getElementById('challengeType').value;
    const story = document.getElementById('actionStory').value;
    const file = document.getElementById('proofFile').files[0];

    if (!name || !challengeType || !story) {
        alert('Mohon lengkapi semua field yang wajib diisi!');
        return;
    }

    // Simulate submission
    const btn = event.target;
    const originalContent = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<span>Mengirim...</span> <i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
        btn.innerHTML = '<span>Berhasil Dikirim!</span> <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        // Show success message
        alert('Terima kasih! Aksimu telah berhasil dikirim dan akan segera ditampilkan di galeri kami.');

        // Reset form
        document.getElementById('participantName').value = '';
        document.getElementById('challengeType').value = '';
        document.getElementById('actionStory').value = '';
        document.getElementById('proofFile').value = '';

        // Reset button
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalContent;
            btn.style.background = '';
        }, 2000);
    }, 2000);
}

// ============================================
// SOCIAL SHARING
// ============================================

function shareWebsite() {
    const url = window.location.href;
    const title = 'Langkah Kecil untuk Bumi Lebih Sehat';
    const text = 'Mari bergabung dalam gerakan mengurangi sampah plastik! Bersama kita bisa membuat perubahan.';

    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).then(() => {
            console.log('Berhasil dibagikan!');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare(url, title, text);
        });
    } else {
        fallbackShare(url, title, text);
    }
}

function fallbackShare(url, title, text) {
    // Copy to clipboard
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Link telah disalin ke clipboard! Bagikan ke teman-temanmu.');
}

function shareToSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Langkah Kecil untuk Bumi Lebih Sehat');
    const text = encodeURIComponent('Mari bergabung dalam gerakan mengurangi sampah plastik!');

    let shareUrl = '';

    switch (platform) {
        case 'instagram':
            alert('Untuk berbagi di Instagram, screenshot halaman ini dan posting di story atau feed kamu dengan tag #LangkahKecilBumiSehat');
            return;
        case 'tiktok':
            alert('Untuk berbagi di TikTok, buat video tentang aksi lingkunganmu dan gunakan hashtag #LangkahKecilBumiSehat');
            return;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(\+62|62|0)[0-9]{9,12}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// ACCESSIBILITY
// ============================================

// Keyboard navigation for modal
document.addEventListener('keydown', function (e) {
    const modal = document.getElementById('challengeModal');
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeChallengeModal();
    }
});

// Focus trap in modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🌱 EcoAction - Langkah Kecil untuk Bumi Lebih Sehat 🌱', 'color: #10b981; font-size: 20px; font-weight: bold;');
console.log('%cTerima kasih telah mengunjungi website kami!', 'color: #059669; font-size: 14px;');
console.log('%cMari bersama-sama mengurangi sampah plastik dan selamatkan bumi kita.', 'color: #047857; font-size: 12px;');

// ============================================
// ANALYTICS (Placeholder)
// ============================================

function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', category, action, label);

    // In production, you would integrate with Google Analytics or similar:
    // gtag('event', action, {
    //     'event_category': category,
    //     'event_label': label
    // });
}

// Track button clicks
document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-primary')) {
        trackEvent('Button', 'Click', 'Primary CTA');
    }
    if (e.target.closest('.social-btn')) {
        trackEvent('Social', 'Share', e.target.closest('.social-btn').getAttribute('aria-label'));
    }
});

// ============================================
// SERVICE WORKER (PWA Support - Optional)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('ServiceWorker registration successful');
        // }, function(err) {
        //     console.log('ServiceWorker registration failed: ', err);
        // });
    });
}

// ============================================
// DECORATIVE ECO ICONS
// ============================================

function initializeEcoIcons() {
    // Define eco-friendly icons with more variety
    const ecoIcons = [
        'fa-leaf',
        'fa-seedling',
        'fa-tree',
        'fa-recycle',
        'fa-water',
        'fa-sun',
        'fa-wind',
        'fa-globe-asia',
        'fa-heart',
        'fa-hands-helping',
        'fa-cloud',
        'fa-mountain',
        'fa-spa',
        'fa-apple-alt',
        'fa-fish',
        'fa-dove',
        'fa-frog',
        'fa-feather-alt'
    ];

    // Sections to add icons to
    const sections = document.querySelectorAll('section:not(#home)');

    sections.forEach((section, sectionIndex) => {
        // Create container for eco icons
        const iconContainer = document.createElement('div');
        iconContainer.className = 'section-eco-icons';

        // Add 10 icons per section with varied icons
        for (let i = 1; i <= 10; i++) {
            const icon = document.createElement('i');
            const randomIcon = ecoIcons[Math.floor(Math.random() * ecoIcons.length)];
            icon.className = `fas ${randomIcon} eco-icon icon-${i}`;
            iconContainer.appendChild(icon);
        }

        // Insert at the beginning of section
        section.insertBefore(iconContainer, section.firstChild);
    });

    console.log('✨ 10 Eco icons initialized in all sections with better visibility');
}

// ============================================
// EXPORT FUNCTIONS (for testing)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openChallengeModal,
        closeChallengeModal,
        submitChallenge,
        shareWebsite,
        shareToSocial
    };
}
