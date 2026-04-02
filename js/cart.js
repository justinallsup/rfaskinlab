// CART PAGE LOGIC AND FUNCTIONALITY

// Product catalog with pricing
const productCatalog = {
    'Gentle Cleanser': {
        name: 'Gentle Foaming Cleanser',
        price: 42,
        description: 'pH-balanced cleanser that maintains moisture barrier',
        rating: 4.9,
        reviews: 156
    },
    'Koji Clear Pads': {
        name: 'Koji Clear Pads (60 ct)',
        price: 179,
        description: 'Patent-pending formula targets melasma, sun damage, and PIH',
        rating: 4.9,
        reviews: 212,
        badge: 'Patent-Pending'
    },
    'Hydralipid': {
        name: 'Hydralipid Moisturizer',
        price: 109,
        description: 'Ceramides + complex lipids support barrier and restore plumpness',
        rating: 4.9,
        reviews: 105
    },
    'HA Peptide Serum': {
        name: 'HA Peptide Serum',
        price: 99,
        description: 'Deep hydration with peptides and natural growth factors',
        rating: 4.9,
        reviews: 88
    },
    'Silk Serum': {
        name: 'Silk Serum',
        price: 69,
        description: 'Luxurious squalane serum for intense hydration and glow',
        rating: 5.0,
        reviews: 71
    }
};

class ShoppingCart {
    constructor() {
        this.cart = [];
        this.segment = null;
        this.recommendedProducts = [];
        this.init();
    }

    init() {
        // Load user segment and recommended products
        this.loadUserData();
        
        // Build cart from recommendations
        this.buildInitialCart();
        
        // Render the cart
        this.renderCart();
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Update totals
        this.updateTotals();
    }

    loadUserData() {
        // Get segment from localStorage
        this.segment = localStorage.getItem('userSegment') || localStorage.getItem('cartSegment') || 'hyperpigmentation';
        
        // Try to load cart products saved from results page
        const savedCart = localStorage.getItem('cartProducts');
        if (savedCart) {
            try {
                const products = JSON.parse(savedCart);
                console.log('Loaded cart products from results:', products);
                this.cart = products.map(p => ({
                    id: p.id || this.generateId(),
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity || 1,
                    image: p.image,
                    description: this.getProductDescription(p.name),
                    rating: 4.9,
                    reviews: 100
                }));
                return; // Exit early if we loaded the cart
            } catch (e) {
                console.error('Error loading saved cart:', e);
            }
        }

        // Fallback to old method if no saved cart
        const stored = localStorage.getItem('recommendedProducts');
        if (stored) {
            this.recommendedProducts = JSON.parse(stored);
        } else {
            this.recommendedProducts = ['Gentle Cleanser', 'Koji Pads', 'Hydralipid'];
        }

        console.log('Cart initialized for segment:', this.segment);
    }

    getProductDescription(productName) {
        const descriptions = {
            'Gentle Foaming Cleanser': 'pH-balanced cleanser that maintains moisture barrier',
            'Brightening Pads': 'Targets melasma, sun damage, and uneven pigmentation',
            'Koji Clear Pads (60 ct)': 'Targets melasma, sun damage, and uneven pigmentation',
            'Hydralipid Moisturizer': 'Ceramides + complex lipids support barrier and restore plumpness',
            'HA Peptide Serum': 'Deep hydration with peptides for plump, youthful skin',
            'Forever Young Retinol 50': 'Advanced retinol for visible anti-aging results',
            'Clear & Calm Serum': 'Soothes redness and reduces inflammation',
            'BPO 2.5%': 'Fights acne-causing bacteria effectively'
        };
        return descriptions[productName] || 'Medical-grade skincare';
    }

