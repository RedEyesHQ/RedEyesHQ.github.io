// ── Mobile Navigation Toggle ──
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ── Smooth scroll for navigation links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ── Navbar border on scroll ──
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.borderBottomColor = window.scrollY > 50
        ? 'rgba(226, 26, 59, 0.15)'
        : 'rgba(255, 255, 255, 0.06)';
});

// ── Hero entrance animation ──
window.addEventListener('load', () => {
    document.querySelector('.hero').classList.add('loaded');
});

// ── Scroll-reveal system ──
// Tag elements with data-reveal attributes
function setupRevealElements() {
    // About section
    const aboutTitle = document.querySelector('.about .section-title');
    const aboutH3 = document.querySelector('.about-text h3');
    const aboutPs = document.querySelectorAll('.about-text > p');
    const aboutStats = document.querySelector('.about-stats');
    const aboutImage = document.querySelector('.about-image');

    if (aboutTitle) aboutTitle.setAttribute('data-reveal', 'up');
    if (aboutH3) { aboutH3.setAttribute('data-reveal', 'left'); aboutH3.setAttribute('data-delay', '1'); }
    aboutPs.forEach((p, i) => { p.setAttribute('data-reveal', 'left'); p.setAttribute('data-delay', String(i + 2)); });
    if (aboutStats) { aboutStats.setAttribute('data-reveal', 'up'); aboutStats.setAttribute('data-delay', '4'); }
    if (aboutImage) { aboutImage.setAttribute('data-reveal', 'right'); aboutImage.setAttribute('data-delay', '2'); }

    // Games section
    const gamesTitle = document.querySelector('.games .section-title');
    if (gamesTitle) gamesTitle.setAttribute('data-reveal', 'up');
    document.querySelectorAll('.game-card').forEach((card, i) => {
        card.setAttribute('data-reveal', 'up');
        card.setAttribute('data-delay', String(i + 1));
    });

    // Team section
    const teamTitle = document.querySelector('.team .section-title');
    const teamDesc = document.querySelector('.team .section-description');
    if (teamTitle) teamTitle.setAttribute('data-reveal', 'up');
    if (teamDesc) { teamDesc.setAttribute('data-reveal', 'up'); teamDesc.setAttribute('data-delay', '1'); }
    document.querySelectorAll('.team-member').forEach((member, i) => {
        member.setAttribute('data-reveal', 'scale');
        member.setAttribute('data-delay', String(i + 1));
    });

    // Contact section
    const contactTitle = document.querySelector('.contact .section-title');
    const contactDesc = document.querySelector('.contact .section-description');
    const contactInfo = document.querySelector('.contact-info');
    if (contactTitle) contactTitle.setAttribute('data-reveal', 'up');
    if (contactDesc) { contactDesc.setAttribute('data-reveal', 'up'); contactDesc.setAttribute('data-delay', '1'); }
    if (contactInfo) { contactInfo.setAttribute('data-reveal', 'up'); contactInfo.setAttribute('data-delay', '2'); }

    // Footer
    const footerContent = document.querySelector('.footer-content');
    if (footerContent) { footerContent.setAttribute('data-reveal', 'fade'); }
}

setupRevealElements();

// Intersection Observer for reveals
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // After reveal transition ends, remove reveal attrs so hover transitions work at normal speed
            entry.target.addEventListener('transitionend', function cleanup() {
                entry.target.removeEventListener('transitionend', cleanup);
                entry.target.classList.add('reveal-done');
            }, { once: true });
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ── Parallax effect for hero background ──
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
    }
});

// ── Stats counter animation ──
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const isPlus = element.textContent.includes('+');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (isPlus ? '+' : '');
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

// ── Game card click handlers ──
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('game-link')) {
            const gameLink = card.querySelector('.game-link');
            if (gameLink) gameLink.click();
        }
    });
});

// Console welcome
console.log('%c RedEyes Game Studio ', 'background: #ff0033; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;');
