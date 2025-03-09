import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Producto from "../../components/Producto/Producto";
import styles from "styles.subastas.css";

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
    const cargarProductos = async () => {
        
        const response = await fetch("rute"); // TODO add products JSON to sapiens to enrute it
        const data = await response.json();
        setProductos(data);
    };

    cargarProductos();
    }, []);

    return (
    <div className={styles.listaProductos}>
        {productos.map((producto) => (
        <Link to={`/detalle/${producto.id}`} key={producto.id}>
            <Producto producto={producto} />
        </Link>
        ))}
    </div>
    );
};

export default ListaProductos;
