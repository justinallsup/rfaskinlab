// SMART RESULT ENGINE - Maps quiz answers to REAL RFA BUNDLES
// Concern-first routing aligned with rfaskincare.com

class SmartResultEngine {
    constructor(answers) {
        this.answers = answers;
        this.concern = null;
        this.routineType = null; // Legacy field for backward compatibility
        this.bundle = null;
        this.products = [];
        this.analyze();
    }
    
    analyze() {
        const primaryConcern = this.answers[1]; // Q1 - Primary skin concern
        const isPregnant = this.answers[2]; // Q2 - Pregnancy status
        const skinType = this.answers[3]; // Q3 - Skin type
        const sensitivity = this.answers[4]; // Q4 - Sensitivity level
        const ageRange = this.answers[5]; // Q5 - Age range
        
        console.log('Analyzing:', { primaryConcern, isPregnant, skinType, sensitivity, ageRange });
        
        // Priority-based concern routing
        // 1. Pregnancy overrides all other concerns
        if (isPregnant === 'yes') {
            this.concern = 'pregnancy';
        }
        // 2. Teen age range
        else if (ageRange === 'teen') {
            this.concern = 'teen';
        }
        // 3. Primary concern from Q1 (user's explicit choice)
        else {
            this.concern = primaryConcern; // redness, acne, pigmentation, aging, dryness
        }
        
        // Set legacy routineType for backward compatibility
        const concernToRoutineMap = {
            'redness': 'barrier-repair',
            'acne': 'acne-control',
            'pigmentation': 'brightening',
            'aging': 'anti-aging',
            'dryness': 'hydration',
            'pregnancy': 'pregnancy',
            'teen': 'teen'
        };
        this.routineType = concernToRoutineMap[this.concern] || 'balanced';
        
        // Get real RFA bundle for this concern
        this.bundle = this.getRealBundle();
        
        // Build products from bundle
        this.buildProductsFromBundle();
        
        console.log('Final concern:', this.concern);
        console.log('Routine type (legacy):', this.routineType);
        console.log('Bundle:', this.bundle);
        console.log('Products:', this.products);
    }
    
    getRealBundle() {
        console.log('🔍 getRealBundle() called');
        console.log('🔍 this.concern:', this.concern);
        console.log('🔍 typeof window:', typeof window);
        console.log('🔍 typeof window.RFA_BUNDLES:', typeof window.RFA_BUNDLES);
        console.log('🔍 window.RFA_BUNDLES:', window.RFA_BUNDLES);
        
        // Method 1: Use helper function
        if (typeof window !== 'undefined' && typeof window.getBundleByConcern === 'function') {
            console.log('🔍 Trying getBundleByConcern...');
            const bundle = window.getBundleByConcern(this.concern);
            console.log('🔍 getBundleByConcern result:', bundle);
            if (bundle) {
                console.log('✅ Bundle found via getBundleByConcern');
                return bundle;
            }
        }
        
        // Method 2: Direct access to RFA_BUNDLES
        if (typeof window !== 'undefined' && typeof window.RFA_BUNDLES === 'object' && window.RFA_BUNDLES !== null) {
            console.log('🔍 Trying direct RFA_BUNDLES access...');
            const bundleMap = {
                'redness': 'redness',
                'acne': 'acne',
                'pigmentation': 'pigmentation',
                'aging': 'antiaging',
                'dryness': 'dryness',
                'pregnancy': 'pregnancy',
                'teen': 'teen'
            };
            const bundleKey = bundleMap[this.concern];
            console.log('🔍 bundleKey:', bundleKey);
            console.log('🔍 window.RFA_BUNDLES[bundleKey]:', window.RFA_BUNDLES[bundleKey]);
            const bundle = window.RFA_BUNDLES[bundleKey];
            console.log('Direct bundle lookup for concern:', this.concern, '→ bundleKey:', bundleKey, '→', bundle ? '✅ found' : '❌ not found');
            if (bundle) {
                return bundle;
            }
        }
        
        // Method 3: Hardcoded fallback (last resort)
        console.error('❌ RFA_BUNDLES not available. Window object:', typeof window);
        console.error('❌ window.RFA_BUNDLES:', typeof window.RFA_BUNDLES);
        console.error('❌ This concern:', this.concern);
        
        return null;
    }
    
    buildProductsFromBundle() {
        if (!this.bundle || !this.bundle.products) {
            console.error('No bundle found for concern:', this.concern);
            return;
        }
        
        // Show ALL products from the bundle (not just 3)
        const allProducts = this.bundle.products
            .sort((a, b) => a.step - b.step);
        
        this.products = allProducts.map(p => ({
            name: p.name,
            benefit: p.benefit,
            price: this.estimatePrice(p.name),
            image: this.getProductImage(p.name),
            sku: this.getSKU(p.name),
            step: p.step,
            hero: p.hero || false
        }));
    }
    
