/**
 * RESULTS PAGE RENDERER
 * Dynamic, conversion-optimized result page system
 * Works for ALL concern types (no hardcoded layouts)
 */

class ResultsPage {
    constructor() {
        this.concern = null;
        this.bundle = null;
        this.products = [];
        this.config = null;
        
        this.init();
    }
    
    async init() {
        // Wait for RFA_BUNDLES to load
        await this.waitForBundles();
        
        // Load quiz data
        this.loadQuizData();
        
        // Get config for this concern
        this.config = window.RESULT_CONFIG[this.concern];
        
        if (!this.config) {
            console.error('No config found for concern:', this.concern);
            alert('Error loading your results. Please retake the quiz.');
            window.location.href = 'quiz.html';
            return;
        }
        
        // Render page
        this.renderPage();
        
        // Track view
        this.trackView();
    }
    
    async waitForBundles() {
        let attempts = 0;
        while (!window.RFA_BUNDLES && attempts < 20) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!window.RFA_BUNDLES) {
            console.error('RFA_BUNDLES failed to load');
        }
    }
    
    loadQuizData() {
        const quizData = localStorage.getItem('quizData');
        if (!quizData) {
            console.error('No quiz data found');
            window.location.href = 'quiz.html';
            return;
        }
        
        const data = JSON.parse(quizData);
        this.concern = data.concern;
        this.bundle = data.bundleDetails;
        this.products = data.products || [];
        
        // Rebuild from concern if bundle missing
        if (!this.bundle && this.concern) {
            this.rebuildFromConcern();
        }
    }
    
    rebuildFromConcern() {
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
        this.bundle = window.RFA_BUNDLES[bundleKey];
        
        // Rebuild products
        if (this.bundle && this.bundle.products) {
            this.products = this.bundle.products
                .sort((a, b) => a.step - b.step)
                .map(p => ({
                    name: p.name,
                    benefit: p.benefit,
                    price: this.estimatePrice(p.name),
                    image: this.getProductImage(p.name),
                    step: p.step,
                    hero: p.hero || false
                }));
        }
    }
    
    renderPage() {
        if (!this.bundle || !this.config) {
            console.error('Cannot render: missing bundle or config');
            return;
        }
        
        // 1. Render dynamic headline section
        this.renderHeadline();
        
        // 2. Render bundle hero card
        this.renderBundleCard();
        
        // 3. Render product stack
        this.renderProducts();
        
        // 4. Render usage instructions
        this.renderUsage();
        
        // 5. Render audience
        this.renderAudience();
    }
    
    renderHeadline() {
        document.getElementById('resultHeadline').textContent = this.config.headline;
        document.getElementById('resultSubheadline').textContent = this.config.subheadline;
        document.getElementById('resultTrustLine').textContent = this.config.trustLine;
    }
    
    renderBundleCard() {
        const bundleImageHTML = this.bundle.image 
            ? `<img src="${this.bundle.image}" alt="${this.bundle.name}" class="bundle-image" onerror="this.style.display='none';">` 
            : '';
        
        const bundleHTML = `
            <div class="bundle-badge">✨ Recommended For You</div>
            ${bundleImageHTML}
            <h2 class="bundle-name">${this.bundle.name}</h2>
            <div class="bundle-rating">
                ${'⭐'.repeat(Math.floor(this.bundle.rating))} 
                <span class="rating-text">${this.bundle.rating} (${this.bundle.reviews} reviews)</span>
            </div>
            <p class="bundle-description">${this.bundle.description}</p>
            <div class="bundle-price-row">
                <span class="bundle-price">$${this.bundle.price}</span>
                <span class="bundle-price-label">Complete ${this.bundle.products.length}-Product System</span>
            </div>
            
            <!-- CTA Decision Block -->
            <div class="cta-decision-block">
                <a href="cart.html" class="btn btn-primary btn-large bundle-cta">
                    Get My Routine
                </a>
                
                <!-- Concern-Specific Urgency -->
                <p class="urgency-line">
                    ${this.config.urgency.primary}
                </p>
                
                <!-- Subscription Line -->
                <p class="subscription-line">
                    ${this.config.subscription.primary}
                </p>
                <p class="subscription-micro">Pause or cancel anytime</p>
                
                <!-- Trust Bullets -->
                <div class="trust-bullets">
                    ${this.config.trustBullets.map(bullet => `<span class="trust-bullet">✓ ${bullet}</span>`).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('bundleCard').innerHTML = bundleHTML;
    }
    
    renderProducts() {
        if (!this.products || this.products.length === 0) {
            console.warn('No products to render');
            return;
        }
        
        const productsHTML = this.products.map(product => `
            <div class="stack-product ${product.hero ? 'is-hero' : ''}">
                ${product.hero ? '<span class="hero-badge">KEY PRODUCT</span>' : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='/images/placeholder-product.jpg';">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-benefit">${product.benefit}</p>
                <span class="product-price">$${product.price}</span>
            </div>
        `).join('');
        
        document.getElementById('productStack').innerHTML = productsHTML;
    }
    
    renderUsage() {
        const usageHTML = `<p>${this.bundle.howToUse}</p>`;
        document.getElementById('usageInstructions').innerHTML = usageHTML;
    }
    
    renderAudience() {
        document.getElementById('audienceText').textContent = this.bundle.whoItsFor;
    }
    
    trackView() {
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_name: this.bundle.name,
                content_category: this.concern,
                value: this.bundle.price,
                currency: 'USD'
            });
        }
    }
    
    estimatePrice(productName) {
        const priceMap = {
            'Gentle Foaming Cleanser': 45,
            'Purifying Cleanser': 45,
            'Clear & Calm Serum': 95,
            'Hydrating Gel': 65,
            'Hydrating Toner': 55,
            'BPO 2.5%': 38,
            'HA Peptide Serum': 110,
            'Hydralipid Moisturizer': 85,
            'Koji Clear Pads': 85,
            'Mandelic 5% Pads': 65,
            'Mandelic 10% Pads': 75,
            'Brightening Pads': 65,
            'Retinol 25': 125,
            'Retinol 50': 155,
            'Radiant Vitamin C': 95,
            'Radiant Vitamin C Serum': 95,
            'Sheer Protect SPF 50': 48,
            'Light Lotion': 65,
            'Hydrating Eye Serum': 95,
            'Silk Serum': 110,
            'Exfoliating Scrub': 48,
            'Lux Pads': 85
        };
        return priceMap[productName] || 75;
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
            'Mandelic 10% Pads': '/images/brightening-pads_1.jpg',
            'Brightening Pads': '/images/brightening-pads_1.jpg',
            'Retinol 25': '/images/forever-young-retinol-50_1.jpg',
            'Retinol 50': '/images/forever-young-retinol-50_1.jpg',
            'Radiant Vitamin C': '/images/radiant-vitamin-c_1.jpg',
            'Radiant Vitamin C Serum': '/images/radiant-vitamin-c_1.jpg',
            'Sheer Protect SPF 50': '/images/sheer-protect-spf-50_1.jpg',
            'Light Lotion': '/images/light-lotion_1.jpg',
            'Hydrating Eye Serum': '/images/hydrating-eye-serum.jpg',
            'Silk Serum': '/images/silk-serum.jpg',
            'Exfoliating Scrub': '/images/exfoliating-scrub.jpg',
            'Lux Pads': '/images/lux-pads.jpg'
        };
        return imageMap[productName] || '/images/placeholder-product.jpg';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new ResultsPage();
});
