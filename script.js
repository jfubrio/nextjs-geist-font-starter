// JavaScript for Radiesse Landing Page

// Global variables
let activeFaq = null;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeLazyLoading();
    initializeScrollEffects();
    initializeFormValidation();
    initializeWhatsAppTracking();
});

// Initialize animations
function initializeAnimations() {
    // Add fade-in animation to sections when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add hover effects to benefit cards
    const benefitCards = document.querySelectorAll('.bg-white.p-6');
    benefitCards.forEach(card => {
        card.classList.add('benefit-card');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
}

// FAQ Toggle Function
function toggleFaq(index) {
    const faqButtons = document.querySelectorAll('.faq-button');
    const faqAnswers = document.querySelectorAll('.faq-answer');
    
    // Close all other FAQs
    faqAnswers.forEach((answer, i) => {
        if (i !== index) {
            answer.classList.add('hidden');
            faqButtons[i].classList.remove('bg-teal-600');
            faqButtons[i].classList.add('bg-teal-500');
        }
    });
    
    // Toggle current FAQ
    const currentAnswer = faqAnswers[index];
    const currentButton = faqButtons[index];
    
    if (currentAnswer.classList.contains('hidden')) {
        currentAnswer.classList.remove('hidden');
        currentButton.classList.remove('bg-teal-500');
        currentButton.classList.add('bg-teal-600');
        activeFaq = index;
        
        // Smooth scroll to FAQ if needed
        setTimeout(() => {
            currentAnswer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    } else {
        currentAnswer.classList.add('hidden');
        currentButton.classList.remove('bg-teal-600');
        currentButton.classList.add('bg-teal-500');
        activeFaq = null;
    }
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading class
                img.classList.add('image-loading');
                
                // Create a new image to preload
                const newImg = new Image();
                newImg.onload = function() {
                    img.src = this.src;
                    img.classList.remove('image-loading');
                    img.classList.add('image-hover');
                };
                newImg.onerror = function() {
                    img.classList.remove('image-loading');
                    // Trigger the onerror handler if it exists
                    if (img.onerror) {
                        img.onerror();
                    }
                };
                newImg.src = img.src;
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize scroll effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        const hero = document.querySelector('header');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Show/hide WhatsApp button based on scroll
        const whatsappButton = document.querySelector('.fixed.bottom-6.right-6');
        if (whatsappButton) {
            if (scrolled > 300) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'scale(1)';
                whatsappButton.classList.add('whatsapp-float');
            } else {
                whatsappButton.style.opacity = '0.7';
                whatsappButton.style.transform = 'scale(0.8)';
                whatsappButton.classList.remove('whatsapp-float');
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Initialize form validation (if any forms are added later)
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    
                    // Remove error class after user starts typing
                    input.addEventListener('input', function() {
                        this.classList.remove('border-red-500');
                    });
                }
            });
            
            if (isValid) {
                // Redirect to WhatsApp or handle form submission
                const whatsappUrl = "https://api.whatsapp.com/send?phone=528447804399&text=Hola,%20vengo%20de%20la%20página%20de%20Radiesse%20y%20quisiera%20más%20información%20sobre%20el%20tratamiento.";
                window.open(whatsappUrl, '_blank');
            }
        });
    });
}

// Initialize WhatsApp tracking
function initializeWhatsAppTracking() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track WhatsApp clicks (you can integrate with Google Analytics here)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': 'Contact Button',
                    'value': 1
                });
            }
            
            // Add a small delay to ensure tracking
            setTimeout(() => {
                console.log('WhatsApp contact initiated');
            }, 100);
        });
    });
}

// Smooth scroll for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Utility function to add loading state to buttons
function addLoadingState(button, text = 'Cargando...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    button.classList.add('opacity-50', 'cursor-not-allowed');
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('opacity-50', 'cursor-not-allowed');
    };
}

// Image error handling
function handleImageError(img, fallbackSrc) {
    img.onerror = function() {
        this.src = fallbackSrc;
        this.onerror = null; // Prevent infinite loop
    };
}

// Initialize all image error handlers
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.getAttribute('onerror')) {
            // Already has error handler
            return;
        }
        
        // Add default error handler
        img.onerror = function() {
            this.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/727581f4-1b79-4b93-b477-85e1fa4d0add.png';
            this.alt = 'Imagen no disponible';
        };
    });
});

// Performance optimization: Debounce scroll events
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

// Optimize scroll performance
const optimizedScrollHandler = debounce(function() {
    // Handle scroll events here
    const scrolled = window.pageYOffset;
    
    // Update navigation if exists
    const nav = document.querySelector('nav');
    if (nav) {
        if (scrolled > 100) {
            nav.classList.add('bg-white', 'shadow-lg');
        } else {
            nav.classList.remove('bg-white', 'shadow-lg');
        }
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add keyboard navigation for FAQ
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && activeFaq !== null) {
        toggleFaq(activeFaq);
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger some action
            console.log('Swipe up detected');
        } else {
            // Swipe down - could trigger some action
            console.log('Swipe down detected');
        }
    }
}

// Add print functionality
function printPage() {
    window.print();
}

// Add share functionality
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Radiesse - Clínica Renové',
            text: 'Relleno dérmico y bioestimulador de colágeno para una piel más firme y joven',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('URL copiada al portapapeles');
        });
    }
}

// Initialize accessibility features
function initializeAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-teal-500 text-white p-2 z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.id = 'main-content';
    }
    
    // Improve focus management
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #14b8a6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility on page load
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Export functions for global use
window.toggleFaq = toggleFaq;
window.smoothScroll = smoothScroll;
window.printPage = printPage;
window.shareContent = shareContent;
