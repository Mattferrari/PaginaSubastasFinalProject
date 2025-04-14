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

    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

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
            try {
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
                        minUp: (subasta.price * 0.05).toFixed(2),
                    });

                    // Verificar si el usuario es el dueño de la subasta
                    const token = localStorage.getItem("access_token");
                    if (token) {
                        const userResponse = await fetch('http://127.0.0.1:8000/api/users/me/', {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        const userData = await userResponse.json();
                        setIsOwner(userData.id === subasta.owner);
                    }
                }
            } catch (error) {
                console.error("Error fetching auction data:", error);
            }
        };

        fetchAuctionData();
    }, [id]);

    const handleDeleteAuction = async () => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta subasta?")) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            if (response.ok) {
                alert("Subasta eliminada correctamente");
                router.push("/");
            } else {
                const errorData = await response.json();
                console.error("Error al eliminar:", errorData);
                alert("Error al eliminar la subasta");
            }
        } catch (error) {
            console.error("Error en fetch:", error);
            alert("Error de conexión al intentar eliminar");
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
                Precio: <b>$</b><strong>{detailData.price}</strong>
                <br />
                Subida mínima: <b>$</b><strong>{detailData.minUp}</strong>
                <br />
                Categoría: <strong>{detailData.category}</strong>
                <br />
                Marca: <strong>{detailData.brand}</strong>
                <br />
                Fecha de cierre: <strong>{new Date(detailData.closing_date).toLocaleString()}</strong>
            </p>

            <button onClick={handleDeleteAuction}>
                Eliminar subasta
            </button>

            <Link href={`/mis_subastas/detalle/${id}/editar`}>
                <button>Editar subasta</button>
            </Link>

            <Footer />
        </div>
    );
};

export default Detalle;