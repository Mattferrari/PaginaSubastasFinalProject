"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";  
import styles from "./styles.detalle.css";

const Detalle = () => {
    const params = useParams(); 
    const id = params.id; // Obtener el ID de la URL
    
    const [detailData, setDetailData] = useState({
        title: "Producto no encontrado",
        galeria: {
            imagenPrincipal: "",
            miniaturas: [],
        },
        description: "",
        price: 0,
        minUp: 1,
        puja: 0,
    });

    const [oferError, setOferError] = useState("");

    useEffect(() => {
        if (!id) return

        const fetchProductData = async () => {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const producto = await response.json();
            
            if (producto) {
                setDetailData({
                    title: producto.title,
                    galeria: {
                        imagenPrincipal: producto.images[0],
                        miniaturas: producto.images,
                    },
                    description: producto.description,
                    price: producto.price,
                    minUp: 1,
                    puja: 0,
                });
            }
        };

        fetchProductData();
    }, [id]);

    const minPrice = () => detailData.minUp + detailData.price;

    const pujar = () => {
        if (!oferError) {
            setDetailData({
                ...detailData,
                price: detailData.puja,
                puja: 0,
            });
        }
    };

    const validatePrice = (value) => {
        if (value < minPrice()) {
            setOferError("El precio ofertado es menor al mínimo");
        } else {
            setOferError("");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "puja") validatePrice(value);
        setDetailData({ ...detailData, [name]: value });
    };

    return (
        <div>
            <h1>{detailData.title}</h1>

            <div className="galeria">
                <img src={detailData.galeria.imagenPrincipal} alt="Imagen del producto" />
                <div className="miniaturas">
                    {detailData.galeria.miniaturas.map((miniatura, index) => (
                        <img key={index} src={miniatura} alt={`Miniatura ${index + 1}`} />
                    ))}
                </div>
            </div>

            <p>{detailData.description}</p>

            <p>
                Última puja: <b>$</b><strong>{detailData.price}</strong>
                Subida mínima: <b>$</b><strong>{detailData.minUp}</strong>
                Precio actual: <b>$</b><strong>{minPrice()}</strong>
            </p>

            <input
                type="number"
                name="puja"
                value={detailData.puja}
                onChange={handleChange}
                placeholder="Tu oferta"
                min={minPrice()}
            />

            <button onClick={pujar}>Pujar</button>
        </div>
    );
};

export default Detalle;
