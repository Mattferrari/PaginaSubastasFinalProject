"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../../../components/header/header";
import Footer from "../../../../../components/footer/footer";

const EditarSubasta = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        rating: "",
        brand: "",
        closing_date: "",
        thumbnail: "",
        category: "",
    });


    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/auctions/subastas/categorias/"); // Suponiendo que tienes un endpoint para las categorías
                const data = await response.json();

                if (Array.isArray(data.results)) {
                    setCategorias(data.results);
                }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        cargarCategorias();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}`);
                const data = await res.json();
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    closing_date: data.closing_date,
                    brand: data.brand,
                });
            } catch (err) {
                setError("Error al cargar la subasta.");
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'closing_date') {
            // Si el valor no es válido, asignar una cadena vacía o una fecha predeterminada
            if (isNaN(new Date(value).getTime())) {
                return;  // No actualizar si la fecha no es válida
            }
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSelectChange = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            category: parseInt(value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("access_token");
            const res = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMensaje("Subasta actualizada correctamente.");
                setError("");
                setTimeout(() => {
                    router.push(`/mis_subastas/detalle/${id}`);
                }, 1500);
            } else {
                const data = await res.json();
                setError(data.detail || "Error al actualizar la subasta.");
                setMensaje("");
            }
        } catch (err) {
            setError("Error con el servidor.");
        }
    };

    return (
        <div>
            <Header />
            <div className="editar-subasta-container">
                <h2>Editar Subasta</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="datetime-local"
                        name="closing_date"
                        value={formData.closing_date ? new Date(formData.closing_date).toISOString().slice(0, 16) : ""}
                        onChange={handleChange}
                        placeholder="Fecha de cierre"
                        required
                    />
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                        placeholder="Título"
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        placeholder="Descripción"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price || ""}
                        onChange={handleChange}
                        placeholder="Precio"
                        required
                    />
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating || ""}
                        onChange={handleChange}
                        placeholder="Rating"
                        required
                    />
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock || ""}
                        onChange={handleChange}
                        placeholder="Stock"
                        required
                    />
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand || ""}
                        onChange={handleChange}
                        placeholder="Marca"
                    />
                    <input
                        type="url"
                        name="thumbnail"
                        value={formData.thumbnail || ""}
                        onChange={handleChange}
                        placeholder="URL de la imagen (thumbnail)"
                        required
                    />
                    <select
                        name="category"
                        value={formData.category || ""}
                        onChange={handleSelectChange}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias?.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Guardar cambios</button>
                    {mensaje && <p className="mensaje-exito">{mensaje}</p>}
                    {error && <p className="mensaje-error">{error}</p>}
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default EditarSubasta;
