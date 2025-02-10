// document.addEventListener("DOMContentLoaded", function() {
//     const regexCorreo = /^[0-9]{9}@alu\.comillas\.edu$/;
//     const formulario = document.getElementById('Formulario');
//     const emailInput = document.getElementById('email');
//     const nameInput = document.getElementById('name');
//     const surnameInput = document.getElementById('Surname');
//     const dniInput = document.getElementById('DNI');
//     const passwordInput = document.getElementById('password');
//     const confirmationInput = document.getElementById('confirmation');
//     const usernameInput = document.getElementById('username');

//     if (!formulario) return;

//     formulario.addEventListener('submit', function(e) {
//         // Restablecer todos los mensajes de error
//         emailInput.setCustomValidity("");
//         nameInput.setCustomValidity("");
//         surnameInput.setCustomValidity("");
//         dniInput.setCustomValidity("");
//         passwordInput.setCustomValidity("");
//         confirmationInput.setCustomValidity("");
//         usernameInput.setCustomValidity("");

        

//         // Validación del nombre
//         if (!nameInput.value.trim()) {
//             nameInput.setCustomValidity("El nombre es un campo obligatorio.");
//         }

//         // Validación del apellido
//         if (!surnameInput.value.trim()) {
//             surnameInput.setCustomValidity("El apellido es un campo obligatorio.");
//         }

//         // Validación del DNI/NIE
//         if (!dniInput.value.trim()) {
//             dniInput.setCustomValidity("El DNI/NIE es un campo obligatorio.");
//         }

//         // Validación del correo electrónico
//         if (!regexCorreo.test(emailInput.value)) {
//             emailInput.setCustomValidity("Por favor, introduce un correo válido de la Universidad (Ej: 123456789@alu.comillas.edu).");
//         }

//         // Validación del nombre de usuario
//         if (!usernameInput.value.trim()) {
//             usernameInput.setCustomValidity("El nombre de usuario es un campo obligatorio.");
//         }

//         // Validación de la contraseña
//         if (passwordInput.value.length < 8) {
//             passwordInput.setCustomValidity("La contraseña debe tener al menos 8 caracteres.");
//         }

//         // Validación de la confirmación de contraseña
//         if (confirmationInput.value !== passwordInput.value) {
//             confirmationInput.setCustomValidity("Las contraseñas no coinciden.");
//         }

//         // Si hay algún mensaje de error, mostramos la alerta y evitamos el envío
//         if (!formulario.checkValidity()) {
//             e.preventDefault(); // Evita el envío del formulario
//             emailInput.reportValidity();
//             nameInput.reportValidity();
//             surnameInput.reportValidity();
//             dniInput.reportValidity();
//             passwordInput.reportValidity();
//             confirmationInput.reportValidity();
//             usernameInput.reportValidity();
//         }
//     });
// });

// birth
const dateField = document.getElementById("datebirth");
// stablish max date to register:
// forbidden under the age of 18
const today = new Date();
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
dateField.setAttribute('max', maxDate);
dateField.setAttribute('min',minDate);

// comunidad autonoma
document.getElementById('comunidad').addEventListener('click', function() {
    const comunidades = [
        "Andalucía", "Cataluña", "Madrid", "Galicia", "Castilla y León", "Valencia", 
        "Castilla-La Mancha", "País Vasco", "Canarias", "Aragón", "Murcia", "Extremadura", 
        "Cantabria", "La Rioja", "Baleares", "Navarra", "País Valenciano", "Ceuta", "Melilla"
    ];

    const select = document.getElementById('comunidad');


    // Añade las nuevas opciones
    comunidades.forEach(comunidad => {
        const option = document.createElement('option');
        option.value = comunidad;
        option.textContent = comunidad;
        select.appendChild(option);
    });
    });
document.getElementById('comunidad').addEventListener('change', function() {
    const selectedComunidad = this.value;
    const selectCiudad = document.getElementById('ciudad');
    
    
    if (selectedComunidad !== "") {
        // Habilita el desplegable de ciudades
        selectCiudad.disabled = false;
        
        // Añade las ciudades correspondientes a la comunidad seleccionada
        ciudades[selectedComunidad].forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad;
        option.textContent = ciudad;
        selectCiudad.appendChild(option);
        });
    } else {
        // Si no se selecciona una comunidad, deshabilita el campo ciudad
        selectCiudad.disabled = true;
    }
    });

