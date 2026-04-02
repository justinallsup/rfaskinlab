/**
 * LANDING PAGE RENDERER
 * Reusable system for all no-quiz landing pages
 * Dynamically renders based on page slug
 */

class LandingPage {
    constructor(slug) {
        this.slug = slug;
        this.config = null;
        this.bundle = null;
        
        this.init();
    }
    
    async init() {
        // Wait for dependencies
        await this.waitForDependencies();
        
        // Get config for this landing page
        this.config = window.getLandingConfig(this.slug);
        
        if (!this.config) {
            console.error('No config found for slug:', this.slug);
            window.location.href = '/';
            return;
        }
        
        // Get bundle data
        this.bundle = window.RFA_BUNDLES[this.config.bundleKey];
        
        if (!this.bundle) {
            console.error('No bundle found for key:', this.config.bundleKey);
            window.location.href = '/';
            return;
        }
        
        // Render page
        this.renderPage();
        
        // Track page view
        this.trackView();
    }
    
    async waitForDependencies() {
        let attempts = 0;
        while ((!window.RFA_BUNDLES || !window.getLandingConfig) && attempts < 20) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
    }
    
    renderPage() {
        // 1. Update SEO
        this.updateSEO();
        
        // 2. Render hero
        this.renderHero();
        
        // 3. Render bundle
        this.renderBundle();
        
        // 4. Render products
        this.renderProducts();
        
        // 5. Render benefits
        this.renderBenefits();
        
        // 6. Render testimonial
        this.renderTestimonial();
        
        // 7. Render quiz fallback
        this.renderQuizFallback();
        
        // 8. Setup tracking
        this.setupTracking();
    }
    
    updateSEO() {
        document.title = this.config.seo.title;
        document.querySelector('meta[name="description"]').setAttribute('content', this.config.seo.description);
    }
    
    renderHero() {
        document.getElementById('heroHeadline').textContent = this.config.headline;
        document.getElementById('heroSubheadline').textContent = this.config.subheadline;
        document.getElementById('heroCTAPrimary').textContent = this.config.ctaPrimary;
        document.getElementById('heroCTASecondary').textContent = this.config.ctaSecondary;
    }
    
    renderBundle() {
        const bundleImageHTML = this.bundle.image 
            ? `<img src="${this.bundle.image}" alt="${this.bundle.name}" class="bundle-image-landing">` 
            : '';
        
        const bundleHTML = `
            ${bundleImageHTML}
            <h2 class="bundle-name-landing">${this.bundle.name}</h2>
            <div class="bundle-rating-landing">
                ${'⭐'.repeat(Math.floor(this.bundle.rating))} 
                <span class="rating-text">${this.bundle.rating} (${this.bundle.reviews} reviews)</span>
            </div>
            <p class="bundle-description-landing">${this.bundle.description}</p>
            <div class="bundle-price-landing">
                <span class="price-amount">$${this.bundle.price}</span>
                <span class="price-label">${this.bundle.products.length}-Product System</span>
            </div>
            <a href="cart.html?bundle=${this.config.bundleKey}" class="btn btn-primary btn-large bundle-cta-landing" data-track="bundle-cta">
                ${this.config.ctaPrimary}
            </a>
        `;
        
        document.getElementById('bundleCard').innerHTML = bundleHTML;
    }
    
    renderProducts() {
        if (!this.bundle.products || this.bundle.products.length === 0) {
            return;
        }
        
        const productsHTML = this.bundle.products
            .sort((a, b) => a.step - b.step)
            .map(product => `
                <div class="product-item-landing ${product.hero ? 'is-hero' : ''}">
                    ${product.hero ? '<span class="hero-badge-landing">KEY PRODUCT</span>' : ''}
                    <img src="${this.getProductImage(product.name)}" alt="${product.name}" class="product-image-landing" onerror="this.src='/images/placeholder-product.jpg';">
                    <h3 class="product-name-landing">${product.name}</h3>
                    <p class="product-benefit-landing">${product.benefit}</p>
                </div>
            `).join('');
        
        document.getElementById('productsGrid').innerHTML = productsHTML;
    }
    
    renderBenefits() {
        const benefitsHTML = this.config.benefits
            .map(benefit => `<li class="benefit-item-landing">✓ ${benefit}</li>`)
            .join('');
        
        document.getElementById('benefitsList').innerHTML = benefitsHTML;
    }
    
    renderTestimonial() {
        const testimonialHTML = `
            <div class="stars-landing">${'⭐'.repeat(this.config.testimonial.rating)}</div>
            <p class="testimonial-text-landing">"${this.config.testimonial.text}"</p>
            <p class="testimonial-author-landing">— ${this.config.testimonial.author}</p>
        `;
        
        document.getElementById('testimonialCard').innerHTML = testimonialHTML;
    }
    
    renderQuizFallback() {
        // Quiz fallback is static HTML, just ensure link is correct
        document.querySelectorAll('.quiz-link').forEach(link => {
            link.href = 'quiz.html';
        });
    }
    
    setupTracking() {
        // Track CTA clicks
        document.querySelectorAll('[data-track="bundle-cta"]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackEvent('bundle_cta_click', {
                    concern: this.config.concern,
                    bundle: this.config.bundleKey,
                    source: 'landing_page'
                });
            });
        });
        
        document.querySelectorAll('.quiz-link').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('quiz_fallback_click', {
                    concern: this.config.concern,
                    source: 'landing_page'
                });
            });
        });
    }
    
    trackView() {
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_name: this.bundle.name,
                content_category: this.config.concern,
                value: this.bundle.price,
                currency: 'USD',
                source: 'landing_page'
            });
        }
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: this.config.seo.title,
                page_path: `/${this.slug}`,
                concern: this.config.concern
            });
        }
    }
    
    trackEvent(eventName, params) {
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', eventName, params);
        }
        
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
        }
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
            'Hydrating Eye Serum': '/images/eye-serum.jpg',
            'Silk Serum': '/images/silk-serum.jpg',
            'Exfoliating Scrub': '/images/exfoliating-scrub.jpg',
            'Lux Pads': '/images/lux-pads.jpg'
        };
        return imageMap[productName] || '/images/placeholder-product.jpg';
    }
}
