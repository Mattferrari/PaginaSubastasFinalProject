import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Si estás usando react-router-dom

const Detalle = () => {
    const { id } = useParams();

    const [detailData, setDetailData] = useState({
        title: "Producto no encontrado",
        galeria: {
            imagenPrincipal: "",
            miniaturas: [],
        },
        description: "",
        maxPuja: 0,
        minUp: 1,
        puja: 0,
        historial: [],
    });

    const [oferError, setOferError] = useState("");

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await fetch("ruta");  // TODO: añadir la ruta correcta al JSON de datos
            const data = await response.json();
            const producto = data.products.find(product => product.id === parseInt(id));
            if (producto) {
                setDetailData({
                    title: producto.title,
                    galeria: {
                        imagenPrincipal: producto.images[0],
                        miniaturas: producto.images.slice(1),
                    },
                    description: producto.description,
                    maxPuja: producto.price,
                    minUp: producto.subida_minima,
                    puja: 0,
                    historial: producto.historial.map(entry => entry.oferta),
                });
            }
        };

        fetchProductData();
    }, [id]);

    const minPrice = () => {
        return detailData.minUp + detailData.maxPuja;
    };

    const pujar = () => {
        if (!oferError){
            updateDetailData();
        }
    };

    const updateDetailData = ()=>{
        setDetailData({
            ...detailData,
            maxPuja: detailData.puja,
            historial: [...detailData.historial, detailData.puja],
            puja: "",
        });
    };

    const validatePrice = (value) => {
        if (value < minPrice()){
            setOferError("el precio ofertado es menor al mínimo");
        }else{
            setOferError("");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "puja"){
            validatePrice(value);
        }
        setDetailData({ ...detailData, [name]: value });
    };

    return (
        <div>
            <h1>{detailData.title}</h1>

            <div className="galeria">
                <img
                    src={detailData.galeria.imagenPrincipal}
                    alt="Imagen del producto"
                />
                <div className="miniaturas">
                    {detailData.galeria.miniaturas.map((miniatura, index) => (
                        <img key={index} src={miniatura} alt={`Miniatura ${index + 1}`} />
                    ))}
                </div>
            </div>

            <p>{detailData.description}</p>

            <p>
                Última puja: <b>$</b>
                <strong>{detailData.maxPuja}</strong>

                Subida mínima: <b>$</b>
                <strong>{detailData.minUp}</strong>

                Precio actual: <b>$</b>
                <strong>{minPrice()}</strong>

                {/* Tiempo restante: <span>{detailData.tiempo}</span> */}
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

            <ul>
                {detailData.historial.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    );
};

export default Detalle;
