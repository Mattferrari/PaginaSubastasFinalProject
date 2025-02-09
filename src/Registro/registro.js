const contrasena1 = document.getElementById("password");
const confirmation = document.getElementById("confirmation");
const alertDiv = document.querySelector(".PasswordRegistrationAlert");
const lengthAlertDiv = document.querySelector(".PasswordLengthAlert");
const minimumLen = 8

const dateField = document.getElementById("datebirth");
const cityInput = document.getElementById('city-input');
const citySuggestions = document.getElementById('city-suggestions');

// const comunidades = [
//     "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria", "Castilla y León", 
//     "Castilla-La Mancha", "Cataluña", "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", 
//     "La Rioja", "País Vasco", "Valencia", "Ceuta", "Melilla"
//   ];



// registerButton.addEventListener('click', () => {
// registerModal.style.display = 'flex';
// const comunidadesSelect = document.getElementById('comunidades');

// // Llenar el desplegable dinámicamente
// if (comunidadesSelect.options.length === 1) {
//     comunidades.forEach(comunidad => {
//     const option = document.createElement('option');
//     option.value = comunidad;
//     option.textContent = comunidad;
//     comunidadesSelect.appendChild(option);
//     });
// }
// });

// // Cerrar modal de registro
// closeRegister.addEventListener('click', () => {
//     registerModal.style.display = 'none';
//   });

//   // Limpiar campos del formulario de registro
//   clearRegisterFields.addEventListener('click', () => {
//     document.getElementById('username').value = '';
//     document.getElementById('email').value = '';
//     document.getElementById('comunidades').value = '';
//   });

//   // Cerrar modal al hacer clic fuera de él
//   window.addEventListener('click', (e) => {
//     if (e.target === registerModal) {
//       registerModal.style.display = 'none';
//     }
//   });

document.getElementById('comunidad').addEventListener('click', function() {
    const comunidades = [
        "Andalucía", "Cataluña", "Madrid", "Galicia", "Castilla y León", "Valencia", 
        "Castilla-La Mancha", "País Vasco", "Canarias", "Aragón", "Murcia", "Extremadura", 
        "Cantabria", "La Rioja", "Baleares", "Navarra", "País Valenciano", "Ceuta", "Melilla"
    ];

    const select = document.getElementById('comunidad');

    // Limpia las opciones previas

    // Añade las nuevas opciones
    comunidades.forEach(comunidad => {
        const option = document.createElement('option');
        option.value = comunidad;
        option.textContent = comunidad;
        select.appendChild(option);
    });
    });

  // Para almacenar el valor seleccionado
document.getElementById('comunidad').addEventListener('change', function() {
    const selectedValue = this.value;
    console.log("Comunidad seleccionada: ", selectedValue);
    // Si necesitas hacer algo con el valor seleccionado, como enviarlo o mostrarlo, lo puedes hacer aquí.
    });



// stablish max date to register:
// forbidden under the age of 18
const today = new Date();
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
dateField.setAttribute('max', maxDate);
dateField.setAttribute('min',minDate);


/**
 * Returns a boolean that validates if both password and confirmation are equal.
 * @returns {boolean}
 */
async function ValidatePasswordConsistency() {
    if(contrasena1.value === confirmation.value || confirmation.value.length === 0){
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
    contrasena1.addEventListener('input', ValidatePasswordConsistency);
    confirmation.addEventListener('input', validatePasswordLength);
    confirmation.addEventListener('input', ValidatePasswordConsistency);
});