// ========================================
// MENU TOGGLE (Mobile)
// ========================================

const headerToggle = document.getElementById('headerToggle');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');

if (headerToggle && header) {
    headerToggle.addEventListener('click', () => {
        header.classList.toggle('active');
        
        const icon = headerToggle.querySelector('i');
        if (header.classList.contains('active')) {
            icon.classList.remove('bi-list');
            icon.classList.add('bi-x');
        } else {
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
        }
    });
}

// Close menu when clicking on a nav link (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (header) {
            header.classList.remove('active');
        }
        if (headerToggle) {
            const icon = headerToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            }
        }
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
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.btn');
        
        if (submitBtn) {
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch('assets/form/contact.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    if (formStatus) {
                        formStatus.textContent = data.message;
                        formStatus.className = 'form-status success';
                    }
                    contactForm.reset();
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.textContent = error.message || 'Erreur lors de l\'envoi. Veuillez réessayer.';
                    formStatus.className = 'form-status error';
                }
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.style.display = 'none';
                        formStatus.className = 'form-status';
                    }
                }, 5000);
            }
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

const fadeElements = document.querySelectorAll('.project-card, .resume-item, .info-item');
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE
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
    
    setTimeout(typeWriter, 500);
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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