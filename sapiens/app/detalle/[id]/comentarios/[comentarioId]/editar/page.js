"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../../../../components/header/header";
import Footer from "../../../../../../components/footer/footer";

const EditarComentario = () => {
    const { id, comentarioId } = useParams();
    const router = useRouter();
    const [comentario, setComentario] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [cuerpo, setCuerpo] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComentario = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/comentarios/${comentarioId}/`);
                const data = await res.json();
                setComentario(data);
                setTitulo(data.titulo);
                setCuerpo(data.cuerpo);
            } catch (err) {
                setError("Error al cargar el comentario.");
                console.error(err);
            }
        };

        const fetchUsuario = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
            if (token) {
                try {

                    const res = await fetch("http://127.0.0.1:8000/api/users/me/", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await res.json();
                    setUsuario(data);
                } catch (err) {
                    console.error("Error al obtener el usuario:", err);
                }
            }

        };

        fetchComentario();
        fetchUsuario();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/comentarios/${comentarioId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify({
                    titulo,
                    cuerpo,
                }),
            });

            if (res.ok) {
                router.push(`/detalle/${id}/comentarios/${comentarioId}`);
            } else {
                const data = await res.json();
                setError(data.detail || "Error al actualizar el comentario.");
            }
        } catch (err) {
            setError("Error al enviar los datos.");
            console.error(err);
        }
    };

    // if (!comentario) return <p>Cargando comentario...</p>;
    // if (!usuario) return <p>Verificando usuario...</p>;
    // console.log(localStorage.getItem("access"))
    // if (usuario.username !== comentario.autor_username) return <p>No tienes permiso para editar este comentario.</p>;

    return (
        <div>
            <Header />
            <div style={{ padding: "20px" }}>
                <h2>Editar Comentario</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Título:</label>
                        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                    </div>
                    <div>
                        <label>Texto:</label>
                        <textarea value={cuerpo} onChange={(e) => setCuerpo(e.target.value)} required />
                    </div>
                    <button type="submit">Guardar cambios</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default EditarComentario;
