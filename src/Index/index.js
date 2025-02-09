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


let indice = 0;

function moverCarrusel(direccion) {
  const slides = document.querySelectorAll('.slide');
  indice += direccion;

  if (indice < 0) {
    indice = slides.length - 1;
  } else if (indice >= slides.length) {
    indice = 0;
  }

  document.querySelector('.carousel-content').transform = `translateX(${-indice * 100}%)`;
}