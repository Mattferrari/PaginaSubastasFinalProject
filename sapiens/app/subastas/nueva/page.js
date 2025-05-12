"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.nuevaSubastas.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";

const CrearSubasta = () => {
    const router = useRouter();
    const [categorias, setCategorias] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        rating: "",
        stock: "",
        brand: "",
        category: "",
        thumbnail: "",
        closing_date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("access_token");

        const response = await fetch("http://127.0.0.1:8000/api/auctions/subastas/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...form,
                creation_date: new Date().toISOString(),
            }),
        });

        if (response.ok) {
            const nuevaSubasta = await response.json();
            router.push(`/detalle/${nuevaSubasta.id}`);
        } else {
            const errorData = await response.json();
            alert("Error al crear la subasta: " + JSON.stringify(errorData));
        }
    };

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/auctions/subastas/categorias/"); // Suponiendo que tienes un endpoint para las categorías
                const data = await response.json();

                if (Array.isArray(data.results)) {
                    setCategorias(data.results); // Guardar las categorías en el estado
                }
                // else {
                //   console.error("Error: data no es un array", data);
                // }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        cargarCategorias();
    }, []);

    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <h1>Crear nueva subasta</h1>
                    <form onSubmit={handleSubmit} className="form">
                        <input type="text" name="title" placeholder="Título" required onChange={handleChange} />
                        <textarea name="description" placeholder="Descripción" required onChange={handleChange} />
                        <input type="number" name="price" placeholder="Precio de salida" step="0.01" required onChange={handleChange} />
                        <input type="number" name="stock" placeholder="Stock" min="1" required onChange={handleChange} />
                        <input type="text" name="brand" placeholder="Marca" required onChange={handleChange} />
                        <select name="category" required onChange={handleChange}>
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <input type="url" name="thumbnail" placeholder="URL de la imagen" required onChange={handleChange} />
                        <input type="datetime-local" name="closing_date" required onChange={handleChange} />

                        <button type="submit">Crear Subasta</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CrearSubasta;
