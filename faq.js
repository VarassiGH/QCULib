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
// DOM Elements
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('show');
        });
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Category filtering
    const categoryTabs = document.querySelectorAll('.category-tab');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            // Filter items
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.getElementById('faq-search-input');
    const searchBtn = document.getElementById('faq-search-btn');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            // If search is empty, show all based on current category filter
            const activeCategory = document.querySelector('.category-tab.active').getAttribute('data-category');

            faqItems.forEach(item => {
                if (activeCategory === 'all' || item.getAttribute('data-category') === activeCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            return;
        }

        // Reset category tabs to "All"
        categoryTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-category') === 'all') {
                tab.classList.add('active');
            }
        });

        // Filter based on search term
        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();

            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
                // Expand the matching items
                item.classList.add('active');
            } else {
                item.style.display = 'none';
                item.classList.remove('active');
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll-based reveal animation
    function animateOnScroll() {
        const elements = document.querySelectorAll('.faq-item, .help-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            element.classList.add('pre-animation');
            observer.observe(element);
        });
    }

    // Add animation styles dynamically
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .pre-animation {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize animations
    addAnimationStyles();
    animateOnScroll();
});