    buildInitialCart() {
        // Add recommended products to cart
        this.recommendedProducts.forEach(productName => {
            // Map old names to new catalog names
            let catalogKey = productName;
            if (productName === 'Koji Pads') catalogKey = 'Koji Clear Pads';
            if (productName === 'Gentle Cleanser') catalogKey = 'Gentle Cleanser';
            
            const product = productCatalog[catalogKey];
            if (product) {
                this.cart.push({
                    ...product,
                    quantity: 1,
                    id: this.generateId()
                });
            }
        });
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    renderCart() {
        const cartContainer = document.getElementById('cartProducts');
        
        if (this.cart.length === 0) {
            cartContainer.innerHTML = this.renderEmptyCart();
            return;
        }

        const productsHTML = this.cart.map(item => this.renderCartItem(item)).join('');
        cartContainer.innerHTML = productsHTML;

        // Update subhead
        this.updateSubhead();
    }

    renderCartItem(item) {
        // Use the image path from the item if available, otherwise use a placeholder
        const imgSrc = item.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23F5F3F0" width="80" height="80"/%3E%3C/svg%3E';
        const rating = item.rating ? `<span class="cart-rating">${item.rating}★</span>` : '';
        const badge = item.badge ? `<span class="product-badge-small">${item.badge}</span>` : '';
        
        return `
            <div class="cart-product-item" data-id="${item.id}">
                <div class="product-thumbnail">
                    <img 
                        src="${imgSrc}" 
                        alt="${item.name}"
                        width="80"
                        height="80"
                        loading="lazy"
                    />
                </div>
                
                <div class="product-details">
                    <div class="product-name-cart">${item.name} ${rating}${badge}</div>
                    <p class="product-description-cart">${item.description}</p>
                </div>
                
                <div class="product-controls">
                    <div class="product-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-control">
                        <button class="qty-btn qty-decrease" data-id="${item.id}" ${item.quantity <= 1 ? 'disabled' : ''}>
                            −
                        </button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn qty-increase" data-id="${item.id}">
                            +
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderEmptyCart() {
        return `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add products to begin your clinical protocol.</p>
                <a href="index.html" class="btn btn-primary">Take Assessment</a>
            </div>
        `;
    }

    updateSubhead() {
        const subhead = document.getElementById('cartSubhead');
        const segmentDescriptions = {
            'melasma-sensitive': 'Hormonal pigmentation with sensitivity',
            'acne-pigmentation': 'Post-acne pigmentation with active breakouts',
            'sun-damage': 'Photoaging and sun-induced pigmentation',
            'general-pigmentation': 'Uneven pigmentation and melanin irregularities'
        };

        if (subhead) {
            subhead.textContent = `Based on your skin assessment: ${segmentDescriptions[this.segment]}`;
        }
    }

    attachEventListeners() {
        // Quantity controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('qty-decrease')) {
                const id = e.target.dataset.id;
                this.decreaseQuantity(id);
            }
            
            if (e.target.classList.contains('qty-increase')) {
                const id = e.target.dataset.id;
                this.increaseQuantity(id);
            }
        });

        // Upsell buttons
        const upsellButtons = document.querySelectorAll('.btn-add-upsell');
        upsellButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productKey = e.target.dataset.product;
                this.addUpsell(productKey, e.target);
            });
        });

        // Checkout buttons
        const checkoutBtn = document.getElementById('btnCheckout');
        const mobileCheckoutBtn = document.getElementById('btnMobileCheckout');

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.proceedToCheckout());
        }

        if (mobileCheckoutBtn) {
            mobileCheckoutBtn.addEventListener('click', () => this.proceedToCheckout());
        }
    }

    increaseQuantity(id) {
        const item = this.cart.find(i => i.id === id);
        if (item) {
            item.quantity++;
            this.renderCart();
            this.updateTotals();
            this.attachEventListeners(); // Re-attach after re-render
        }
    }

    decreaseQuantity(id) {
        const item = this.cart.find(i => i.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
            this.renderCart();
            this.updateTotals();
            this.attachEventListeners(); // Re-attach after re-render
        }
    }

    addUpsell(productKey, button) {
        // Map product keys to catalog names
        const productMap = {
            'silk-serum': 'Silk Serum',
            'ha-peptide': 'HA Peptide Serum'
        };

        const productName = productMap[productKey];
        const product = productCatalog[productName];

        if (!product) return;

        // Check if already in cart
        const existing = this.cart.find(item => item.name === product.name);
        if (existing) {
            existing.quantity++;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                id: this.generateId()
            });
        }

        // Update button state
        button.textContent = '✓ Added';
        button.classList.add('added');

        // Show success message
        this.showMessage(`${product.name} added to your protocol`);

        // Re-render and update
        this.renderCart();
        this.updateTotals();
        this.attachEventListeners();

        // Scroll to cart on mobile
        if (window.innerWidth <= 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    updateTotals() {
        const subtotal = this.cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        const total = subtotal; // Free shipping, no tax in this demo

        // Update desktop summary
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;

        // Update mobile summary
        const mobileTotal = document.getElementById('mobileTotal');
        if (mobileTotal) {
            mobileTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    showMessage(text) {
        // Create or update message element
        let messageEl = document.querySelector('.cart-message');
        
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'cart-message success';
            const productsColumn = document.querySelector('.cart-products-column');
            productsColumn.insertBefore(messageEl, productsColumn.firstChild);
        }

        messageEl.textContent = text;
        messageEl.style.display = 'block';

        // Auto-hide after 3 seconds
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }

    proceedToCheckout() {
        console.log('Proceeding to checkout with cart:', this.cart);

        // In production, this would:
        // 1. Create order in backend
        // 2. Redirect to Shopify/payment processor
        // 3. Track conversion event

        // For demo, store cart and redirect to success page
        localStorage.setItem('checkoutCart', JSON.stringify(this.cart));

        // Calculate totals for analytics
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Track checkout event
        this.trackCheckout(subtotal);

        // Redirect to RFA Skincare checkout
        window.location.href = 'https://rfaskincare.com/';
        
        // Track order summary for analytics
        console.log('Order Summary:', {
            segment: this.segment,
            products: this.cart,
            subtotal: subtotal,
            shipping: 0,
            total: subtotal
        });
    }

    trackCheckout(amount) {
        console.log('Checkout initiated:', {
            segment: this.segment,
            amount: amount,
            products: this.cart.length
        });

        // In production, send to analytics:
        // gtag('event', 'begin_checkout', {
        //     currency: 'USD',
        //     value: amount,
        //     items: this.cart
        // });
    }
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
});

// Track page view
window.addEventListener('load', () => {
    const segment = localStorage.getItem('userSegment') || 'general-pigmentation';
    console.log('Cart page viewed:', segment);
    
    // In production: gtag('event', 'view_cart', { segment: segment });
});
