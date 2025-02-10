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
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  function performSearch() {
      let query = searchInput.value.trim(); // Obtiene el valor del input y elimina espacios innecesarios
      if (query === "") {
          query = "Medal"; // Si el campo está vacío, usa "Medal" como valor predeterminado
      }
      window.location.href = `http://localhost:8000/src/Resultados/resultados.html?tag=${encodeURIComponent(query)}`;
  }

  // Ejecutar búsqueda al presionar Enter
  searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
          event.preventDefault(); // Evita el comportamiento por defecto del formulario (si lo hubiera)
          performSearch();
      }
  });

  // Ejecutar búsqueda al hacer clic en el botón
  searchButton.addEventListener("click", performSearch);
});
