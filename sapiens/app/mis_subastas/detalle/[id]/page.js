"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./styles.detalleMisSubastas.css";
import Header from "../../../../components/header/header";
import Footer from "../../../../components/footer/footer";

const Detalle = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

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
    });

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    // Cargar el token y el usuario autenticado
    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        if (storedToken) {
            setToken(storedToken);
            fetch("http://127.0.0.1:8000/api/users/me/", {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            })
                .then(res => res.json())
                .then(userData => setUserId(userData.id))
                .catch(err => console.error("Error obteniendo usuario:", err));
        }
    }, []);

    // Cargar los datos de la subasta
    useEffect(() => {
        if (!id || !token) return;

        const fetchAuctionData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    console.error("Error al obtener la subasta:", await response.text());
                    return;
                }

                const subasta = await response.json();

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
                    minUp: (subasta.price * 0.05).toFixed(2),
                });

                if (userId && subasta.user === userId) {
                    setIsOwner(true);
                }
            } catch (error) {
                console.error("Error al cargar la subasta:", error);
            }
        };

        fetchAuctionData();
    }, [id, token, userId]);

    const handleDeleteAuction = async () => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta subasta?")) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Subasta eliminada correctamente");
                router.push("/");
            } else {
                const errorText = await response.text();
                console.error("Error al eliminar:", errorText);
                alert("Error al eliminar la subasta");
            }
        } catch (error) {
            console.error("Error de red al eliminar:", error);
            alert("Error de conexión");
        }
    };

    return (
        <div>
            <Header />
            <h1>{detailData.title}</h1>

            <div className="galeria">
                {detailData.galeria.imagenPrincipal ? (
                    <img src={detailData.galeria.imagenPrincipal} alt="Imagen del producto" />
                ) : null}
                <div className="miniaturas">
                    {detailData.galeria.miniaturas.map((miniatura, index) =>
                        miniatura ? (
                            <img key={index} src={miniatura} alt={`Miniatura ${index + 1}`} />
                        ) : null
                    )}

                </div>
            </div>

            <p>{detailData.description}</p>

            <p>
                Precio: <strong>${detailData.price}</strong><br />
                Subida mínima: <strong>${detailData.minUp}</strong><br />
                Categoría: <strong>{detailData.category}</strong><br />
                Marca: <strong>{detailData.brand}</strong><br />
                Fecha de cierre: <strong>{new Date(detailData.closing_date).toLocaleString()}</strong>
            </p>

            {isOwner && (
                <>
                    <button onClick={handleDeleteAuction}>Eliminar subasta</button>
                    <Link href={`/mis_subastas/detalle/${id}/editar`}>
                        <button>Editar subasta</button>
                    </Link>
                </>
            )}

            <Footer />
        </div>
    );
};

export default Detalle;
