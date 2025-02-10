async function cargarResultados() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTag = urlParams.get("tag");
    if (!searchTag) return;
    
    try {
        // const response = await fetch(""); 
        const response = await fetch("../Products/API_Data.json"); 
        const jsonresult = await response.json();
        const productos = jsonresult["products"];
        
        const resultados = productos.filter(producto => 
            producto.tags.some(tag => tag.toLowerCase() === searchTag.toLowerCase())
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

window.onload = cargarResultados;