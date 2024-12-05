const form = document.getElementById("signup-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "signup-form-control error";
    const small = formControl.querySelector("small");
    if (small) small.innerText = message; // Ensure small exists
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "signup-form-control success";
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, "Email is not valid");
        return false;
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputs) {
    let allValid = true;
    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required`);
            allValid = false;
        } else {
            showSuccess(input);
        }
    });
    return allValid;
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkPasswordMatch(password1, password2) {
    if (password1.value !== password2.value) {
        showError(password2, "Passwords do not match");
        return false;
    } else {
        showSuccess(password2);
        return true;
    }
}

// Centralized form validation
function validateForm() {
    const isRequiredValid = checkRequired([username, email, password, password2]);
    const isUsernameValid = checkLength(username, 3, 15);
    const isPasswordValid = checkLength(password, 6, 20);
    const isEmailValid = checkEmail(email);
    const isPasswordMatchValid = checkPasswordMatch(password, password2);

    return isRequiredValid && isUsernameValid && isPasswordValid && isEmailValid && isPasswordMatchValid;
}

function storeUserData(username, email, password) {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        alert("Email is already registered. Please login.");
        return false;
    }

    // Add new user
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}

// Submit event listener in signup.js
form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (storeUserData(usernameValue, emailValue, passwordValue)) {
            alert("Signup successful! Redirecting to login page...");
            window.location.href = "login.html"; // Redirect to login page
        }
    }
});
