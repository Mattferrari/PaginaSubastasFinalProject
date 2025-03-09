import React, { useState, useEffect } from "react";

const Producto = ({ producto }) => {
    const [detailData, setDetailData] = useState({
        titulo: "Producto no encontrado",
        galeria: {
            imagenPrincipal: "",
        },
        descripcion: "",
        maxPuja: 0,
        minUp: 1,
        id: 0,
    });

    useEffect(() => {
        if (producto) {
            setDetailData({
                titulo: producto.title,
                galeria: { imagenPrincipal: producto.images[0] },
                descripcion: producto.description,
                maxPuja: producto.price,
                minUp: producto.subida_minima,
                id: producto.id, 
            });
        }
    }, [producto]);

    const minPrice = () => {
        return detailData.minUp + detailData.maxPuja;
    };

    const handleRedirect = () => {
        history.push(`/detalle/${detailData.id}`);
    };

    return (
    <div className={styles.producto}>
        <div className={styles.galeria} onClick={handleRedirect}>
            <img
            src={detailData.galeria.imagenPrincipal}
            alt="Imagen del producto"
            />
        </div>

        <h1 onClick={handleRedirect}>{detailData.titulo}</h1>

        <p>{detailData.descripcion}</p>
        
        <p>
            Precio actual: <b>$</b>
            <strong>{minPrice()}</strong>
            {/* Tiempo restante: <span>{detailData.tiempo}</span> */}
        </p>
        <hr />
    </div>

    );
};

export default Producto;
