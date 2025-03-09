"use client";  

import React, { useState, useEffect } from "react";
import styles from "./Product.styles.css";

const Producto = ({ producto }) => {
    const [detailData, setDetailData] = useState({
        titulo: "Producto no encontrado",
        galeria: {
            imagenPrincipal: "",
        },
        descripcion: "",
        precio: 0,
        categoria: "",
        id: 0,
    });

    useEffect(() => {
        if (producto) {
            setDetailData({
                titulo: producto.title,
                galeria: { imagenPrincipal: producto.images[0] },
                descripcion: producto.description,
                precio: producto.price,
                categoria: producto.tags[0] || "Sin categoría", // Mostramos el primer tag o 'Sin categoría'
                id: producto.id,
            });
        }
    }, [producto]);

    return (
        <div className={styles.producto}>
            <div className={styles.galeria}>
                <img
                    src={detailData.galeria.imagenPrincipal}
                    alt="Imagen del producto"
                    onClick={() => window.location.href = `/detalle/${detailData.id}`} // Redirigir al detalle del producto
                />
            </div>

            <h1>{detailData.titulo}</h1>

            <p>{detailData.descripcion}</p>
            
            <p>
                Precio: <b>$</b>
                <strong>{detailData.precio}</strong>
            </p>

            <p>Categoría: {detailData.categoria}</p>

            <hr />
        </div>
    );
};

export default Producto;
