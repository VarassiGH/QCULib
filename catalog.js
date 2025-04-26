/**
 * Redirect to the login page
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const searchInput = document.getElementById('header-search');
    const popup = document.getElementById('validation-popup');
    const popupMessage = popup.querySelector('.popup-message');
    const popupClose = popup.querySelector('.popup-close');

    // Show popup with message
    const showPopup = (message) => {
        popupMessage.textContent = message;
        popup.classList.add('show');

        // Auto hide after 4 seconds
        setTimeout(() => {
            hidePopup();
        }, 4000);
    };

    // Hide popup
    const hidePopup = () => {
        popup.classList.remove('show');
    };

    // Close button event
    popupClose.addEventListener('click', hidePopup);

    // Validate the input
    const validateInput = () => {
        const value = searchInput.value.trim();

        // Check if empty
        if (!value) {
            showPopup('Please enter a search term');
            return false;
        }

        // Check minimum length
        if (value.length < 3) {
            showPopup('Search term must be at least 3 characters');
            return false;
        }

        return true;
    };

    // Handle form submission
    form.addEventListener('submit', (e) => {
        if (!validateInput()) {
            e.preventDefault();
            searchInput.focus();
        }
    });
});
function redirectToLogin() {
    window.location.href = 'login.html'; // Replace 'login.html' with the actual path to your login page
}
function performHeaderSearch() {
    const query = document.getElementById('header-search').value;
    alert(`Searching for: ${query}`);
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

// Main services.js file for QCULib Services Page

// Header Search Functionality
function performHeaderSearch() {
    const query = document.getElementById('header-search').value.trim();

    if (query === '') {
        showNotification('Please enter a search term', 'warning');
        return;
    }

    // Here you would typically redirect to a search results page
    // For demonstration, we'll show a notification
    showNotification(`Searching for: "${query}"`, 'info');

    // Redirect to search page (uncomment when search page is available)
    // window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
}

// Login Redirection
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Create icon based on notification type
    let icon;
    switch (type) {
        case 'success':
            icon = 'fa-check-circle';
            break;
        case 'warning':
            icon = 'fa-exclamation-triangle';
            break;
        case 'error':
            icon = 'fa-times-circle';
            break;
        default:
            icon = 'fa-info-circle';
    }

    // Set notification content
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// Testimonials Slider
let currentSlide = 0;
const testimonialSlider = document.querySelector('.testimonials-slider');
const testimonialCards = document.querySelectorAll('.testimonial-card');

function setupTestimonialSlider() {
    if (!testimonialSlider || testimonialCards.length === 0) return;

    // Add navigation buttons
    const sliderContainer = testimonialSlider.parentElement;

    const navButtons = document.createElement('div');
    navButtons.className = 'slider-navigation';
    navButtons.innerHTML = `
        <button class="slider-prev" onclick="changeSlide(-1)"><i class="fas fa-chevron-left"></i></button>
        <div class="slider-dots"></div>
        <button class="slider-next" onclick="changeSlide(1)"><i class="fas fa-chevron-right"></i></button>
    `;
    sliderContainer.appendChild(navButtons);

    // Create dots for each slide
    const dotsContainer = document.querySelector('.slider-dots');
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    // Initialize auto-sliding
    startAutoSlide();
}

function changeSlide(direction) {
    stopAutoSlide();

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = testimonialCards.length - 1;
    } else if (currentSlide >= testimonialCards.length) {
        currentSlide = 0;
    }

    updateSlider();
    startAutoSlide();
}

function goToSlide(index) {
    stopAutoSlide();
    currentSlide = index;
    updateSlider();
    startAutoSlide();
}

function updateSlider() {
    // Get card width including margin
    const cardWidth = testimonialCards[0].offsetWidth +
        parseInt(window.getComputedStyle(testimonialCards[0]).marginRight);

    // Scroll to current slide
    testimonialSlider.scrollTo({
        left: currentSlide * cardWidth,
        behavior: 'smooth'
    });

    // Update dots
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        updateSlider();
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Smooth scrolling for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .step-item, .testimonial-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(element => {
        element.classList.add('will-animate');
        observer.observe(element);
    });
}

// Responsive menu handler
function setupMobileMenu() {
    const nav = document.querySelector('nav');

    // Create mobile menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');

    // Insert before the nav links
    const navContainer = document.querySelector('.nav-container');
    navContainer.insertBefore(menuToggle, navContainer.firstChild);

    // Add event listener
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-menu-open');
        menuToggle.innerHTML = nav.classList.contains('mobile-menu-open') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('mobile-menu-open') &&
            !nav.contains(e.target) &&
            e.target !== menuToggle) {
            nav.classList.remove('mobile-menu-open');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Service card hover effects enhancement
function enhanceServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle animation to icon
            const icon = card.querySelector('.service-icon');
            icon.classList.add('pulse');

            // Highlight this card and dim others
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.add('dimmed');
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            // Remove animation from icon
            const icon = card.querySelector('.service-icon');
            icon.classList.remove('pulse');

            // Restore all cards
            serviceCards.forEach(otherCard => {
                otherCard.classList.remove('dimmed');
            });
        });
    });
}

// Newsletter subscription (placeholder)
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email === '') {
                showNotification('Please enter your email address', 'warning');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'warning');
                return;
            }

            // Here you would typically send this to a server
            // For demonstration, we'll just show a success message
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Add CSS for JavaScript-created elements
function addDynamicStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            background-color: #f8f9fa;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            max-width: 350px;
            animation: slideIn 0.3s ease;
        }
        
        .notification.info {
            border-left: 4px solid #2196F3;
        }
        
        .notification.success {
            border-left: 4px solid #4CAF50;
        }
        
        .notification.warning {
            border-left: 4px solid #FFC107;
        }
        
        .notification.error {
            border-left: 4px solid #F44336;
        }
        
        .notification i:first-child {
            font-size: 20px;
        }
        
        .notification.info i:first-child {
            color: #2196F3;
        }
        
        .notification.success i:first-child {
            color: #4CAF50;
        }
        
        .notification.warning i:first-child {
            color: #FFC107;
        }
        
        .notification.error i:first-child {
            color: #F44336;
        }
        
        .notification span {
            flex: 1;
        }
        
        .notification button {
            background: none;
            border: none;
            cursor: pointer;
            color: #777;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            transition: all 0.2s;
        }
        
        .notification button:hover {
            background-color: rgba(0, 0, 0, 0.05);
            color: #333;
        }
        
        .fade-out {
            animation: fadeOut 0.5s ease forwards;
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
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        /* Slider Navigation Styles */
        .slider-navigation {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 2rem;
            gap: 1rem;
        }
        
        .slider-prev, 
        .slider-next {
            background-color: white;
            border: 1px solid #e1e1e1;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .slider-prev:hover, 
        .slider-next:hover {
            background-color: #004e98;
            color: white;
            border-color: #004e98;
        }
        
        .slider-dots {
            display: flex;
            gap: 8px;
        }
        
        .slider-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #e1e1e1;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .slider-dot.active {
            background-color: #004e98;
            transform: scale(1.2);
        }
        
        /* Animation classes */
        .will-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Icon animation */
        .pulse {
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .dimmed {
            opacity: 0.6;
        }
        
        /* Mobile Menu Styles */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #004e98;
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
                margin-right: 1rem;
            }
            
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 100;
            }
            
            .mobile-menu-open .nav-links {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-links li {
                margin: 0.5rem 0;
            }
        }
    `;

    document.head.appendChild(styleElement);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    addDynamicStyles();
    setupTestimonialSlider();
    setupSmoothScroll();
    setupScrollAnimations();
    setupMobileMenu();
    enhanceServiceCards();
    setupNewsletterForm();

    // Add keyboard accessibility for search
    const searchInput = document.getElementById('header-search');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performHeaderSearch();
            }
        });
    }
});