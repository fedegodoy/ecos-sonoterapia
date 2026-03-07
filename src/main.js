import './style.css';

// ============================================
// Scroll Reveal Animation
// ============================================

const revealElements = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
};

// ============================================
// Navbar Scroll Effect
// ============================================

const initNavbar = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
};

// ============================================
// Mobile Menu Toggle
// ============================================

const initMobileMenu = () => {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-close');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        menu.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Close on link click
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    // Close on background click (any non-interactive element)
    menu.addEventListener('click', (e) => {
        if (!e.target.closest('a') && !e.target.closest('button')) {
            closeMenu();
        }
    });
};

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80; // navbar height
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });
};

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    revealElements();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
});
