// ==================== INITIALIZE AOS (ANIMATE ON SCROLL) ====================
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
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

// ==================== RESUME DOWNLOAD FROM ASSETS/RESUME/ ====================
const downloadBtn = document.getElementById('downloadResumeBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Path to your resume file - UPDATE THIS FILENAME IF DIFFERENT
        const resumePath = 'assets/resume/resume.pdf';
        
        // Method 1: Direct download using anchor tag (Recommended)
        const link = document.createElement('a');
        link.href = resumePath;
        link.download = 'Sarah_Chen_Resume.pdf'; // Custom download filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Optional: Show success message
        // console.log('Resume download initiated');
    });
}

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const nameInput = this.querySelector('input[placeholder="Your Name"]');
        const name = nameInput ? nameInput.value : 'User';
        
        // Show success message
        alert(`Thank you ${name}! Your message has been sent successfully. I'll get back to you within 24 hours.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ==================== PROFILE IMAGE ERROR HANDLING ====================
const profileImg = document.getElementById('profileImg');
if (profileImg) {
    profileImg.addEventListener('error', function() {
        // If image fails to load, show a placeholder
        this.style.display = 'none';
        const wrapper = this.parentElement;
        const placeholder = document.createElement('div');
        placeholder.className = 'profile-placeholder';
        placeholder.innerHTML = '<i class="fas fa-user-circle"></i>';
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #6366f1, #06b6d4);
            border-radius: 50%;
            font-size: 80px;
            color: white;
        `;
        wrapper.appendChild(placeholder);
    });
}

// ==================== SKILL PROGRESS ANIMATION ON VIEW ====================
const skillItems = document.querySelectorAll('.skill-item');
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

skillItems.forEach(card => {
    observer.observe(card);
});

// ==================== MOBILE MENU CLOSE AFTER CLICK ====================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// ==================== BACK TO TOP BUTTON ====================
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

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Log to console that portfolio is ready
console.log('Portfolio website loaded successfully! 🚀');
console.log('Resume download will fetch from: assets/resume/resume.pdf');