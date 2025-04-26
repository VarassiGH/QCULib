/**
 * Redirect to the home page
 */
function redirectToHome() {
    window.location.href = 'index.html'; // Redirects to the home page
}

/**
 * Redirect to the login page
 */
function redirectToLogin() {
    window.location.href = 'login.html'; // Redirects to the login page
}


// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Handle login type switching
    const loginTypeButtons = document.querySelectorAll('.login-type button');
    loginTypeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            loginTypeButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // You can customize the form based on the type if needed
            const loginType = this.getAttribute('data-type');
            console.log(`Switched to ${loginType} login`);

            // Example: Adjust form fields based on login type
            adjustFormFields(loginType);
        });
    });

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Here you would normally send a request to your server
        // For demo purposes, we'll just show an alert
        alert(`Login attempt with username: ${username}`);

        // Redirect to dashboard (this would normally happen after successful authentication)
        // window.location.href = 'dashboard.html';
    });

    // Handle header search
    window.performHeaderSearch = function () {
        const query = document.getElementById('header-search').value;
        alert(`Searching for: ${query}`);
    };

    // Handle home button click
    window.redirectToHome = function () {
        window.location.href = 'index.html';
    };
});

// Adjust form fields based on login type
function adjustFormFields(loginType) {
    // Example functionality - you can customize this based on requirements
    const usernameLabel = document.querySelector('label[for="username"]');

    switch (loginType) {
        case 'student':
            usernameLabel.textContent = 'Student ID';
            break;
        case 'faculty':
            usernameLabel.textContent = 'Faculty ID';
            break;
        case 'admin':
            usernameLabel.textContent = 'Admin Username';
            break;
    }
}
function redirectToSignup() {
    window.location.href = "signup.html";
}

