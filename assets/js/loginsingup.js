document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');

    // Function to validate username and password
    function validateCredentials(username, password) {
        return users.some(user => 
            user.username === username && user.password === password
        );
    }

    // Function to check email uniqueness
    function isEmailUnique(email) {
        return !users.some(user => user.email === email);
    }

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.children[0].classList.remove('bi-eye-slash');
                this.children[0].classList.add('bi-eye');
            } else {
                passwordField.type = 'password';
                this.children[0].classList.remove('bi-eye');
                this.children[0].classList.add('bi-eye-slash');
            }
        });
    });

    // Form submission handler
   let loginForm= document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (validateCredentials(username, password)) {
            // Redirect to dashboard
            window.location.href = "MainProfile.html";
            loginForm.reset()
        } else {
            showMessage("Invalid username or password", "danger");
        }
    });

    // Signup form submission handler
    let singUpForm =  document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newEmail = document.getElementById('newEmail').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!isEmailUnique(newEmail)) {
            showMessage("Email already exists", "danger");
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage("Passwords do not match", "danger");
            return;
        }

        const newUser = { username: newUsername, email: newEmail, password: newPassword };
        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));
        
        // Show signup success modal
        var myModal = new bootstrap.Modal(document.getElementById('signupSuccessModal'));
        myModal.show();

        // Switch to login form after modal closes
        document.getElementById('signupSuccessModal').addEventListener('hidden.bs.modal', function() {
            toggleForms('#loginForm');
        });
        e.reset()
    });

    // Show message function
    function showMessage(message, type) {
        const messageDiv = document.getElementById('message');
        messageDiv.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 5000);
    }

    // Function to toggle between forms
    function toggleForms(targetId) {
        currentForm.style.display = 'none';
        currentForm = document.querySelector(targetId);
        currentForm.style.display = 'block';
    }

    // Add event listener to switch between forms
    document.querySelectorAll('.btn-switch').forEach(button => {
        button.addEventListener('click', function() {
            toggleForms(this.dataset.target);
        });
    });

    // Initial form setup
    document.getElementById('signupForm').style.display = 'none';
});
