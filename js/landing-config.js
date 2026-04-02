/**
 * LANDING PAGE CONFIGURATION
 * Centralized config for all no-quiz landing pages
 * Ensures consistency with quiz results system
 */

const LANDING_CONFIG = {
    'anti-aging': {
        concern: 'aging',
        bundleKey: 'antiaging',
        headline: 'Reduce Fine Lines and Boost Collagen — Without Guesswork',
        subheadline: 'A medical-grade skincare routine designed to target fine lines, wrinkles, and loss of firmness.',
        ctaPrimary: 'Shop Anti-Aging Routine',
        ctaSecondary: 'Take the Quiz',
        benefits: [
            'Clinically proven retinol + vitamin C',
            'Designed by Board Certified NP',
            'Reduces wrinkles by up to 52%'
        ],
        testimonial: {
            text: 'This routine has completely transformed my skin. Fine lines are visibly reduced and my skin feels firmer.',
            author: 'Jennifer L., 48',
            rating: 5
        },
        seo: {
            title: 'Anti-Aging Skincare Routine | Medical-Grade Products',
            description: 'Reduce fine lines and boost collagen with our clinical anti-aging routine. Medical-grade ingredients designed by skincare professionals.'
        }
    },
    'acne': {
        concern: 'acne',
        bundleKey: 'acne',
        headline: 'Clear Breakouts and Prevent Acne — Without Trial and Error',
        subheadline: 'A medical-grade skincare routine designed to clear breakouts, unclog pores, and prevent future acne.',
        ctaPrimary: 'Shop Acne Routine',
        ctaSecondary: 'Take the Quiz',
        benefits: [
            'BPO + Mandelic Acid treatment',
            'Designed by Board Certified NP',
            '85% see clearer skin in 4 weeks'
        ],
        testimonial: {
            text: 'Finally found a routine that actually works for my acne. My skin is clearer than it has been in years.',
            author: 'Maria K., 26',
            rating: 5
        },
        seo: {
            title: 'Acne Treatment Routine | Medical-Grade Skincare',
            description: 'Clear breakouts and prevent acne with our clinical skincare routine. Professional-strength formulas that deliver real results.'
        }
    },
    'pregnancy-safe-skincare': {
        concern: 'pregnancy',
        bundleKey: 'pregnancy',
        headline: 'Safe, Effective Skincare for Pregnancy and Nursing',
        subheadline: 'A medical-grade skincare routine designed with pregnancy-safe ingredients to support healthy, glowing skin.',
        ctaPrimary: 'Shop Pregnancy-Safe Routine',
        ctaSecondary: 'Take the Quiz',
        benefits: [
            '100% pregnancy-safe ingredients',
            'Designed by Board Certified NP',
            'Addresses pregnancy-related skin changes'
        ],
        testimonial: {
            text: 'Peace of mind knowing my skincare is completely safe for my baby while keeping my skin healthy and glowing.',
            author: 'Sarah M., 32',
            rating: 5
        },
        seo: {
            title: 'Pregnancy-Safe Skincare Routine | Medical-Grade Products',
            description: 'Safe, effective skincare for pregnancy and nursing. 100% pregnancy-safe ingredients designed by skincare professionals.'
        }
    },
    'dark-spots': {
        concern: 'pigmentation',
        bundleKey: 'pigmentation',
        headline: 'Fade Dark Spots and Even Your Skin Tone — Fast',
        subheadline: 'A medical-grade skincare routine designed to target hyperpigmentation, dark spots, and uneven tone.',
        ctaPrimary: 'Shop Pigmentation Routine',
        ctaSecondary: 'Take the Quiz',
        benefits: [
            'Koji-C + Vitamin C brightening',
            'Designed by Board Certified NP',
            'Visible results in 6-8 weeks'
        ],
        testimonial: {
            text: 'The Koji-C Pads are life-changing! My dark spots have faded significantly and my skin tone is so much more even.',
            author: 'Lisa R., 42',
            rating: 5
        },
        seo: {
            title: 'Dark Spot Treatment | Pigmentation Skincare Routine',
            description: 'Fade dark spots and even skin tone with our clinical pigmentation routine. Medical-grade brightening ingredients that work.'
        }
    },
    'sensitive-skin': {
        concern: 'redness',
        bundleKey: 'redness',
        headline: 'Calm Redness and Strengthen Your Skin Barrier',
        subheadline: 'A medical-grade skincare routine designed to soothe sensitive skin, reduce redness, and strengthen your barrier.',
        ctaPrimary: 'Shop Sensitive Skin Routine',
        ctaSecondary: 'Take the Quiz',
        benefits: [
            'Gentle, barrier-strengthening formulas',
            'Designed by Board Certified NP',
            'Reduces redness by 67% in 8 weeks'
        ],
        testimonial: {
            text: 'This routine has been amazing for my rosacea. My skin is calmer and less reactive than ever before.',
            author: 'Emily T., 38',
            rating: 5
        },
        seo: {
            title: 'Sensitive Skin Routine | Redness & Rosacea Treatment',
            description: 'Calm sensitive skin and reduce redness with our clinical routine. Gentle, medical-grade formulas for rosacea-prone skin.'
        }
    }
};

// Export for use in landing pages
if (typeof window !== 'undefined') {
    window.LANDING_CONFIG = LANDING_CONFIG;
}

// Get config by route slug
function getLandingConfig(slug) {
    return LANDING_CONFIG[slug];
}

if (typeof window !== 'undefined') {
    window.getLandingConfig = getLandingConfig;
}
