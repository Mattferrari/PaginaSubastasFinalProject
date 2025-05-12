"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../../../components/header/header";
import Footer from "../../../../../components/footer/footer";

const NuevoComentario = () => {
    const { id } = useParams();
    const router = useRouter();
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("access_token");

        try {

            console.log(titulo)
            console.log(texto)
            console.log(id)

            const res = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/comentarios/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    titulo: titulo,
                    cuerpo: texto,
                }),
            });

            if (res.ok) {
                alert("Comentario añadido");
                router.push(`/detalle/${id}/comentarios`);
            } else {
                const errorData = await res.json();
                alert("Error al enviar comentario");
                console.error(errorData);
            }
        } catch (err) {
            console.error("Error de conexión:", err);
        }
    };

    return (
        <div>
            <Header />
            <div>
                <h2>Nuevo Comentario para la subasta {id}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                    <br />
                    <textarea
                        placeholder="Texto del comentario"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit">Enviar Comentario</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default NuevoComentario;