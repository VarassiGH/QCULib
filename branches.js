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

// DOM Elements
const branchSearch = document.getElementById('branch-search');
const filterAmenities = document.getElementById('filter-amenities');
const filterBtn = document.getElementById('filter-btn');
const branchCards = document.querySelectorAll('.branch-card');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Set up operating hours status
function updateBranchStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1-5 is Monday-Friday, 6 is Saturday
  const hour = now.getHours();
  
  branchCards.forEach(card => {
    const statusEl = card.querySelector('.branch-status');
    
    // Simplified logic - can be expanded based on actual operating hours
    if (day === 0) {
      // Sunday - all branches closed
      statusEl.textContent = 'Closed';
      statusEl.classList.remove('open');
      statusEl.classList.add('closed');
    } else if (day >= 1 && day <= 5) {
      // Monday-Friday
      if (hour >= 8 && hour < 18) {
        statusEl.textContent = 'Open Now';
        statusEl.classList.add('open');
        statusEl.classList.remove('closed');
      } else {
        statusEl.textContent = 'Closed';
        statusEl.classList.remove('open');
        statusEl.classList.add('closed');
      }
    } else if (day === 6) {
      // Saturday
      if (hour >= 9 && hour < 15) {
        statusEl.textContent = 'Open Now';
        statusEl.classList.add('open');
        statusEl.classList.remove('closed');
      } else {
        statusEl.textContent = 'Closed';
        statusEl.classList.remove('open');
        statusEl.classList.add('closed');
      }
    }
  });
}

// Filter branches based on search and amenities
function filterBranches() {
  const searchTerm = branchSearch.value.toLowerCase();
  const selectedAmenity = filterAmenities.value;
  
  branchCards.forEach(card => {
    const branchName = card.querySelector('h3').textContent.toLowerCase();
    const branchAmenities = card.dataset.amenities;
    
    const matchesSearch = branchName.includes(searchTerm);
    const matchesAmenity = !selectedAmenity || branchAmenities.includes(selectedAmenity);
    
    if (matchesSearch && matchesAmenity) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Event listeners for filtering
branchSearch.addEventListener('input', filterBranches);
filterBtn.addEventListener('click', filterBranches);
filterAmenities.addEventListener('change', filterBranches);

// View details button functionality
viewDetailsBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const branchName = this.closest('.branch-card').querySelector('h3').textContent;
    alert(`Viewing details for ${branchName}. This would navigate to a detailed page in a complete implementation.`);
    // In a real implementation, this would navigate to the branch detail page
    // window.location.href = `branch-detail.html?branch=${encodeURIComponent(branchName)}`;
  });
});

// Initialize map (placeholder for actual map implementation)
function initMap() {
  console.log('Map initialized');
  // This would typically use a mapping library like Google Maps or Leaflet
  // For example with Leaflet:
  // const map = L.map('branch-map').setView([14.6760, 121.0437], 12);
  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  // Add markers for each branch
}

// Run initialization functions
document.addEventListener('DOMContentLoaded', () => {
  updateBranchStatus();
  // initMap(); // Commented out as we're using a placeholder image instead
  
  // Update status every minute
  setInterval(updateBranchStatus, 60000);
});