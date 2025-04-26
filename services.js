/**
 * Redirect to the login page
 */
function redirectToLogin() {
    window.location.href = 'login.html'; // Replace 'login.html' with the actual path to your login page
}
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
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');

            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation for service cards and steps
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

    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                alert('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});
