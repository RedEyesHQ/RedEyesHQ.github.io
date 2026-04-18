// ── Mobile Navigation Toggle ──
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ── Smooth scroll for navigation links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ── Navbar shadow / background on scroll ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ── Hero entrance animation ──
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('loaded');
});

// ── Scroll-reveal system ──
function setupRevealElements() {
    // About section
    const aboutEyebrow = document.querySelector('.about .section-eyebrow');
    const aboutTitle = document.querySelector('.about .section-title');
    const aboutH3 = document.querySelector('.about-text h3');
    const aboutPs = document.querySelectorAll('.about-text > p');
    const aboutStats = document.querySelector('.about-stats');
    const aboutImage = document.querySelector('.about-image');

    if (aboutEyebrow) aboutEyebrow.setAttribute('data-reveal', 'up');
    if (aboutTitle) { aboutTitle.setAttribute('data-reveal', 'up'); aboutTitle.setAttribute('data-delay', '1'); }
    if (aboutH3) { aboutH3.setAttribute('data-reveal', 'left'); aboutH3.setAttribute('data-delay', '1'); }
    aboutPs.forEach((p, i) => { p.setAttribute('data-reveal', 'left'); p.setAttribute('data-delay', String(i + 2)); });
    if (aboutStats) { aboutStats.setAttribute('data-reveal', 'up'); aboutStats.setAttribute('data-delay', '4'); }
    if (aboutImage) { aboutImage.setAttribute('data-reveal', 'scale'); aboutImage.setAttribute('data-delay', '2'); }

    // Games section
    const gamesEyebrow = document.querySelector('.games .section-eyebrow');
    const gamesTitle = document.querySelector('.games .section-title');
    const gamesDesc = document.querySelector('.games .section-description');
    if (gamesEyebrow) gamesEyebrow.setAttribute('data-reveal', 'up');
    if (gamesTitle) { gamesTitle.setAttribute('data-reveal', 'up'); gamesTitle.setAttribute('data-delay', '1'); }
    if (gamesDesc) { gamesDesc.setAttribute('data-reveal', 'up'); gamesDesc.setAttribute('data-delay', '2'); }
    document.querySelectorAll('.game-card').forEach((card, i) => {
        card.setAttribute('data-reveal', 'up');
        card.setAttribute('data-delay', String(i + 1));
    });

    // Team section
    const teamEyebrow = document.querySelector('.team .section-eyebrow');
    const teamTitle = document.querySelector('.team .section-title');
    const teamDesc = document.querySelector('.team .section-description');
    if (teamEyebrow) teamEyebrow.setAttribute('data-reveal', 'up');
    if (teamTitle) { teamTitle.setAttribute('data-reveal', 'up'); teamTitle.setAttribute('data-delay', '1'); }
    if (teamDesc) { teamDesc.setAttribute('data-reveal', 'up'); teamDesc.setAttribute('data-delay', '2'); }
    document.querySelectorAll('.team-member').forEach((member, i) => {
        member.setAttribute('data-reveal', 'scale');
        member.setAttribute('data-delay', String(i + 1));
    });

    // Contact section
    const contactEyebrow = document.querySelector('.contact .section-eyebrow');
    const contactTitle = document.querySelector('.contact .section-title');
    const contactDesc = document.querySelector('.contact .section-description');
    const contactInfo = document.querySelector('.contact-info');
    if (contactEyebrow) contactEyebrow.setAttribute('data-reveal', 'up');
    if (contactTitle) { contactTitle.setAttribute('data-reveal', 'up'); contactTitle.setAttribute('data-delay', '1'); }
    if (contactDesc) { contactDesc.setAttribute('data-reveal', 'up'); contactDesc.setAttribute('data-delay', '2'); }
    if (contactInfo) { contactInfo.setAttribute('data-reveal', 'up'); contactInfo.setAttribute('data-delay', '3'); }

    // Footer
    const footerContent = document.querySelector('.footer-content');
    if (footerContent) { footerContent.setAttribute('data-reveal', 'fade'); }

    // Game detail page elements (if present)
    document.querySelectorAll('.game-detail-header').forEach((el) => el.setAttribute('data-reveal', 'up'));
    document.querySelectorAll('.game-image-large').forEach((el) => el.setAttribute('data-reveal', 'left'));
    document.querySelectorAll('.game-description').forEach((el) => { el.setAttribute('data-reveal', 'right'); el.setAttribute('data-delay', '1'); });
    document.querySelectorAll('.screenshots-section h2').forEach((el) => el.setAttribute('data-reveal', 'up'));
    document.querySelectorAll('.screenshot-item').forEach((el, i) => { el.setAttribute('data-reveal', 'up'); el.setAttribute('data-delay', String(i + 1)); });
}

setupRevealElements();

// Intersection Observer for reveals
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
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
const heroBackground = document.querySelector('.hero-background');
const heroGrid = document.querySelector('.hero-grid');
if (heroBackground || heroGrid) {
    window.addEventListener('scroll', () => {
        const y = window.pageYOffset;
        if (heroBackground) heroBackground.style.transform = `translateY(${y * 0.5}px)`;
        if (heroGrid) heroGrid.style.transform = `translateY(${y * 0.25}px)`;
    });
}

// ── Stats counter animation ──
const animateCounter = (element, target, duration = 1800) => {
    const originalText = element.textContent;
    const isPlus = originalText.includes('+');
    const isYear = target >= 1900;

    // Year-like values: just fade in without counting
    if (isYear) return;

    let current = 0;
    const increment = target / (duration / 16);

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
                const target = parseInt(stat.textContent, 10);
                if (!isNaN(target)) animateCounter(stat, target);
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
console.log('%c RedEyes Game Studio ', 'background: #e21a3b; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;');
