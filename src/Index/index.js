// const loginButton = document.getElementById('login-button');
// const loginModal = document.getElementById('login-modal');
// const closeModal = document.getElementById('close-modal');
// const clearFields = document.getElementById('clear-fields');

// loginButton.addEventListener('click', () => {
// loginModal.style.display = 'flex';
// });

// closeModal.addEventListener('click', () => {
// loginModal.style.display = 'none';
// });

// window.addEventListener('click', (e) => {
// if (e.target === loginModal) {
//     loginModal.style.display = 'none';
// }
// });

// clearFields.addEventListener('click', () => {
// const inputs = loginModal.querySelectorAll('input');
// inputs.forEach(input => input.value = '');
// });


let currentSlide = 0; // Variable para mantener el índice de la diapositiva actual

function moverCarrusel(direction) {
  const slides = document.querySelectorAll('.carousel .slide'); // Seleccionamos todas las diapositivas

  // Eliminar la clase 'active' de la diapositiva actual
  slides[currentSlide].classList.remove('active');
  
  // Calculamos el siguiente índice de la diapositiva
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  
  // Agregamos la clase 'active' a la nueva diapositiva
  slides[currentSlide].classList.add('active');
}