// ==================== INITIALIZE AOS (ANIMATE ON SCROLL) ====================
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out',
    disable: 'mobile' // Disable on mobile for better performance
});

// ==================== SPLIDE JS CAROUSEL INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const splide = new Splide('#testimonialSplide', {
        type: 'loop',
        perPage: 2,
        perMove: 1,
        gap: '24px',
        autoplay: true,
        pauseOnHover: true,
        pauseOnFocus: true,
        interval: 4000,
        arrows: true,
        pagination: true,
        speed: 800,
        breakpoints: {
            768: {
                perPage: 1,
                gap: '16px'
            }
        }
    });
    
    splide.mount();
});

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== ACTIVE NAVIGATION LINK ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70;
            const elementPosition = target.offsetTop;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== RESUME DOWNLOAD FUNCTIONALITY ====================
const downloadBtn = document.getElementById('downloadResumeBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create resume content as PDF-like text
        const resumeContent = `ALEX MORGAN - CREATIVE DEVELOPER
================================

CONTACT INFORMATION
------------------
Email: alex@creativedev.com
Phone: +1 (555) 123-4567
Location: San Francisco, CA
GitHub: github.com/alexmorgan
LinkedIn: linkedin.com/in/alexmorgan

PROFESSIONAL SUMMARY
-------------------
Creative Full-Stack Developer with 5+ years of experience building high-performance web applications. Expert in modern JavaScript frameworks, responsive design, and creating exceptional user experiences. Passionate about clean code and innovative solutions.

TECHNICAL SKILLS
---------------
• Frontend: React, Vue.js, Angular, TypeScript, Next.js, HTML5, CSS3
• Backend: Node.js, Python, PHP, Express.js, MongoDB, PostgreSQL
• Tools: Git, Docker, AWS, Firebase, Figma, Adobe XD
• Testing: Jest, Mocha, Cypress
• Other: RESTful APIs, GraphQL, Webpack, Vite

WORK EXPERIENCE
---------------
Senior Frontend Developer | TechCorp (2022 - Present)
• Led development of AI-powered analytics dashboard serving 50k+ users
• Improved application performance by 40% through code optimization
• Mentored 3 junior developers and conducted code reviews

Full-Stack Developer | StudioNinja (2019 - 2022)
• Built 20+ responsive websites for clients across various industries
• Implemented CI/CD pipelines reducing deployment time by 60%
• Collaborated with design team to create pixel-perfect implementations

EDUCATION
---------
Bachelor of Science in Computer Science
University of California, Berkeley | 2015 - 2019
• GPA: 3.8/4.0
• Relevant Coursework: Web Development, Data Structures, UI/UX Design

CERTIFICATIONS
-------------
• Meta Frontend Developer Professional Certificate
• Advanced React and Redux (Udemy)
• AWS Cloud Practitioner

PROJECT HIGHLIGHTS
-----------------
• AI Analytics Dashboard: Real-time data visualization with machine learning
• E-Commerce Platform: Full-featured online store with payment integration
• Mobile Banking App: Cross-platform solution with secure authentication

LANGUAGES
---------
• English (Native)
• Spanish (Professional Working Proficiency)

REFERENCES
----------
Available upon request.

Portfolio: creativedev.com
GitHub: github.com/alexmorgan
`;
        
        // Create blob and trigger download
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Alex_Morgan_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || 'User';
        
        // Show success message
        alert(`Thank you ${name}! Your message has been sent successfully. I'll get back to you within 24 hours.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ==================== TYPING ANIMATION FOR HERO (Optional) ====================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Add subtle animation class
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroTitle.style.transition = 'all 0.8s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 100);
}

// ==================== PARALLAX EFFECT ON SCROLL ====================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - scrolled * 0.002;
    }
});

// ==================== SKILL PROGRESS ANIMATION ON VIEW ====================
const skillCards = document.querySelectorAll('.skill-card');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    observer.observe(card);
});

// ==================== MOBILE MENU CLOSE AFTER CLICK ====================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add loading spinner removal if needed
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// ==================== BACK TO TOP BUTTON (Optional) ====================
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.id = 'backToTop';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #06b6d4);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize back to top button after DOM loads
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Log to console that portfolio is ready
console.log('Portfolio website loaded successfully! 🚀');