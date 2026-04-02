// MAIN.JS - Global interactions and utilities

// ============================================================================
// TRACKING SETUP - Add your tracking IDs here
// ============================================================================

// Meta Pixel ID - Replace with your actual pixel ID
const META_PIXEL_ID = 'YOUR_META_PIXEL_ID';

// Google Analytics 4 ID - Replace with your actual GA4 ID
const GA4_ID = 'YOUR_GA4_ID';

// Initialize Meta Pixel (Facebook/Instagram Ads)
if (typeof fbq === 'function') {
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
}

// Initialize Google Analytics 4
if (typeof gtag === 'function') {
    gtag('config', GA4_ID);
}

// ============================================================================
// GLOBAL UTILITIES
// ============================================================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add active state to buttons on click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        e.target.classList.add('btn-active');
        setTimeout(() => {
            e.target.classList.remove('btn-active');
        }, 200);
    }
});

// Lazy load images when they come into viewport
function lazyLoadImages() {
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

// Initialize lazy loading if images exist
if (document.querySelector('img[data-src]')) {
    lazyLoadImages();
}

// Fade in sections on scroll
function fadeInOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// Only apply fade-in on desktop
if (window.innerWidth > 768) {
    window.addEventListener('load', fadeInOnScroll);
}

// Track scroll depth for analytics
let maxScrollDepth = 0;

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    
    if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = Math.floor(scrollPercentage / 25) * 25; // Track in 25% increments
        
        // In production, send to analytics
        console.log('Scroll depth:', maxScrollDepth + '%');
    }
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Expose globally for use in other scripts
window.RacquelUtils = {
    validateEmail: validateEmail
};

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close modals (if any are added later)
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => modal.classList.remove('active'));
    }
    
    // Tab key accessibility improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Console branding (Easter egg for developers)
console.log('%cRacquel Aesthetics', 'font-size: 24px; font-weight: bold; color: #1A1A1A;');
console.log('%cClinical skincare by aesthetic professionals', 'font-size: 12px; color: #666666;');
console.log('%c\nBuilt with precision and care.', 'font-size: 11px; color: #999999; font-style: italic;');

// Analytics helper (placeholder for production)
window.RacquelAnalytics = {
    trackEvent: function(category, action, label, value) {
        console.log('Analytics Event:', { category, action, label, value });
        
        // In production, this would call:
        // gtag('event', action, {
        //     event_category: category,
        //     event_label: label,
        //     value: value
        // });
    },
    
    trackPageView: function(path) {
        console.log('Page View:', path);
        
        // In production:
        // gtag('config', 'GA_MEASUREMENT_ID', {
        //     page_path: path
        // });
    }
};

// Track page load
window.addEventListener('load', () => {
    const path = window.location.pathname;
    window.RacquelAnalytics.trackPageView(path);
});

// Performance monitoring
window.addEventListener('load', () => {
    // Wait for everything to load
    setTimeout(() => {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log('Page Load Time:', pageLoadTime + 'ms');
            
            // In production, send to analytics if > 3000ms
            if (pageLoadTime > 3000) {
                console.warn('Page load exceeded 3s target');
            }
        }
    }, 0);
});

// Service Worker registration (for PWA capabilities in production)
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
        // Uncomment in production with actual service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        RacquelUtils: window.RacquelUtils,
        RacquelAnalytics: window.RacquelAnalytics
    };
}
