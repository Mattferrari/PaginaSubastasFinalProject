const cargarProducto = async () => {
    // Obtain product ID (URL)
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id");

    if (!idProducto) {
        alert("Producto no encontrado");
        return;
    }

    // load JSON data
    // future expanse MongoDB
    const data = await fetch("Data_Products.json");
    const productos = await data.json();
    const producto = productos[idProducto];


    if (!producto) {
        alert("Producto no encontrado");
        return;
    }
    loadTime(producto);
    // load data to HTML
    document.getElementById("titulo").innerText = producto.titulo;
    document.getElementById("descripcion").innerText = producto.descripcion;
    document.getElementById("precio").innerText = `$${producto.precio}`;


    // Load images to HTML
    document.getElementById("imagenPrincipal").src = producto.imagenes[0];

    // Miniatures
    let miniaturasDiv = document.getElementById("miniaturas");
    producto.imagenes.forEach(img => {
        let imgElem = document.createElement("img");
        imgElem.src = img;
        imgElem.onclick = () => document.getElementById("imagenPrincipal").src = img;
        miniaturasDiv.appendChild(imgElem);
    });

    // Historial de pujas
    let historialElem = document.getElementById("historial");
    producto.historial.forEach(puja => {
        let li = document.createElement("li");
        li.innerText = `${puja.usuario}: $${puja.oferta}`;
        historialElem.appendChild(li);
    });
};

async function loadTime(producto) {
    const hora_fin = new Date(producto.tiempo_fin)
    const hora = new Date()
    // en milisegundos
    const diferencia = hora_fin - hora
    if (diferencia <0) {
    document.getElementById("tiempo").innerText = 0;
    } 
    else{
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        document.getElementById("tiempo").innerText = `${dias}d ${horas}h ${minutos}m ${segundos}s` ;
    }

    setTimeout(() => {
        loadTime(producto);
    }, 1000);
}

// Ejecutar la función al cargar la página
window.onload = cargarProducto;

