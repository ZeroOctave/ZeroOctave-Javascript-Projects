function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const resetPasswordForm = document.querySelector("#resetPassword");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        resetPasswordForm.classList.add("form--hidden");
    });
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        resetPasswordForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
    document.querySelector("#linkResetPassword").addEventListener("click", e => {
        e.preventDefault();
        resetPasswordForm.classList.remove("form--hidden");
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
    document.querySelector("#linkHome").addEventListener("click", e => {
        e.preventDefault();
        resetPasswordForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });