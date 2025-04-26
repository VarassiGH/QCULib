
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
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            
            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/**
 * Initialize book carousel functionality
 */
function initCarousel() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const booksContainer = document.querySelector('.books-container');
    
    if (prevBtn && nextBtn && booksContainer) {
        let scrollAmount = 0;
        const bookCards = document.querySelectorAll('.book-card');
        const cardWidth = bookCards.length > 0 ? bookCards[0].offsetWidth + 24 : 0; // Adding gap value
        
        prevBtn.addEventListener('click', function() {
            scrollAmount = Math.max(scrollAmount - cardWidth, 0);
            scrollBooksContainer();
        });
        
        nextBtn.addEventListener('click', function() {
            const maxScroll = (bookCards.length - 4) * cardWidth;
            scrollAmount = Math.min(scrollAmount + cardWidth, maxScroll > 0 ? maxScroll : 0);
            scrollBooksContainer();
        });
        
        function scrollBooksContainer() {
            booksContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        
        // Adjust for responsive design
        window.addEventListener('resize', function() {
            const visibleCards = window.innerWidth < 768 ? 2 : 4;
            const maxScroll = (bookCards.length - visibleCards) * cardWidth;
            scrollAmount = Math.min(scrollAmount, maxScroll > 0 ? maxScroll : 0);
            scrollBooksContainer();
        });
    }
}

/**
 * Initialize animations for page elements
 */
function initAnimations() {
    // Add fade-in and slide-up animation to sections when scrolled into view
    const sections = document.querySelectorAll('section');
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('scroll-animation');
        observer.observe(section);
    });
    
    // Add hover animations for cards
    const cards = document.querySelectorAll('.announcement-card, .branch-card, .book-card, .service-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Initialize search functionality
 */
function initSearchFunctionality() {
    const searchInput = document.getElementById('header-search');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}
/**
 * Validate the search bar input
 */
function validateSearch() {
    const searchInput = document.getElementById('header-search').value.trim();
    const searchError = document.getElementById('search-error');

    if (!searchInput) {
        searchError.textContent = 'Please enter a search query.';
        searchError.style.display = 'block';
        return false; // Prevent form submission
    }

    searchError.style.display = 'none'; // Hide error if input is valid
    return true; // Allow form submission
}



/**
 * Perform search with given query
 * @param {string} query - Search query
 */
function performSearch(query) {
    if (query.trim() !== '') {
        console.log('Searching for:', query);
        // In a real implementation, this would redirect to a search results page
        window.location.href = `catalog.html?search=${encodeURIComponent(query)}`;
    }
}

/**
 * Redirect to login page
 */
function redirectToLogin() {
    console.log('Redirecting to login page');
    window.location.href = 'login.html';
}

/**
 * Redirect to catalog page
 */
function redirectToCatalog() {
    console.log('Redirecting to catalog page');
    window.location.href = 'catalog.html';
}

/**
 * Handle newsletter form submission
 * @param {Event} e - Form submit event
 */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    
    if (emailInput && emailInput.value.trim() !== '') {
        // In a real implementation, this would send the data to a server
        console.log('Newsletter subscription for:', emailInput.value);
        
        // Show success message
        const form = e.target;
        const successMsg = document.createElement('div');
        successMsg.classList.add('newsletter-success');
        successMsg.textContent = 'Thank you for subscribing!';
        
        form.innerHTML = '';
        form.appendChild(successMsg);
        
        // Reset after 3 seconds
        setTimeout(() => {
            form.innerHTML = `
                <input type="email" placeholder="Your email address">
                <button type="submit"><i class="fas fa-paper-plane"></i></button>
            `;
            initNewsletterForm();
        }, 3000);
    }
}

/**
 * Add animation classes to elements when in viewport
 */
function addScrollAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .scroll-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .scroll-animation.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Run additional initialization
addScrollAnimations();