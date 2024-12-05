// login.js
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Authenticate user
function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email);

    return user && user.password === password;
}

// Form submission event
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value.trim();

    // Validate email and password
    if (!emailValue || !passwordValue) {
        alert("Both fields are required.");
        return;
    }

    if (!validateEmail(emailValue)) {
        alert("Invalid email format.");
        return;
    }

    // Authenticate user
    if (authenticateUser(emailValue, passwordValue)) {
        alert("Login successful!");
        window.location.href = "home.html"; // Redirect to the home page
    } else {
        alert("Invalid email or password.");
    }
});