// city
const cityInput = document.getElementById('city-input');
const citySuggestions = document.getElementById('city-suggestions');
const ciudades = {
    "Andalucía": ["Sevilla", "Granada", "Málaga", "Córdoba", "Cádiz"],
    "Cataluña": ["Barcelona", "Tarragona", "Girona", "Lleida"],
    "Madrid": ["Madrid", "Alcalá de Henares", "Getafe"],
    "Galicia": ["Santiago de Compostela", "A Coruña", "Vigo", "Lugo"],
    "Castilla y León": ["Valladolid", "León", "Burgos", "Salamanca"],
    "Valencia": ["Valencia", "Alicante", "Castellón"],
    "Castilla-La Mancha": ["Toledo", "Albacete", "Cuenca"],
    "País Vasco": ["Bilbao", "San Sebastián", "Vitoria"],
    "Canarias": ["Las Palmas", "Santa Cruz de Tenerife"],
    "Aragón": ["Zaragoza", "Huesca", "Teruel"],
    "Murcia": ["Murcia", "Cartagena"],
    "Extremadura": ["Mérida", "Badajoz", "Cáceres"],
    "Cantabria": ["Santander", "Torrelavega"],
    "La Rioja": ["Logroño", "Calahorra"],
    "Baleares": ["Palma de Mallorca", "Ibiza", "Menorca"],
    "Navarra": ["Pamplona", "Tudela"],
    "País Valenciano": ["Valencia", "Alicante", "Castellón"],
    "Ceuta": ["Ceuta"],
    "Melilla": ["Melilla"]
  };

// username
const username = document.getElementById("")

// contraseña
const contrasena1 = document.getElementById("password");

// confirmation
const confirmation = document.getElementById("confirmation");
const alertDiv = document.querySelector(".PasswordRegistrationAlert");
const lengthAlertDiv = document.querySelector(".PasswordLengthAlert");
const minimumLen = 8


let originalHeight = 900;
let expandedConsistency = false;
let expandedLength = false;

/**
 * Returns a boolean that validates if both password and confirmation are equal.
 * @returns {boolean}
 */
async function ValidatePasswordConsistency() {
    const formulario = document.querySelector(".FormDiv");

    if (!formulario) return;
    if(contrasena1.value === confirmation.value || confirmation.value.length === 0){
        confirmation.classList.remove("error")
        alertDiv.classList.add("hidden")
        if (expandedConsistency) {
            expandedConsistency = false
            originalHeight = originalHeight - 50
            formulario.style.height = (originalHeight) + "px"
        }
        return true
    }
    else{
        confirmation.classList.add("error")
        alertDiv.classList.remove("hidden")
        if (!expandedConsistency) {
            originalHeight = originalHeight + 50
            formulario.style.height = (originalHeight) + "px"
            expandedConsistency = true
        }
        
        return false
    }
}


/**
 * Function to validate password length in real-time.
 * @param {Event} event - The input event.
 * @returns {boolean} - The result
 */
async function validatePasswordLength(event) {
    const formulario = document.querySelector(".FormDiv");
    const passwordField = event.target;
    if (passwordField.value.length >= minimumLen || passwordField.value.length === 0) {
        passwordField.classList.remove("error");
        lengthAlertDiv.classList.add("hidden");
        if (expandedLength) {
            expandedLength = false
            originalHeight = originalHeight - 50 
            formulario.style.height = (originalHeight) + "px"
        }
        return true
    } else {
        passwordField.classList.add("error");
        lengthAlertDiv.classList.remove("hidden")
        if (!expandedLength) {
            originalHeight = originalHeight + 50
            expandedLength = true
            formulario.style.height = (originalHeight) + "px"
        }
        
        return false
    }
}

/**
 * Function to validate passwords and update the style of the input fields.
 * @param {event}
 */
async function validatePasswords(event) {
    const isConsistent = await ValidatePasswordConsistency();
    const isLenOk1 = await validatePasswordLength({ target: contrasena1 }); 
    const isLenOk2 = await validatePasswordLength({ target: confirmation });
    return isConsistent && isLenOk1 && isLenOk2
}

