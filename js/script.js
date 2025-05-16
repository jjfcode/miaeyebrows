// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically handle the form submission
        // For now, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.price').textContent;
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>${productName} added to cart</p>
                <p class="price">${productPrice}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
});

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add styles for cart notification
const style = document.createElement('style');
style.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #000;
        color: #fff;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content i {
        color: #4CAF50;
    }
    
    .notification-content .price {
        color: #fff;
        font-weight: bold;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Language switching functionality
function setLanguage(lang) {
    const html = document.documentElement;
    
    // Update the HTML lang attribute
    html.setAttribute('lang', lang);
    html.className = lang;
    
    // Update visibility of elements (except flags)
    document.querySelectorAll('.en:not(.flag-icon), .pt:not(.flag-icon)').forEach(el => {
        if (el.classList.contains(lang)) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });

    // Update opacity of flags
    document.querySelectorAll('.flag-icon').forEach(flag => {
        if (flag.classList.contains(lang)) {
            flag.style.opacity = '1';
        } else {
            flag.style.opacity = '0.5';
        }
    });
}

// Initialize language display on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    document.querySelectorAll('.en, .pt').forEach(el => {
        el.style.display = el.classList.contains(currentLang) ? '' : 'none';
    });
});

// Initialize language
document.documentElement.setAttribute('lang', 'en');