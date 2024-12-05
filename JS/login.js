const form = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "login-form-control error";
    const small = formControl.querySelector("small");
    if (small) small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "login-form-control success";
}

function validateEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, "Invalid email format");
        return false;
    }
}

function validateLogin(email, password) {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((user) => user.email === email);

    if (user && user.password === password) {
        return true;
    } else {
        return false;
    }
}

// Event listener for form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return;
    }

    if (validateLogin(email, password)) {
        window.location.href = "home.html"; // Redirect to home if login is successful
    } else {
        alert("Invalid email or password.");
    }
});
