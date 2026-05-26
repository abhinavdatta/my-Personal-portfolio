// ==========================================
// 1. TERMINAL BOOT SEQUENCE (PRELOADER)
// ==========================================
const bootMessages = [
    "> Initializing kernel...",
    "> Loading embedded modules...",
    "> Establishing secure connection...",
    "> System ready. Welcome, User."
];
const bootText = document.getElementById('boot-text');
const preloader = document.getElementById('preloader');
let msgIdx = 0;

function bootUp() {
    if (msgIdx < bootMessages.length) {
        bootText.innerHTML += bootMessages[msgIdx] + "<br>";
        msgIdx++;
        setTimeout(bootUp, 400);
    } else {
        setTimeout(() => preloader.classList.add('hidden'), 600);
    }
}
window.addEventListener('load', bootUp);

// ==========================================
// 2. TYPING ANIMATION
// ==========================================
const typed = document.getElementById('typed');
const phrases = [
    'ECE Student',
    'Web Developer',
    'Tech Enthusiast',
    'Problem Solver',
    'Embedded Systems Learner'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
    const current = phrases[phraseIdx];
    typed.textContent = current.substring(0, deleting ? --charIdx : ++charIdx);
    let delay = deleting ? 40 : 80;
    
    if (!deleting && charIdx === current.length) {
        delay = 2000;
        deleting = true;
    } else if (deleting && charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 400;
    }
    setTimeout(type, delay);
}
type();

// ==========================================
// 3. MOBILE MENU
// ==========================================
const mobileMenu = document.getElementById('mobile-menu');
document.getElementById('menu-toggle').addEventListener('click', () => {
    mobileMenu.classList.add('open');
});
document.getElementById('menu-close').addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ==========================================
// 4. SMOOTH SCROLL OFFSET
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ==========================================
// 5. RESUME MODAL VIEWER
// ==========================================
const resumeModal = document.getElementById('resume-modal');
const resumeIframe = document.getElementById('resume-iframe');
const resumeBtn = document.getElementById('resume-btn');
const modalClose = document.getElementById('modal-close');

resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resumeIframe.src = 'resume.pdf'; // Ensure resume.pdf exists in root
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
});

modalClose.addEventListener('click', () => {
    resumeModal.classList.remove('active');
    resumeIframe.src = ''; 
    document.body.style.overflow = ''; 
});

resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        resumeIframe.src = '';
        document.body.style.overflow = '';
    }
});

// ==========================================
// 6. SCROLL REVEAL ANIMATION
// ==========================================
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealOnScroll.observe(el));

// ==========================================
// 7. SCROLL EVENTS (Progress, Active Nav, Back-to-Top)
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.getElementById('back-to-top');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    // A. Active Nav Link Highlighting
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // B. Back to Top Button Visibility
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // C. Scroll Progress Bar
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// 8. 3D HOLOGRAM TILT EFFECT (PROJECT CARDS)
// ==========================================
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (max 5 degrees)
        const rotateX = ((y - centerY) / centerY) * -5; 
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});