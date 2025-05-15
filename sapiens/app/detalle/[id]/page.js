"use client";

import React, { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import "./styles.detalle.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import Puja from "../../../components/puja/puja";
import Link from "next/link";


const Detalle = () => {
    const params = useParams();
    const id = params.id; // Obtener el ID de la subasta
    const [listaPujas, setListaPujas] = useState([]);
    const [detailData, setDetailData] = useState({
        title: "Producto no encontrado",
        galeria: {
            imagenPrincipal: "",
            miniaturas: [],
        },
        description: "",
        price: 0,
        stock: 0,
        category: "",
        brand: "",
        closing_date: "",
        creation_date: "",
        minUp: 1,
        puja: 0,
    });

    const [username, setUsername] = useState("");
    const [oferError, setOferError] = useState("");
    const [user, setUser] = useState({ token: null });
    const [newRating, setNewRating] = useState("");
    const [avgRating, setAvgRating] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {

            console.log("token found successfully");
            setUser({ token });
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/users/me/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("No se pudo obtener el usuario.");
                }

                const data = await response.json();
                setUsername(data.username); // Aquí guardas el username
            } catch (error) {
                console.error("Error al obtener datos del usuario:", error);
            }
        };

        if (user && user.token) {
            fetchUserData();
        }
    }, [user]);

    useEffect(() => {
        if (!id) return;

        const fetchAuctionData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json"
                }
            });
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
                    rating: subasta.average_rating,
                    category: subasta.category.name,
                    brand: subasta.brand,
                    closing_date: subasta.closing_date,
                    creation_date: subasta.creation_date,
                    minUp: 1,
                    puja: 0,
                });

                setAvgRating(subasta.average_rating);
            }

        };

        fetchAuctionData();
    }, [id, newRating]);



    useEffect(() => {
        const fetchPujas = async () => {
            try {
                if (!id || !user?.token) {
                    setListaPujas([]);
                    return;
                }

                const response = await fetch(
                    `http://127.0.0.1:8000/api/auctions/subastas/${id}/pujas/`,
                    {
                        headers: {
                            "Authorization": `Bearer ${user.token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setListaPujas(Array.isArray(data) ? data : data.results || []);

            } catch (error) {
                console.error("Error fetching bids:", error);
                setListaPujas([]);
                // Opcional: Mostrar notificación al usuario
                // setError("No se pudieron cargar las pujas");
            }
        };

        fetchPujas();
    }, [id, user?.token]);  // Se ejecuta cuando cambia id o el token

    useEffect(() => {
        const getRating = async() => {
            try{
                if (!id || !user?.token) {
                    setNewRating("");
                    return;
                }
                
                const response = await fetch(
                    `http://127.0.0.1:8000/api/auctions/subastas/${id}/user/rate/`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${user.token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setNewRating(data.value);
                console.log(`data devuelta: ${data}`)
            }catch (error) {
                console.error("Error fetching bids:", error);
                setNewRating("")
            }
        };

        getRating()
    }, [id, user?.token])

    const minPrice = () => detailData.minUp + detailData.price;

    const pujar = async () => {
        if (!user?.token) {
            alert("Debes iniciar sesión para pujar");
            return;
        }

        try {
            // Validación básica del precio
            if (detailData.puja <= minPrice()) {
                setOferError(`La puja debe ser mayor a ${minPrice()}`);
                return;
            }

            // Antes de hacer la petición, verifica el token:
            const token = localStorage.getItem('access_token');

            // Limpia el token si está corrupto
            if (!token || token.split('.').length !== 3) {
                localStorage.removeItem('access_token');
                window.location.reload(); // Redirige a login
                return;
            }

            const response = await fetch(
                `http://127.0.0.1:8000/api/auctions/subastas/${id}/pujas/`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        price: parseFloat(detailData.puja),
                        bidder: username
                    }),
                }
            );

            // Manejo de errores HTTP
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error del servidor:", errorText);
                throw new Error(`Error ${response.status}`);
            }

            // Procesar respuesta exitosa
            const data = await response.json();
            setListaPujas(prev => [data, ...prev]);
            setDetailData(prev => ({ ...prev, price: data.price, puja: 0 }));

        } catch (error) {
            console.error("Error al pujar:", error);
            alert("Error al procesar la puja. Verifica la consola para más detalles.");
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

    const handleChangeRatings = (e) => {
        setNewRating(e.target.value);
    };


  
    const handleRatingSubmit = async () => {
        if (!user || !user.token) {
            alert("Debes estar autenticado para valorar");
            return;
        }

        try {
            let response;
            if (!newRating || newRating == 0) {
                response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/rate/delete/`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    alert("Rating eliminado");
                    setNewRating("");
                }
            }else{
                response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/rate/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({ value: Math.round(Number(newRating)) }),
                });

                if (response.ok) {
                    alert("¡Valoración enviada!");
                }
            }
            if (response.ok) {
                // Obtener promedio actualizado
                const updatedAuction = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                });

                const updatedData = await updatedAuction.json();
                setAvgRating(updatedData.average_rating);  // Esto debe ser un número
            }

            else {
                const errorData = await response.json();
                console.error("Error al enviar valoración", errorData);
            } 
        } catch (err) {
            console.error("Error", err);
        }
    };


    return (
        <div>
            <Header />
            <h1>{detailData.title}</h1>

            <div className="galeria">
                <img src={detailData.galeria?.imagenPrincipal || null} alt="Imagen del producto" />
                <div className="miniaturas">
                    {detailData.galeria?.miniaturas?.map((miniatura, index) => (
                        <img key={index} src={miniatura || null} alt={`Miniatura ${index + 1}`} />
                    ))}
                </div>
            </div>

            <p>{detailData.description}</p>


            <p>
                Última puja: <b>$</b>
                <strong>{detailData.price}</strong>
                <br />
                Subida mínima: <b>$</b>
                <strong>{detailData.minUp}</strong>
                <br />
                Precio actual: <b>$</b>
                <strong>{minPrice()}</strong>
                <br />
                Valoracion actual:
                <strong>{avgRating ?? "No disponible"}</strong>
            </p>

            <Link href={`/detalle/${id}/comentarios`}>
                <button style={{ marginTop: "20px" }}>
                    Ver comentarios
                </button>
            </Link>

            {user && (
                <div className="valoracion">
                    <p>
                        puede modificar la valoracion 
                        o dejarla en 0 o en blanco para eliminarla
                    </p>
                    <label>Valora esta subasta (1 a 5):</label>
                    <input
                        type="number"
                        name="rating"
                        min="0"
                        max="5"
                        step="1"
                        value={newRating ?? ""}
                        onChange={handleChangeRatings}
                    />
                    <button onClick={handleRatingSubmit}>
                        Enviar valoración
                    </button>
                </div>
            )}

            <input
                type="number"
                name="puja"
                value={detailData.puja}
                onChange={handleChange}
                placeholder="Tu oferta"
                min={minPrice()}
            />

            {oferError && <p className="error">{oferError}</p>}

            {user ? (
                <button onClick={pujar}>Pujar</button>
            ) : (
                <p>Debes estar registrado para poder pujar</p>
            )}

            <h2 className="titlePujas">Pujas</h2>

            <ul className="listaPujas">
                {listaPujas.map((pujaObj, index) => (
                    <li key={pujaObj.id || index}>
                        <Puja puja={pujaObj} />
                    </li>
                ))}
            </ul>

            <Footer />
        </div >
    );
};

export default Detalle;
