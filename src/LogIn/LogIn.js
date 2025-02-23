document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    function performSearch() {
        let query = searchInput.value.trim(); // Obtiene el valor del input y elimina espacios innecesarios
        if (query === "") {
            query = "Medal"; // Si el campo está vacío, usa "Medal" como valor predeterminado
        }
        window.location.href = "../Resultados/resultados.html?tag=" + encodeURIComponent(query);
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