/**
 * @param {event}
 */
async function validaterequirements(event) {
    event.preventDefault(); // Evita el envío del formulario hasta validar todo

    // Obtener los elementos del formulario
    const regexCorreo = /^[0-9]{9}@alu\.comillas\.edu$/;
    const emailInput = document.getElementById('email');
    const name = document.getElementById("name");
    const surname = document.getElementById("Surname");
    const DNI = document.getElementById("DNI");
    const username = document.getElementById("username"); // Agregado
    const contrasena1 = document.getElementById("password");
    const confirmation = document.getElementById("confirmation");

    // Restablecer mensajes de error antes de validar
    name.setCustomValidity("");
    surname.setCustomValidity("");
    DNI.setCustomValidity("");
    emailInput.setCustomValidity("");
    username.setCustomValidity("");
    contrasena1.setCustomValidity("");
    confirmation.setCustomValidity("");

    // Restablecer los placeholders y quitar clase de error
    name.placeholder = "Introduce tu nombre";
    surname.placeholder = "Introduce tu apellido";
    DNI.placeholder = "Introduce tu DNI/NIE";
    emailInput.placeholder = "correo@alu.comillas.edu";
    username.placeholder = "Elige tu nombre de usuario";
    contrasena1.placeholder = "Contraseña (mínimo 8 caracteres)";
    confirmation.placeholder = "Confirma tu contraseña";
    
    name.classList.remove("error");
    surname.classList.remove("error");
    DNI.classList.remove("error");
    emailInput.classList.remove("error");
    username.classList.remove("error");
    contrasena1.classList.remove("error");
    confirmation.classList.remove("error");

    // Validar contraseñas (suponiendo que esta función devuelve `false` si son inválidas)
    const passwordsok = validatePasswords(event);
    if (!passwordsok) {
        return; // Detiene la validación si las contraseñas no coinciden
    }

    // Validaciones individuales
    if (!name.value.trim()) {
        name.setCustomValidity("El nombre es un campo obligatorio.");
        name.placeholder = "***Nombre es obligatorio***";
        name.classList.add("error"); // Añadir clase de error
    }
    if (!surname.value.trim()) {
        surname.setCustomValidity("El apellido es un campo obligatorio.");
        surname.placeholder = "***Apellido es obligatorio***";
        surname.classList.add("error");
    }
    if (!DNI.value.trim()) {
        DNI.setCustomValidity("El DNI es un campo obligatorio.");
        DNI.placeholder = "***DNI/NIE es obligatorio***";
        DNI.classList.add("error");
    }
    if (!regexCorreo.test(emailInput.value)) {
        emailInput.setCustomValidity("Por favor, introduce un correo válido de la Universidad (Ej: 123456789@alu.comillas.edu).");
        emailInput.placeholder = "***ej: 123456789@alu.comillas.edu***";
        emailInput.classList.add("error");
    }
    if (!username.value.trim()) {
        username.setCustomValidity("El nombre de usuario es un campo obligatorio.");
        username.placeholder = "***Nombre de usuario es obligatorio***";
        username.classList.add("error");
    }
    if (!confirmation.value.trim()) {
        confirmation.setCustomValidity("La confirmación de contraseña es un campo obligatorio.");
        confirmation.placeholder = "***Confirmación de contraseña es obligatoria***";
        confirmation.classList.add("error");
    }
    if (!contrasena1.value.trim()) {
        contrasena1.setCustomValidity("La contraseña es un campo obligatorio.");
        contrasena1.placeholder = "***Contraseña es obligatoria***";
        contrasena1.classList.add("error");
    }

    // Verificar si hay algún error
    if (!event.target.checkValidity()) {
        event.target.reportValidity(); // Muestra los mensajes de error del navegador
        return;
    }

    // Si todo está bien, enviar el formulario
    event.target.submit();
}

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    form.onsubmit = validaterequirements;

    contrasena1.addEventListener('input', validatePasswordLength);
    contrasena1.addEventListener('input', ValidatePasswordConsistency);
    confirmation.addEventListener('input', validatePasswordLength);
    confirmation.addEventListener('input', ValidatePasswordConsistency);
});
