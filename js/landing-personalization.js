// DYNAMIC LANDING PAGE PERSONALIZATION
// Reads URL parameters and updates hero content

(function() {
    'use strict';
    
    // Get URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const concern = urlParams.get('concern');
    
    // Content variations based on concern
    const heroContent = {
        redness: {
            headline: "Struggling with redness that won't go away?",
            subheadline: "Your skin barrier may be damaged. Get a routine designed specifically for your skin in 30 seconds.",
            cta: "Find Your Barrier Repair Routine"
        },
        acne: {
            headline: "Breakouts that won't clear up?",
            subheadline: "You might be using the wrong products. Get a personalized routine built for your skin type.",
            cta: "Get Your Acne Solution"
        },
        dryness: {
            headline: "Dry, irritated skin no matter what you try?",
            subheadline: "It's not about more products — it's about the right ones. Let us build your routine.",
            cta: "Find Your Hydration Routine"
        },
        pigmentation: {
            headline: "Dark spots and uneven skin tone?",
            subheadline: "Stop guessing. Get a clinical protocol designed for your exact pigmentation concerns.",
            cta: "Get Your Brightening Protocol"
        },
        default: {
            headline: "Stop guessing what your skin needs",
            subheadline: "Take our 30-second quiz and get your exact skincare routine.",
            cta: "Take the 60-Second Skin Quiz"
        }
    };
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateHeroContent);
    } else {
        updateHeroContent();
    }
    
    function updateHeroContent() {
        const content = heroContent[concern] || heroContent.default;
        
        // Update headline
        const headline = document.querySelector('.headline');
        if (headline) {
            headline.textContent = content.headline;
            headline.classList.add('fade-in-animate');
        }
        
        // Update subheadline
        const subhead = document.querySelector('.subhead');
        if (subhead) {
            subhead.textContent = content.subheadline;
            subhead.classList.add('fade-in-animate');
        }
        
        // Update CTA button text
        const ctaButton = document.querySelector('.btn-hero');
        if (ctaButton) {
            ctaButton.textContent = content.cta;
            
            // Preserve concern in quiz URL
            if (concern) {
                const quizUrl = new URL(ctaButton.href, window.location.origin);
                quizUrl.searchParams.set('concern', concern);
                ctaButton.href = quizUrl.toString();
            }
        }
        
        // Track personalization
        if (concern && typeof gtag === 'function') {
            gtag('event', 'personalized_landing', {
                concern: concern,
                page_location: window.location.href
            });
        }
        
        console.log('Landing page personalized:', concern || 'default');
    }
})();
