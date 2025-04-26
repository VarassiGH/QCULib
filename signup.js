/**
 * Redirect to the login page
 */
function redirectToLogin() {
    window.location.href = 'login.html'; // Redirects to the login page
}

/**
 * Handle form submission
 */
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const formError = document.getElementById('form-error');

    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const studentId = document.getElementById('student-id').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validate form fields
            if (!fullName || !email || !studentId || !password || !confirmPassword) {
                formError.textContent = 'All fields are required.';
                formError.style.display = 'block';
                return;
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                formError.textContent = 'Passwords do not match.';
                formError.style.display = 'block';
                return;
            }

            // Simulate successful signup (replace with actual backend call)
            alert('Signup successful! Redirecting to login page...');
            window.location.href = 'login.html';
        });
    }
});

