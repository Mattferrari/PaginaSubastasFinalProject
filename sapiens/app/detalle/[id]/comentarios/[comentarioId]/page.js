"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../../../components/header/header";
import Footer from "../../../../../components/footer/footer";

const DetalleComentario = () => {
    const { id, comentarioId } = useParams();
    const router = useRouter();
    const [comentario, setComentario] = useState(null);
    const [usuario, setUsuario] = useState(null); // Usuario logueado

    useEffect(() => {
        const fetchComentario = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/comentarios/${comentarioId}/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                const data = await res.json();
                setComentario(data);
            } catch (err) {
                console.error("Error al obtener comentario:", err);
            }
        };

        const fetchUsuario = async () => {
            try {
                const token = localStorage.getItem("access_token")
                const res = await fetch("http://127.0.0.1:8000/api/users/me/", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsuario(data);
                }
            } catch (err) {
                console.error("Error al obtener usuario:", err);
            }
        };

        fetchComentario();
        fetchUsuario();
    }, [id, comentarioId]);

    const handleEliminar = async () => {
        if (confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/comentarios/${comentarioId}/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });

                if (res.ok) {
                    alert("Comentario eliminado.");
                    router.push(`/detalle/${id}/comentarios`);
                } else {
                    alert("No tienes permiso para eliminar este comentario.");
                }
            } catch (err) {
                console.error("Error al eliminar comentario:", err);
            }
        }
    };

    if (!comentario) return <p>Cargando comentario...</p>;

    const esAutor = usuario?.username === comentario.autor_username;

    return (
        <div>
            <Header />
            <div className="comentario-detalle">
                <h2>{comentario.titulo}</h2>
                <p><strong>Autor:</strong> {comentario.autor_username}</p>
                <p><strong>Texto:</strong> {comentario.cuerpo}</p>
                <p><strong>Creado en:</strong> {new Date(comentario.creado_en).toLocaleString()}</p>
                <p><strong>Última modificación:</strong> {new Date(comentario.actualizado_en).toLocaleString()}</p>

                {esAutor && (
                    <div className="acciones">
                        <button onClick={() => router.push(`/detalle/${id}/comentarios/${comentarioId}/editar`)}>Editar</button>
                        <button onClick={handleEliminar} className="danger">Eliminar</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default DetalleComentario;
