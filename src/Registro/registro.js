// correo
const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
document.getElementById('formulario').addEventListener('submit', function(e) {
    const correo = document.getElementById('email').value;
    
    if (!regexCorreo.test(correo)) {
        alert("Por favor, introduce un correo electrónico válido.");
        e.preventDefault(); // Evita el envío del formulario
    }
    });

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
    const isConsistent = await ValidatePasswordConsistency();
    const isLenOk1 = await validatePasswordLength({ target: contrasena1 }); 
    const isLenOk2 = await validatePasswordLength({ target: confirmation });
    return isConsistent && isLenOk1 && isLenOk2
}


async function validaterequirements(event) {
    // name
    const name = document.getElementById("name")

    // surname
    const surname = document.getElementById("Surname")

    // DNI
    const DNI = document.getElementById("DNI")

    // contraseña
    const contrasena1 = document.getElementById("password");
    // confirmation
    const confirmation = document.getElementById("confirmation");

    event.preventDefault();
    const passwordsok = validatePasswords(event)
    if (!passwordsok) {
    }
    else if (name.length === 0){
        name.setCustomValidity("el nombre es un campo obligatorio.");
    }
    else if (surname.length === 0){
        surname.setCustomValidity("el apellido es un campo obligatorio.");
    }
    else if (DNI.length === 0){
        DNI.setCustomValidity("el DNI es un campo obligatorio.");
    }
    else if (username.length === 0){
        username.setCustomValidity("el nombre de usuario es un campo obligatorio.");
    }
    else if (confirmation.length === 0){
        confirmation.setCustomValidity("la confirmación de contraseña es un campo obligatorio.");
    }
    else if (contrasena1.length === 0){
        contrasena1.setCustomValidity("la contraseña es un campo obligatorio.");
    }
    else{
        event.target.submit();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');
    form.onsubmit = validaterequirements;

    contrasena1.addEventListener('input', validatePasswordLength);
    contrasena1.addEventListener('input', ValidatePasswordConsistency);
    confirmation.addEventListener('input', validatePasswordLength);
    confirmation.addEventListener('input', ValidatePasswordConsistency);
});



