// OPTIMIZED QUIZ - Aligned with RFA Skincare "Shop by Skin Concern"
// Source: https://rfaskincare.com/collections/bundles

const optimizedQuizData = {
    questions: [
        {
            id: 1,
            number: 'QUESTION 1 OF 5',
            text: "What's your primary skin concern?",
            subtitle: "Choose the concern that matters most to you right now",
            options: [
                { 
                    value: 'redness', 
                    text: 'Redness & Rosacea', 
                    icon: '🔴',
                    subtext: 'Sensitivity, flushing, reactive skin'
                },
                { 
                    value: 'acne', 
                    text: 'Acne & Blemishes', 
                    icon: '💢',
                    subtext: 'Breakouts, clogged pores, inflammation'
                },
                { 
                    value: 'pigmentation', 
                    text: 'Dark Spots & Melasma', 
                    icon: '🌓',
                    subtext: 'Hyperpigmentation, uneven tone, sun damage'
                },
                { 
                    value: 'aging', 
                    text: 'Anti-Aging', 
                    icon: '⏳',
                    subtext: 'Fine lines, wrinkles, loss of firmness'
                },
                { 
                    value: 'dryness', 
                    text: 'Dryness & Dehydration', 
                    icon: '💧',
                    subtext: 'Tight, flaky, lacking moisture'
                }
            ]
        },
        {
            id: 2,
            number: 'QUESTION 2 OF 5',
            text: "Are you currently pregnant or nursing?",
            subtitle: "We have pregnancy-safe options available",
            options: [
                { 
                    value: 'yes', 
                    text: 'Yes', 
                    subtext: "I need pregnancy-safe products"
                },
                { 
                    value: 'no', 
                    text: 'No',
                    subtext: "Standard products are fine"
                }
            ]
        },
        {
            id: 3,
            number: 'QUESTION 3 OF 5',
            text: "How would you describe your skin type?",
            options: [
                { value: 'dry', text: 'Dry', subtext: 'Tight, flaky, dull' },
                { value: 'oily', text: 'Oily', subtext: 'Shiny, large pores' },
                { value: 'combination', text: 'Combination', subtext: 'Oily T-zone, dry cheeks' },
                { value: 'normal', text: 'Normal', subtext: 'Balanced' }
            ]
        },
        {
            id: 4,
            number: 'QUESTION 4 OF 5',
            text: "How sensitive is your skin?",
            options: [
                { value: 'very', text: 'Very sensitive', subtext: 'Reacts to most products' },
                { value: 'somewhat', text: 'Somewhat sensitive', subtext: 'Occasional reactions' },
                { value: 'not-sensitive', text: 'Not sensitive', subtext: 'Tolerates most products' }
            ]
        },
        {
            id: 5,
            number: 'QUESTION 5 OF 5',
            text: "What's your age range?",
            subtitle: "This helps us personalize your routine",
            options: [
                { value: 'teen', text: 'Under 18', subtext: 'Teen skin' },
                { value: 'young-adult', text: '18-29', subtext: 'Prevention focus' },
                { value: 'adult', text: '30-49', subtext: 'Maintenance + correction' },
                { value: 'mature', text: '50+', subtext: 'Advanced anti-aging' }
            ]
        }
    ]
};

// Make available globally
if (typeof window !== 'undefined') {
    window.optimizedQuizData = optimizedQuizData;
}
// Force rebuild: Tue Mar 31 14:41:27 UTC 2026
