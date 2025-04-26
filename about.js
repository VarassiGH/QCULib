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
/**
 * QCULib About Page JavaScript
 */
function redirectToLogin() {
    console.log('Redirecting to login page');
    window.location.href = 'login.html';
}
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
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }

                // Scroll to target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            // Show submission feedback
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual AJAX call in production)
            setTimeout(() => {
                // Show success message
                const formContainer = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for contacting us. We'll get back to you soon.</p>
                    <button class="reset-form-btn">Send Another Message</button>
                `;

                // Hide form and show success message
                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);

                // Reset form button
                const resetBtn = formContainer.querySelector('.reset-form-btn');
                if (resetBtn) {
                    resetBtn.addEventListener('click', function () {
                        contactForm.reset();
                        contactForm.style.display = 'flex';
                        successMessage.remove();
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    });
                }
            }, 1500);
        });
    }

    // Map button handler
    const mapBtn = document.querySelector('.map-btn');
    if (mapBtn) {
        mapBtn.addEventListener('click', function () {
            // Open map in a new tab/window
            // In a real implementation, this would open a Google Maps link
            alert('This would open a detailed map view in a real implementation.');
        });
    }

    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                // Simulate subscription (replace with actual AJAX call)
                const submitBtn = newsletterForm.querySelector('button');
                const originalHtml = submitBtn.innerHTML;

                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Show success feedback
                    const newsletterContainer = newsletterForm.parentElement;
                    newsletterForm.style.display = 'none';

                    const successMessage = document.createElement('div');
                    successMessage.className = 'subscription-success';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <p>Thank you for subscribing!</p>
                    `;

                    newsletterContainer.appendChild(successMessage);

                    // Reset after a delay
                    setTimeout(() => {
                        newsletterForm.reset();
                        newsletterForm.style.display = 'flex';
                        successMessage.remove();
                        submitBtn.innerHTML = originalHtml;
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }

    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        // Helper function to check if an element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // Add animation class when elements are in viewport
        function animateOnScroll() {
            timelineItems.forEach(item => {
                if (isInViewport(item) && !item.classList.contains('animated')) {
                    item.classList.add('animated');
                }
            });
        }

        // Initial check
        animateOnScroll();

        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

