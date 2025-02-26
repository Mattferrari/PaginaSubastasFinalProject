// async function cargarResultados() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const searchTag = urlParams.get("tag");
//     if (!searchTag) return;
    
//     try {

//         // const response = await fetch("https://dummyjson.com/products")

//         const jsonresult = fetch("https://dummyjson.com/products")
//         .then(response => {
//             console.log("Tipo de respuesta:", response);
//             return response.json();  // Aquí es donde está fallando
//         })
//         .then(data => {
//             console.log("Datos cargados:", data);
//         })
//         .catch(error => {
//             console.error("Error al cargar los productos", error);
//         });


//         // const response = fetch("https://dummyjson.com/products", { cache: "no-store" })
        
//         // const response = await fetch("// const data = await fetch("https://dummyjson.com/products");
//         // const response = await fetch("../Products/Pers_Products.json"); 
//         // const jsonresult = await response.json();
//         const productos = jsonresult["products"];
        
//         const resultados = productos.filter(producto => 
//             producto.tags.some(tag => tag.toLowerCase() === searchTag.toLowerCase())
//         ).slice(0, 10); // max 10
        
//         mostrarResultados(resultados);
//     } catch (error) {
//         console.error("Error al cargar los productos", error);
//     }
// }


async function cargarResultados() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTag = urlParams.get("tag");
    if (!searchTag) return;

    try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const jsonresult = await response.json(); // Esperamos el JSON

        console.log("Datos cargados:", jsonresult);

        const productos = jsonresult["products"]; // Ahora sí existen los productos

        const resultados = productos.filter(producto =>
            producto.tags?.some(tag => tag.toLowerCase() === searchTag.toLowerCase())
        ).slice(0, 10); // max 10

        mostrarResultados(resultados);
    } catch (error) {
        console.error("Error al cargar los productos", error);
    }
}


function mostrarResultados(productos) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    
    if (productos.length === 0) {
        resultsDiv.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }
    
    productos.forEach(producto => {
        const productoElemento = document.createElement("div");
        productoElemento.innerHTML = `
            <img src="${producto.images[0]}" alt="${producto.title}" class="image">
            <h2>${producto.title}</h2>
            <p>${producto.description}</p>
            <p><strong>Precio inicial:</strong> ${producto.price}€</p>
            <hr>
        `;
        productoElemento.onclick = () => {
            window.location.href = `../Producto_Individual/product.html?id=${producto.id-1}`;
        };
        resultsDiv.appendChild(productoElemento);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    function performSearch() {
        let query = searchInput.value.trim(); // Obtiene el valor del input y elimina espacios innecesarios
        if (query === "") {
            query = "mascara";
        }
        window.location.href = "../Resultados/resultados.html?tag=" + query;
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

window.onload = cargarResultados;