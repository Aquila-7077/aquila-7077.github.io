// ========================================
// MENU TOGGLE (Mobile)
// ========================================

const headerToggle = document.getElementById('headerToggle');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on button click
headerToggle.addEventListener('click', () => {
    header.classList.toggle('active');
    
    // Change icon
    const icon = headerToggle.querySelector('i');
    if (header.classList.contains('active')) {
        icon.classList.remove('bi-list');
        icon.classList.add('bi-x');
    } else {
        icon.classList.remove('bi-x');
        icon.classList.add('bi-list');
    }
});

// Close menu when clicking on a nav link (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        header.classList.remove('active');
        const icon = headerToggle.querySelector('i');
        icon.classList.remove('bi-x');
        icon.classList.add('bi-list');
    });
});

// ========================================
// ACTIVE NAVIGATION ON SCROLL
// ========================================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// SKILLS ANIMATION (Progress Bars)
// ========================================

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                
                // Animate the progress bar
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 100);
            });
            
            // Unobserve after animation
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observe the skills section
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        try {
            // Send form data to PHP (if you have contact.php)
            const response = await fetch('contact.php', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                // Success
                formStatus.textContent = 'Message envoyé avec succès ! Je vous répondrai bientôt.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            // Error
            formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer ou m\'envoyer un email directement.';
            formStatus.className = 'form-status error';
        } finally {
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Hide status after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
            }, 5000);
        }
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
const fadeElements = document.querySelectorAll('.project-card, .resume-item, .info-item');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional)
// ========================================

const subtitle = document.querySelector('.hero-content .subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let index = 0;
    const typingSpeed = 50;
    
    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing after a small delay
    setTimeout(typeWriter, 500);
}

// ========================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ========================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 99;
    box-shadow: 0 5px 20px rgba(123, 97, 255, 0.4);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide button on scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// PARALLAX EFFECT ON HERO SECTION
// ========================================

const hero = document.getElementById('hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ========================================
// PROJECT CARDS STAGGER ANIMATION
// ========================================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c👋 Bienvenue sur mon portfolio !', 'color: #7B61FF; font-size: 20px; font-weight: bold;');
console.log('%cDéveloppé par Tristan Coquet', 'color: #8B92B0; font-size: 14px;');
console.log('%c🚀 Aquila Portfolio v1.0', 'color: #7B61FF; font-size: 12px;');

// ========================================
// PERFORMANCE: Lazy Loading Images
// ========================================

const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ========================================
// PREVENT FORM RESUBMISSION ON REFRESH
// ========================================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}