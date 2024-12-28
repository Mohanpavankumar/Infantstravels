const signupForm = document.getElementById("signup-form");
const signupUsername = document.getElementById("username");
const signupEmail = document.getElementById("email");
const signupPassword = document.getElementById("password");
const signupPassword2 = document.getElementById("password2");

// Utility functions
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "signup-form-control error";
    const small = formControl.querySelector("small");
    if (small) small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "signup-form-control success";
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function checkPasswordsMatch(password, password2) {
    return password === password2;
}

// Store user data in localStorage
function storeUserData(username, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("Email is already registered. Please login.");
        return false;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}

// Form submission event
signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameValue = signupUsername.value.trim();
    const emailValue = signupEmail.value.trim();
    const passwordValue = signupPassword.value.trim();
    const password2Value = signupPassword2.value.trim();

    // Validation
    if (!usernameValue || !emailValue || !passwordValue || !password2Value) {
        alert("All fields are required.");
        return;
    }

    if (!validateEmail(emailValue)) {
        alert("Invalid email format.");
        return;
    }

    if (!checkPasswordsMatch(passwordValue, password2Value)) {
        alert("Passwords do not match.");
        return;
    }

    // Store user data
    if (storeUserData(usernameValue, emailValue, passwordValue)) {
        alert("Signup successful! Redirecting to login page...");
        window.location.href = "login.html";
    }
});
