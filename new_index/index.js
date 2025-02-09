const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const closeModal = document.getElementById('close-modal');
const clearFields = document.getElementById('clear-fields');

loginButton.addEventListener('click', () => {
loginModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
if (e.target === loginModal) {
    loginModal.style.display = 'none';
}
});

clearFields.addEventListener('click', () => {
const inputs = loginModal.querySelectorAll('input');
inputs.forEach(input => input.value = '');
});