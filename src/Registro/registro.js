const contrasena1 = document.getElementById("password");
const confirmation = document.getElementById("confirmation");
const alertDiv = document.querySelector(".PasswordRegistrationAlert");
const lengthAlertDiv = document.querySelector(".PasswordLengthAlert");
const minimumLen = 8


/**
 * Returns a boolean that validates if both password and confirmation are equal.
 * This code will be only checked on submit to avoid security issues.
 * @returns {boolean}
 */
async function ValidatePasswordConsistency() {
    if(contrasena1.value === confirmation.value){
        confirmation.classList.remove("error")
        alertDiv.classList.add("hidden")
        return true
    }
    else{
        confirmation.classList.add("error")
        alertDiv.classList.remove("hidden")
        return false
    }
}


/**
 * Function to validate password length in real-time.
 * @param {Event} event - The input event.
 * @returns {boolean} - The result
 */
async function validatePasswordLength(event) {
    const passwordField = event.target;
    if (passwordField.value.length >= minimumLen || passwordField.value.length === 0) {
        passwordField.classList.remove("error");
        lengthAlertDiv.classList.add("hidden");
        return true
    } else {
        passwordField.classList.add("error");
        lengthAlertDiv.classList.remove("hidden")
        return false
    }
}

/**
 * Function to validate passwords and update the style of the input fields.
 * @param {event}
 */
async function validatePasswords(event) {
    event.preventDefault();
    const isConsistent = await ValidatePasswordConsistency();
    /** la forma de convertir las contraseñas en eventos: { target: contrasena1 } se resolvió mediante el uso de IA*/
    const isLenOk1 = await validatePasswordLength({ target: contrasena1 }); 
    const isLenOk2 = await validatePasswordLength({ target: confirmation });

    if (isConsistent && isLenOk1 && isLenOk2) {
        event.target.submit();
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    form.onsubmit = validatePasswords;

    contrasena1.addEventListener('input', validatePasswordLength);
    confirmation.addEventListener('input', validatePasswordLength);
});