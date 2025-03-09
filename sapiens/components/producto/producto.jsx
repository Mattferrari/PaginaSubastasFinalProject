"use client";  

import React, { useState, useEffect } from "react";
import styles from "./styles.producto.css";

const Producto = ({ producto }) => {
    const [detailData, setDetailData] = useState({
        titulo: "Producto no encontrado",
        galeria: {
            imagenPrincipal: "",
        },
        descripcion: "",
        precio: 0,
        id: 0,
    });

    useEffect(() => {
        if (producto) {
            setDetailData({
                titulo: producto.title,
                galeria: { imagenPrincipal: producto.images[0] },
                descripcion: producto.description,
                precio: producto.price,
                id: producto.id,
            });
        }
    }, [producto]);

    return (
        <div className="producto">
            <div className="galeria">
                <img
                    src={detailData.galeria.imagenPrincipal}
                    alt="Imagen del producto"
                    onClick={() => window.location.href = `../detalle/${detailData.id}`} // Redirigir al detalle del producto
                />
            </div>

            <h1 onClick={() => window.location.href = `../detalle/${detailData.id}`}>{detailData.titulo}</h1>

            <p>{detailData.descripcion}</p>
            
            <p>
                Precio: <b>$</b>
                <strong>{detailData.precio}</strong>
            </p>
        </div>
    );
};

export default Producto;
