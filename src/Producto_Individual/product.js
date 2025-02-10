async function loadJSON() {
    // Obtain product ID (URL)
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id");

    if (!idProducto) {
        alert("Producto no encontrado");
        return;
    }

    // load JSON data
    // future expanse MongoDB
    const data = await fetch("../Products/API_Data.json");
    const json = await data.json();
    const productos = json["products"];
    const producto = productos[idProducto];
    return producto
}
const cargarProducto = async () => {
    producto = await loadJSON()
    if (!producto) {
        alert("Producto no encontrado");
        return;
    }
    if (producto.tiempo_fin){
        loadTime(producto);
    }
    
    // load data to HTML
    document.getElementById("titulo").innerText = producto.title;
    document.getElementById("descripcion").innerText = producto.description;
    document.getElementById("precio").innerText = `${producto.price}`;

    // valor de la puja
    const precioMinimo = producto?.precio
    const campoPuja = document.getElementById("puja");
    
    if (precioMinimo){
        campoPuja.value = precioMinimo;
        campoPuja.setAttribute('min', precioMinimo);
    }

    // Load images to HTML
    document.getElementById("imagenPrincipal").src = producto.images[0];

    // Miniatures
    let miniaturasDiv = document.getElementById("miniaturas");
    producto.images.forEach(img => {
        let imgElem = document.createElement("img");
        imgElem.src = img;
        imgElem.className= "miniaturas"
        imgElem.onclick = () => document.getElementById("imagenPrincipal").src = img;
        miniaturasDiv.appendChild(imgElem);
    });

    // Historial de pujas
        let historialElem = document.getElementById("historial");
        if (producto.historial){
            producto.historial.forEach(puja => {
                let li = document.createElement("li");
                li.innerText = `${puja.usuario}: $${puja.oferta}`;
                historialElem.appendChild(li);
            });
        }
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


async function pujar() {
    const puja = parseFloat(document.getElementById("puja").value);
    const precioMinimo = parseFloat(document.getElementById("precio").innerText);

    if (puja < precioMinimo) {
        alert("La puja debe ser mayor o igual al precio mínimo.");
        return;
    }

    producto = await loadJSON();
    if (!producto) {
        alert("Producto no encontrado");
        return;
    }

    // obtain minimum up and calc new price
    const subidaMinima = producto.subida_minima || 10; // default value
    producto.precio = puja + subidaMinima;
    if (producto.historial){
        producto.historial.unshift({ usuario: "Tú", oferta: puja });
    }

    // Actualizar la página con los nuevos datos
    actualizarDatosEnPantalla(producto);
}

/**
 * Actualiza la web con los datos del producto tras una puja.
 */
function actualizarDatosEnPantalla(producto) {
    document.getElementById("precio").innerText = producto.price;
    document.getElementById("puja").value = producto.price;
    document.getElementById("puja").setAttribute("min", producto.price);

    let historialElem = document.getElementById("historial");
    if (producto.historial){
    historialElem.innerHTML = ""; // Limpiar historial
    producto.historial.forEach(puja => {
        let li = document.createElement("li");
        li.innerText = `${puja.usuario}: $${puja.oferta}`;
        historialElem.appendChild(li);
    });
}
}


// Ejecutar la función al cargar la página
window.onload = cargarProducto;

