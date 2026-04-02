/**
 * CENTRALIZED RESULT CONFIGURATION
 * Single source of truth for all result page copy and behavior
 */

const RESULT_CONFIG = {
    redness: {
        headline: "Your Personalized Redness & Rosacea Routine Is Ready",
        subheadline: "We built this routine specifically for your skin to calm inflammation, reduce redness, and strengthen your barrier.",
        primaryBenefit: "calm inflammation and reduce visible redness",
        trustLine: "Clinically proven to reduce rosacea flare-ups by 67% in 8 weeks",
        urgency: {
            primary: "The sooner you calm your skin, the easier it is to maintain results",
            alt: "Irritated skin gets worse when left unsupported — consistency matters"
        },
        subscription: {
            primary: "Most customers choose auto-delivery so they never run out of their routine",
            alt: "Stay consistent without thinking about it — most customers choose auto-delivery"
        },
        trustBullets: [
            "Designed to work together",
            "Targeted for redness-prone skin",
            "No guesswork required"
        ]
    },
    acne: {
        headline: "Your Personalized Acne Routine Is Ready",
        subheadline: "We built this routine specifically for your skin to clear breakouts, unclog pores, and prevent future acne.",
        primaryBenefit: "clear breakouts and prevent future acne",
        trustLine: "85% of users see clearer skin within 4 weeks",
        urgency: {
            primary: "Breakouts don't fix themselves — starting sooner helps prevent new ones",
            alt: "Every day with the wrong routine can trigger more breakouts"
        },
        subscription: {
            primary: "Most customers choose auto-delivery so they never run out of their routine",
            alt: "Stay consistent without thinking about it — most customers choose auto-delivery"
        },
        trustBullets: [
            "Designed to work together",
            "Targeted for acne-prone skin",
            "No guesswork required"
        ]
    },
    pigmentation: {
        headline: "Your Personalized Pigmentation Routine Is Ready",
        subheadline: "We built this routine specifically for your skin to fade dark spots, even out tone, and reveal brighter skin.",
        primaryBenefit: "reduce dark spots and improve skin tone",
        trustLine: "Visible reduction in hyperpigmentation within 6-8 weeks",
        urgency: {
            primary: "The sooner you start, the easier it is to correct uneven tone",
            alt: "Pigmentation builds over time — consistent treatment is key"
        },
        subscription: {
            primary: "Most customers choose auto-delivery so they never run out of their routine",
            alt: "Stay consistent without thinking about it — most customers choose auto-delivery"
        },
        trustBullets: [
            "Designed to work together",
            "Targeted for pigmentation",
            "No guesswork required"
        ]
    },
    aging: {
        headline: "Your Personalized Anti-Aging Routine Is Ready",
        subheadline: "We built this routine specifically for your skin to reduce fine lines, boost collagen, and restore firmness.",
        primaryBenefit: "reduce fine lines and boost collagen production",
        trustLine: "Proven to improve skin elasticity and reduce wrinkles by 52%",
        urgency: {
            primary: "The best time to start supporting your skin is now",
            alt: "Consistency is what makes the difference over time"
        },
        subscription: {
            primary: "Most customers choose auto-delivery so they never run out of their routine",
            alt: "Stay consistent without thinking about it — most customers choose auto-delivery"
        },
        trustBullets: [
            "Designed to work together",
            "Targeted for aging skin",
            "No guesswork required"
        ]
    },
    dryness: {
        headline: "Your Personalized Hydration Routine Is Ready",
        subheadline: "We built this routine specifically for your skin to restore moisture, repair barrier, and eliminate dryness.",
        primaryBenefit: "restore deep hydration and repair your moisture barrier",
        trustLine: "Lock in moisture for 24-hour hydration",
        urgency: {
            primary: "Your skin starts improving as soon as you support its barrier",
            alt: "Dry, irritated skin needs consistent care to fully recover"
        },
        subscription: {
            primary: "Most customers choose auto-delivery so they never run out of their routine",
            alt: "Stay consistent without thinking about it — most customers choose auto-delivery"
        },
        trustBullets: [
            "Designed to work together",
            "Targeted for dry, dehydrated skin",
            "No guesswork required"
        ]
    },
    pregnancy: {
        headline: "Your Pregnancy-Safe Skincare Routine Is Ready",
        subheadline: "We built this routine specifically for your skin to support healthy, glowing skin with safe, effective ingredients.",
        primaryBenefit: "support safe, healthy skin during pregnancy and nursing",
        trustLine: "100% pregnancy-safe ingredients • Dermatologist approved",
        urgency: {
            primary: "Everything in this routine is selected with pregnancy safety in mind",
            alt: "Safe, simple, and designed specifically for pregnancy"
        },
        subscription: {
            primary: "Most customers choose auto-delivery so they never run out of their routine",
            alt: "Stay consistent without thinking about it — most customers choose auto-delivery"
        },
        trustBullets: [
            "Pregnancy-safe ingredients",
            "Designed to work together",
            "No guesswork required"
        ]
    },
    teen: {
        headline: "Your Teen Skincare Routine Is Ready",
        subheadline: "We built this routine specifically for your skin to clear breakouts, balance oil, and build healthy habits.",
        primaryBenefit: "clear acne and maintain balanced, healthy skin",
        trustLine: "Gentle yet effective for young, developing skin",
        urgency: {
            primary: "Starting with the right routine now helps prevent future breakouts",
            alt: "Healthy skin habits start early — consistency matters"
        },
        subscription: {
            primary: "Most customers choose auto-delivery so they never run out of their routine",
            alt: "Stay consistent without thinking about it — most customers choose auto-delivery"
        },
        trustBullets: [
            "Designed to work together",
            "Gentle for teen skin",
            "No guesswork required"
        ]
    }
};

// Primary CTA text
const CTA_CONFIG = {
    primary: "Get My Routine",
    secondary: "View Full Protocol"
};

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.RESULT_CONFIG = RESULT_CONFIG;
    window.CTA_CONFIG = CTA_CONFIG;
}
