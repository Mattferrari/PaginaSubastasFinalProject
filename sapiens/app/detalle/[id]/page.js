"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.detalle.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";

const Detalle = () => {
    const params = useParams();
    const id = params.id; // Obtener el ID de la subasta

    const [detailData, setDetailData] = useState({
        title: "Producto no encontrado",
        galeria: {
            imagenPrincipal: "",
            miniaturas: [],
        },
        description: "",
        price: 0,
        stock: 0,
        rating: 0,
        category: "",
        brand: "",
        closing_date: "",
        creation_date: "",
        minUp: 1,
        puja: 0,
    });

    const [oferError, setOferError] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        console.log("Tkn: ", token)
        if (token) {
            console.log("token found successfully")
            setUser({ token }); 
        }
    }, []);

    useEffect(() => {
        if (!id) return;

        const fetchAuctionData = async () => {
            // Reemplaza esta URL con la correcta para tu API
            const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}`);
            const subasta = await response.json();

            if (subasta) {
                setDetailData({
                    title: subasta.title,
                    galeria: {
                        imagenPrincipal: subasta.thumbnail,
                        miniaturas: [subasta.thumbnail],
                    },
                    description: subasta.description,
                    price: subasta.price,
                    stock: subasta.stock,
                    rating: subasta.rating,
                    category: subasta.category.name,
                    brand: subasta.brand,
                    closing_date: subasta.closing_date,
                    creation_date: subasta.creation_date,
                    minUp: (subasta.price*0.05).toFixed(2),
                    puja: 0,
                });
            }
        };

        fetchAuctionData();
    }, [id]);

    const minPrice = () => detailData.minUp + detailData.price;

    const pujar = async () => {
        if (!oferError && user) {
            const nuevaPuja = {
                amount: parseFloat(detailData.puja),
                auction: id,
            };

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/pujas/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`, // <- importante si usas autenticación
                    },
                    body: JSON.stringify(nuevaPuja),
                });

                const contentType = response.headers.get("content-type");

                if (!response.ok) {
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        console.error("Error al pujar:", errorData);
                    } else {
                        const text = await response.text();
                        console.error("Respuesta no JSON:", text);
                    }
                    throw new Error("Error al realizar la puja");
                }

                const data = await response.json();
                setDetailData((prevState) => ({
                    ...prevState,
                    price: data.amount,
                    pujas: [data, ...prevState.pujas],
                    puja: 0,
                }));
            } catch (error) {
                console.error("Error en fetch:", error);
            }
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
            <Header />
            <h1>{detailData.title}</h1>

            <div className="galeria">
                <img src={detailData.galeria?.imagenPrincipal || null } alt="Imagen del producto" />
                <div className="miniaturas">
                    {detailData.galeria?.miniaturas?.map((miniatura, index) => (
                        <img key={index} src={miniatura || null } alt={`Miniatura ${index + 1}`} />
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

            {user ? (
                <button onClick={pujar}>Pujar</button>
            ) : (
                <p>Debes estar registrado para poder pujar</p>
            )}

            <h2 className="titlePujas">Pujas</h2>
            

            <Footer />
        </div>
    );
};

export default Detalle;

