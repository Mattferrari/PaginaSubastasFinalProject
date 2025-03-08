import React, { useState, useEffect } from "react";

const Detalle = () => {
    const [detailData, setDetailData] = useState({
        titulo: "Producto no encontrado",
        galeria: {
            imagenPrincipal: "",
            miniaturas: [],
        },
        descripcion: "",
        maxPuja: 0,
        // tiempo: "",
        minUp: 1,
        puja: 0,
        historial: [],
    });

    const [oferError, setOferError] = useState("");

    const minPrice = () => {
        return detailData.minUp + detailData.maxPuja
    }
    const pujar = () => {
        if (!oferError){
            updateDetailData();
        }
    };

    const updateDetailData = ()=>{
        setDetailData({ 
            ...detailData, 
            maxPuja: detailData.puja,
            historial: [...prevData.historial, prevData.puja],
            puja: "",
         });


    };

    const validatePrice = (value) => {
        if (value < minPrice()){
            setOferError("el precio ofertado en menor al mínimo");
        }else{
            setOferError("");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "puja"){
            validatePrice(value)
        }
        setDetailData({ ...detailData, [name]: value });
    };


    return (
    <div>
    <h1>{detailData.titulo}</h1>

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

    <p>{detailData.descripcion}</p>

    <p>
    ultima puja: <b>$</b>
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
    min = {minPrice()}
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
