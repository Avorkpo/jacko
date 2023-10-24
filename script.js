document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const loginLink = document.getElementById("loginLink");
    signupForm.classList.add("visible");
    loginForm.classList.remove("visible");
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = signupForm.querySelector("input[type='text']").value;
        const password = signupForm.querySelector("input[type='password']").value;

        // Storing user data in Local Storage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        alert("Signup successful! Now you can log in.");
        showLoginForm();
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = loginForm.querySelector("input[type='text']").value;
        const password = loginForm.querySelector("input[type='password']").value;

        // Retrieving user data from Local Storage
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (username === storedUsername && password === storedPassword) {
            alert("Login successful!");
            // Redirecting to the dashboard or any other page
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });

    loginLink.addEventListener("click", function(event) {
        event.preventDefault();
        showLoginForm();
    });

    function showLoginForm() {
        loginForm.classList.add("visible");
        signupForm.classList.remove("visible");
    }
});
