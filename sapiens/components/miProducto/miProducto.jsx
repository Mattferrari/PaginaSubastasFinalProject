"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.miProducto.css";
import { useRouter } from "next/navigation";


const MiProducto = ({ producto }) => {
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
                galeria: { imagenPrincipal: producto?.thumbnail || "" },
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
                    src={detailData.galeria.imagenPrincipal || null}
                    alt="Imagen del producto"
                    onClick={() => window.location.href = `../../mis_subastas/detalle/${detailData.id}`}
                />
            </div>

            <h1 onClick={() => window.location.href = `../../mis_subastas/detalle/${detailData.id}`}>{detailData.titulo}</h1>

            <p>{detailData.descripcion}</p>

            <p>
                Precio: <b>$</b>
                <strong>{detailData.precio}</strong>
            </p>
        </div>
    );
};

export default MiProducto;
