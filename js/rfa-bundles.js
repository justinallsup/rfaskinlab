// RFA SKINCARE - REAL BUNDLES DATABASE
// Source: https://rfaskincare.com/collections/bundles
// Last updated: 2026-03-31

const RFA_BUNDLES = {
    redness: {
        name: 'Redness & Rosacea Bundle',
        price: 180,
        url: 'https://rfaskincare.com/products/rosacea-bundle',
        image: '/images/redness-bundle_1.jpg',
        description: 'Transform sensitive, reactive skin into a calm, balanced complexion with our expertly curated 5-piece bundle.',
        shortDesc: 'Calm redness, strengthen barrier, reduce sensitivity',
        concern: 'Redness/Rosacea',
        products: [
            { name: 'Gentle Foaming Cleanser', step: 1, benefit: 'Soothing, non-stripping cleanse that respects delicate balance' },
            { name: 'Clear & Calm Serum', step: 2, hero: true, benefit: 'Specialized serum targets redness and inflammation' },
            { name: 'Hydrating Gel', step: 3, benefit: 'Lightweight cooling hydration without heaviness' },
            { name: 'Hydrating Toner', step: 1.5, benefit: 'Alcohol-free, balances pH, reduces sensitivity' },
            { name: 'Sheer Protect SPF 50', step: 4, benefit: 'Ultra-gentle mineral sunscreen for sensitive skin' }
        ],
        rating: 4.8,
        reviews: 6,
        badge: 'Best for Sensitive Skin',
        whoItsFor: 'Ideal for sensitive, reactive skin prone to redness, flushing, or rosacea. Perfect if products often irritate your skin or if you experience frequent sensitivity.',
        howToUse: 'Morning: Cleanser → Toner → Serum → Gel → SPF. Evening: Cleanser → Toner → Serum → Gel.'
    },
    
    acne: {
        name: 'Acne Bundle',
        price: 175,
        url: 'https://rfaskincare.com/products/acne-bundle',
        image: '/images/acne-bundle_1.jpg',
        description: 'Stop fighting acne with guesswork. This scientifically-formulated bundle combines our most effective acne-fighting products into one powerful routine.',
        shortDesc: 'Clear breakouts, unclog pores, prevent new acne',
        concern: 'Acne/Blemishes',
        products: [
            { name: 'Gentle Foaming Cleanser', step: 1, benefit: 'Non-stripping cleanse removes impurities without disrupting barrier' },
            { name: 'Mandelic 5% Pads', step: 2, hero: true, benefit: 'Gentle exfoliation unclogs pores and smooths texture' },
            { name: 'BPO 2.5%', step: 2.5, benefit: 'Targeted benzoyl peroxide fights acne-causing bacteria' },
            { name: 'Hydrating Gel', step: 3, benefit: "Lightweight hydration that won't clog pores" },
            { name: 'Light Lotion', step: 3.5, benefit: 'Oil-free moisturizer balances acne-prone skin' }
        ],
        rating: 4.8,
        reviews: 15,
        badge: 'Best for Breakouts',
        whoItsFor: 'Perfect for acne-prone skin dealing with active breakouts, clogged pores, or recurring blemishes. Works for both teenage and adult acne.',
        howToUse: 'Morning: Cleanser → Gel → Lotion. Evening: Cleanser → Pads (3x/week) → BPO (spot treat) → Gel → Lotion.'
    },
    
    pigmentation: {
        name: 'Pigmentation Bundle',
        price: 425,
        url: 'https://rfaskincare.com/products/pigmentation-bundle',
        image: '/images/pigmentation-bundle_1.jpg',
        description: 'Reveal your most radiant, even-toned complexion. Targets stubborn dark spots, melasma, sun damage, and uneven skin tone with medical-grade ingredients.',
        shortDesc: 'Reduce dark spots, brighten complexion, even tone',
        concern: 'Hyperpigmentation/Melasma',
        products: [
            { name: 'Gentle Foaming Cleanser', step: 1, benefit: 'Deep cleanse without stripping natural oils' },
            { name: 'Koji Clear Pads', step: 2, hero: true, benefit: 'Patent-pending formula visibly reduces hyperpigmentation' },
            { name: 'Radiant Vitamin C', step: 2.5, benefit: 'Powerful antioxidant brightens and protects' },
            { name: 'Hydralipid Moisturizer', step: 3, benefit: 'Age-defying hydration with barrier support' },
            { name: 'Sheer Protect SPF 50', step: 4, benefit: 'Essential protection prevents new dark spots' }
        ],
        rating: 5.0,
        reviews: 7,
        badge: 'Best for Dark Spots',
        whoItsFor: "Designed for stubborn hyperpigmentation, melasma, sun damage, post-inflammatory marks, or uneven skin tone. Ideal for those who've tried other products without success.",
        howToUse: 'Morning: Cleanser → Vitamin C → Moisturizer → SPF. Evening: Cleanser → Koji Pads → Moisturizer. (Use pads 3-5x/week, build tolerance)'
    },
    
    dryness: {
        name: 'Hydration Bundle',
        price: 330,
        url: 'https://rfaskincare.com/products/hydration-bundle',
        image: '/images/hydration-bundle_1.jpg',
        description: "Transform your skin's moisture barrier with our scientifically-curated hydration bundle. Delivers deep, lasting hydration at every step.",
        shortDesc: 'Deep hydration, strengthen barrier, plump skin',
        concern: 'Dryness/Dehydration',
        products: [
            { name: 'Gentle Foaming Cleanser', step: 1, benefit: "Maintains skin's natural moisture balance" },
            { name: 'Hydrating Toner', step: 1.5, benefit: 'Replenishing layers lock in hydration' },
            { name: 'HA Peptide Serum', step: 2, hero: true, benefit: 'Deep hydration + collagen-boosting peptides' },
            { name: 'Hydrating Eye Serum', step: 2.5, benefit: 'Smooths fine lines, reduces puffiness' },
            { name: 'Hydralipid Moisturizer', step: 3, benefit: 'Strengthens moisture barrier without heaviness' }
        ],
        rating: 4.7,
        reviews: 7,
        badge: 'Best for Dry Skin',
        whoItsFor: 'Perfect for dry, dehydrated, or tight skin that needs intense moisture. Great for maintaining hydration during harsh weather or after treatments.',
        howToUse: 'Morning & Evening: Cleanser → Toner → HA Serum → Eye Serum → Moisturizer. Layer products while skin is still damp for maximum absorption.'
    },
    
    antiaging: {
        name: 'Foundational 5 Bundle',
        price: 375,
        url: 'https://rfaskincare.com/products/rfa-foundational-5',
        image: '/images/antiaging-bundle_1.jpg',
        description: 'Transform your skincare routine with our most powerful daily essentials. Perfect for addressing fine lines, wrinkles, and signs of aging with proven, professional-grade products.',
        shortDesc: 'Reduce fine lines, boost collagen, protect skin',
        concern: 'Anti-Aging',
        products: [
            { name: 'Gentle Foaming Cleanser', step: 1, benefit: 'Removes impurities while maintaining moisture barrier' },
            { name: 'Radiant Vitamin C Serum', step: 2, benefit: 'Brightens and protects against free radicals' },
            { name: 'Retinol 25', step: 2.5, hero: true, benefit: 'Promotes cell turnover, reduces fine lines' },
            { name: 'Hydralipid Moisturizer', step: 3, benefit: 'Deep hydration with anti-aging benefits' },
            { name: 'Sheer Protect SPF 50', step: 4, benefit: 'Guards against UV damage and photoaging' }
        ],
        rating: 4.8,
        reviews: 8,
        badge: 'Best for Anti-Aging',
        whoItsFor: 'Ideal for those concerned with fine lines, wrinkles, loss of firmness, or preventing premature aging. Works for all ages seeking comprehensive anti-aging support.',
        howToUse: 'Morning: Cleanser → Vitamin C → Moisturizer → SPF. Evening: Cleanser → Retinol (start 2x/week) → Moisturizer. Build retinol tolerance gradually.'
    },
    
    pregnancy: {
        name: 'Pregnancy Bundle',
        price: 350,
        url: 'https://rfaskincare.com/products/pregnancy-bundle?variant=46176770687235',
        image: '/images/pregnancy-bundle_1.jpg',
        description: 'Transform your pregnancy skincare routine with medical-grade products you can trust. Each product has been thoughtfully selected to support your skin during pregnancy and nursing.',
        shortDesc: 'Pregnancy-safe, supports changing skin',
        concern: 'Pregnancy/Nursing',
        products: [
            { name: 'Gentle Foaming Cleanser', step: 1, benefit: 'Effectively removes impurities while maintaining moisture—perfect for hormone-sensitive skin.' },
            { name: 'Hydralipid Moisturizer', step: 3, benefit: 'This gentle moisturizer helps maintain elasticity and hydration without any harsh ingredients, supporting your skin as it adapts through every trimester.' },
            { name: 'Radiant Vitamin C', step: 2, hero: true, benefit: 'Safe, stable brightening support for pregnancy-related pigmentation. Helps maintain your natural glow while targeting uneven tone and dark spots—the perfect companion for combating pregnancy mask.' },
            { name: 'Brightening Pads', step: 2.5, benefit: 'Gentle exfoliation for that pregnancy glow, without any harsh ingredients. These pads help maintain clear, bright skin while respecting your skin\'s increased sensitivity.' },
            { name: 'Sheer Protect SPF 50', step: 4, benefit: 'Essential broad-spectrum protection in a lightweight formula. Guards against pigmentation changes while providing crucial UV defense for your extra-sensitive skin.' }
        ],
        rating: 5.0,
        reviews: 9,
        badge: 'Pregnancy-Safe',
        whoItsFor: 'Specially formulated for expectant and nursing mothers. All products are safe for use during pregnancy and breastfeeding.',
        howToUse: 'Morning: Cleanser → Vitamin C → Moisturizer → SPF. Evening: Cleanser → Pads (2-3x/week) → Moisturizer. Safe throughout pregnancy and nursing.'
    },
    
    teen: {
        name: 'Teen Bundle',
        price: 110,
        url: 'https://rfaskincare.com/products/teen-bundle',
        image: '/images/teen-bundle_1.jpg',
        description: 'The perfect starter kit for teens – no complicated routines, just three powerful products that work together to keep skin clear, balanced, and healthy.',
        shortDesc: 'Simple routine, clear skin, build healthy habits',
        concern: 'Teen Skin',
        products: [
            { name: 'Purifying Cleanser', step: 1, benefit: 'Removes dirt and oil without drying' },
            { name: 'Mandelic 5% Pads', step: 2, hero: true, benefit: 'Clears pores and kills acne-causing bacteria' },
            { name: 'Hydrating Gel', step: 3, benefit: "Lightweight, won't cause breakouts" }
        ],
        rating: 5.0,
        reviews: 2,
        badge: 'Best for Teens',
        whoItsFor: 'Designed specifically for teenage skin dealing with breakouts, oiliness, or first skincare routine. Simple 3-step system builds lifelong healthy habits.',
        howToUse: 'Morning: Cleanser → Gel. Evening: Cleanser → Pads (3-4x/week) → Gel. Start with pads 2x/week and build up as tolerated.'
    }
};

