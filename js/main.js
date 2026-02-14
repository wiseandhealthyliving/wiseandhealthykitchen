// Kitchen Pro - Main JavaScript
// Enhanced user interactions and features

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Back to Top Button =====
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });

        // ===== Search Form Handler =====
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input').value;
            if (query.trim()) {
                console.log('Searching for:', query);
                // Redirect to a search page or filter products
                // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                alert('Searching for: ' + query + '. (Search results page coming soon!)');
            }
        });
    }

    
    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== Card Hover Effects =====
    const productCards = document.querySelectorAll('.product-card, .blog-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
    
    // ===== Carousel Auto-pause on Hover =====
    const carousel = document.querySelector('#heroCarousel');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
        
        carousel.addEventListener('mouseenter', function() {
            carouselInstance.pause();
        });
        
        carousel.addEventListener('mouseleave', function() {
            carouselInstance.cycle();
        });
    }
    
    // ===== Form Validation Enhancement =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
    
    // ===== Lazy Loading for Images (when you add real images) =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===== Animate Elements on Scroll =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.product-card, .blog-card, section').forEach(el => {
        observer.observe(el);
    });
    
    // ===== Dynamic Year in Footer =====
    const yearElement = document.querySelector('.footer p');
    if (yearElement && yearElement.textContent.includes('2026')) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2026', currentYear);
    }
    
    // ===== Newsletter Form Handler =====
    const newsletterForm = document.querySelector('.newsletter-section form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                // You can add your email service integration here
                alert('Thank you for subscribing! We\'ll send you the latest updates.');
                emailInput.value = '';
            }
        });
    }
    
    // ===== Product Card Click Tracking (for analytics) =====
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const productName = this.querySelector('.card-title').textContent;
                console.log('Product viewed:', productName);
                // You can add Google Analytics or other tracking here
            }
        });
    });
    
    // ===== Mobile Menu Close on Link Click (FIXED) =====
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if this is a dropdown toggle
            const isDropdown = this.classList.contains('dropdown-toggle');
            
            // Only close the menu if:
            // 1. We are on mobile (< 992px)
            // 2. The menu is currently open ('show')
            // 3. It is NOT a dropdown toggle
            if (window.innerWidth < 992 && 
                navbarCollapse.classList.contains('show') && 
                !isDropdown) {
                
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    
    // ===== Performance: Defer Non-Critical CSS =====
    const deferStyles = document.createElement('link');
    deferStyles.rel = 'stylesheet';
    deferStyles.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
    document.head.appendChild(deferStyles);
    
    // ===== Console Message =====
    console.log('%c Kitchen Pro Reviews ', 'background: #2563eb; color: white; font-size: 16px; padding: 10px; font-weight: bold;');
    console.log('Website loaded successfully! 🔥');
});

// ===== Utility Functions =====

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