    estimatePrice(productName) {
        const prices = {
            // Cleansers
            'Gentle Foaming Cleanser': 44,
            'Purifying Cleanser': 44,
            
            // Treatments/Serums
            'Clear & Calm Serum': 59,
            'Koji Clear Pads': 79,
            'Mandelic 5% Pads': 68,
            'BPO 2.5%': 39,
            'Retinol 25': 89,
            'Retinol 50': 99,
            'Radiant Vitamin C': 95,
            'Radiant Vitamin C Serum': 95,
            'HA Peptide Serum': 99,
            'Brightening Pads': 68,
            
            // Moisturizers
            'Hydrating Gel': 65,
            'Hydrating Toner': 48,
            'Hydralipid Moisturizer': 109,
            'Light Lotion': 55,
            'Hydrating Eye Serum': 78,
            
            // SPF
            'Sheer Protect SPF 50': 42
        };
        return prices[productName] || 65;
    }
    
    getProductImage(productName) {
        const imageMap = {
            'Gentle Foaming Cleanser': '/images/gentle-foaming-cleanser_1.jpg',
            'Purifying Cleanser': '/images/gentle-foaming-cleanser_1.jpg',
            'Clear & Calm Serum': '/images/clear-calm-serum_1.jpg',
            'Hydrating Gel': '/images/hydrating-gel_1.jpg',
            'Hydrating Toner': '/images/hydrating-toner.jpg',
            'BPO 2.5%': '/images/bpo-2-5_1.jpg',
            'HA Peptide Serum': '/images/ha-peptide-serum-1_1.jpg',
            'Hydralipid Moisturizer': '/images/hydralipid-moisturizer-1_1.jpg',
            'Koji Clear Pads': '/images/brightening-pads_1.jpg',
            'Mandelic 5% Pads': '/images/brightening-pads_1.jpg',
            'Brightening Pads': '/images/brightening-pads_1.jpg',
            'Retinol 25': '/images/forever-young-retinol-50_1.jpg',
            'Retinol 50': '/images/forever-young-retinol-50_1.jpg',
            'Radiant Vitamin C': '/images/radiant-vitamin-c_1.jpg',
            'Radiant Vitamin C Serum': '/images/radiant-vitamin-c_1.jpg',
            'Sheer Protect SPF 50': '/images/sheer-protect-spf-50_1.jpg',
            'Light Lotion': '/images/light-lotion_1.jpg',
            'Hydrating Eye Serum': '/images/eye-serum.jpg'
        };
        return imageMap[productName] || '/images/placeholder-product.jpg';
    }
    
    getSKU(productName) {
        return productName.replace(/[^a-zA-Z0-9]/g, '-').toUpperCase();
    }
    
    getHeadline() {
        const headlines = {
            'redness': 'Your Skin Needs a Redness/Rosacea-Focused Routine',
            'acne': 'Your Skin Needs an Acne/Blemishes-Focused Routine',
            'pigmentation': 'Your Skin Needs a Hyperpigmentation/Melasma Treatment',
            'aging': 'Your Skin Needs an Anti-Aging Routine',
            'dryness': 'Your Skin Needs Deep Hydration Support',
            'pregnancy': 'Your Pregnancy-Safe Skincare Routine',
            'teen': 'Your Simple Teen Skincare Routine'
        };
        return headlines[this.concern] || 'Your Personalized Skincare Routine';
    }
    
    getDescription() {
        const descriptions = {
            'redness': 'Based on your answers, your skin concerns align most closely with our Redness/Rosacea pathway. We\'ve matched you to the products and bundle designed specifically for sensitive, reactive skin.',
            'acne': 'Based on your answers, your skin concerns align most closely with our Acne/Blemishes pathway. We\'ve matched you to the products and bundle designed to clear breakouts and prevent future ones.',
            'pigmentation': 'Based on your answers, your skin concerns align most closely with our Hyperpigmentation/Melasma pathway. We\'ve matched you to the products and bundle designed to target stubborn dark spots and even skin tone.',
            'aging': 'Based on your answers, your skin concerns align most closely with our Anti-Aging pathway. We\'ve matched you to the products and bundle designed to reduce fine lines and boost collagen production.',
            'dryness': 'Based on your answers, your skin concerns align most closely with our Hydration pathway. We\'ve matched you to the products and bundle designed to deliver deep, lasting moisture.',
            'pregnancy': 'Based on your answers, we\'ve matched you to our Pregnancy Bundle with products that are completely safe for expecting and nursing mothers.',
            'teen': 'Based on your answers, we\'ve matched you to our Teen Bundle – a simple 3-step routine designed specifically for teenage skin.'
        };
        return descriptions[this.concern] || 'Based on your quiz results, we\'ve built a personalized routine for your unique skin needs.';
    }
    
    // Get bundle-specific recommendation text
    getBundleRecommendation() {
        if (!this.bundle) return '';
        
        return `This ${this.bundle.name} includes ${this.bundle.products.length} medical-grade products that work together to address ${this.bundle.concern.toLowerCase()}. Each product has been specifically chosen to complement the others, creating a powerful yet gentle routine.`;
    }
    
    // Get "Who It's For" text from bundle
    getWhoItsFor() {
        return this.bundle?.whoItsFor || '';
    }
    
    // Get "How to Use" text from bundle
    getHowToUse() {
        return this.bundle?.howToUse || '';
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartResultEngine;
}
if (typeof window !== 'undefined') {
    window.SmartResultEngine = SmartResultEngine;
}
