"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../../components/header/header";
import Footer from "../../../../components/footer/footer";

const Comentarios = () => {
    const { id } = useParams();
    const router = useRouter();
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/comentarios/`);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                // Maneja tanto respuestas paginadas como no paginadas
                const comentariosData = Array.isArray(data) ? data : data.results || data;

                setComentarios(comentariosData);
                console.log("Comentarios recibidos:", comentariosData);

            } catch (error) {
                console.error("Error al obtener comentarios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComentarios();
    }, [id]);

    console.log(comentarios)

    return (
        <div>
            <Header />
            <div className="comentarios-container">
                <h2>Comentarios de la subasta {id}</h2>

                <button
                    onClick={() => router.push(`/detalle/${id}/comentarios/nuevo`)}
                    className="add-comment-btn"
                >
                    Añadir Comentario
                </button>

                {comentarios.length === 0 ? (
                    <p>No hay comentarios aún. Sé el primero en comentar.</p>
                ) : (
                    <ul className="comentarios-list">
                        {comentarios.map((comentario) => (
                            <li key={comentario.id} className="comentario-item">
                                <Link
                                    href={`/detalle/${id}/comentarios/${comentario.id}`}
                                    className="comentario-link"
                                >
                                    <strong>{comentario.titulo}</strong> — {comentario.autor_username || 'Anónimo'}

                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Comentarios;