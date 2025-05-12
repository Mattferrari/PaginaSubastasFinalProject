"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../../../../components/header/header";
import Footer from "../../../../../components/footer/footer";

const DetalleComentario = () => {
    const { id, comentarioId } = useParams();
    const [comentario, setComentario] = useState(null);

    useEffect(() => {
        const fetchComentario = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}comentarios/${comentarioId}/`);
                const data = await res.json();
                setComentario(data);
            } catch (err) {
                console.error("Error al obtener comentario:", err);
            }
        };

        fetchComentario();
    }, [comentarioId]);

    if (!comentario) return <p>Cargando comentario...</p>;

    return (
        <div>
            <Header />
            <div>

                <h2>{comentario.titulo}</h2>
                <p><strong>Autor:</strong> {comentario.usuario_username}</p>
                <p><strong>Texto:</strong> {comentario.texto}</p>
                <p><strong>Creado en:</strong> {new Date(comentario.fecha_creacion).toLocaleString()}</p>
                <p><strong>Última modificación:</strong> {new Date(comentario.fecha_modificacion).toLocaleString()}</p>
            </div>
            <Footer />
        </div>
    );
};

export default DetalleComentario;