// Concern to bundle mapping (primary routing)
const CONCERN_TO_BUNDLE = {
    'redness': 'redness',
    'acne': 'acne',
    'pigmentation': 'pigmentation',
    'aging': 'antiaging',
    'dryness': 'dryness',
    'pregnancy': 'pregnancy',
    'teen': 'teen'
};

// Routine type to bundle mapping (legacy support)
const ROUTINE_TO_BUNDLE = {
    'barrier-repair': 'redness',
    'acne-control': 'acne',
    'hydration': 'dryness',
    'brightening': 'pigmentation',
    'anti-aging': 'antiaging',
    'balanced': 'redness'
};

// Get bundle by concern (primary method)
function getBundleByConcern(concern) {
    const bundleKey = CONCERN_TO_BUNDLE[concern] || 'redness';
    return RFA_BUNDLES[bundleKey];
}

// Get bundle by routine type (legacy support)
function getBundleForRoutine(routineType) {
    const bundleKey = ROUTINE_TO_BUNDLE[routineType] || 'redness';
    return RFA_BUNDLES[bundleKey];
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.RFA_BUNDLES = RFA_BUNDLES;
    window.CONCERN_TO_BUNDLE = CONCERN_TO_BUNDLE;
    window.getBundleForRoutine = getBundleForRoutine;
    window.getBundleByConcern = getBundleByConcern;
}
