"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import Producto from "../../components/producto/producto";

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);

    const [filtros, setFiltros] = useState({
        nombre: "",
        categorias: [],
        minPrecio: 0,
        maxPrecio: Infinity,
    });
    
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
    const cargarProductos = async () => {
        const response = await fetch("rute"); // TODO add products JSON to sapiens to enrute it
        const data = await response.json();
        setProductos(data);

        const tagsUnicos = new Set();
        data.products.forEach(producto => {
            producto.tags.forEach(tag => tagsUnicos.add(tag));
        });
        setCategorias([...tagsUnicos]);
    };

    cargarProductos();
    }, []);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        // select or remove categories
        if (name === "categorias") {
            setFiltros((prevFiltros) => ({
                ...prevFiltros,
                categorias: checked
                    ? [...prevFiltros.categorias, value]
                    : prevFiltros.categorias.filter(categoria => categoria !== value),
            }));
        } else {
            // select price range
            const numericValue = parseFloat(value);
            setFiltros((prevFiltros) => {
                if (name === "minPrecio" && (numericValue < 0 || isNaN(numericValue))) {
                    return { ...prevFiltros, [name]: 0 }; 
                }
                if (name === "maxPrecio" && (numericValue <= prevFiltros.minPrecio || isNaN(numericValue))) {
                    return { ...prevFiltros, [name]: Infinity }; 
                }
                return {
                    ...prevFiltros,
                    [name]: numericValue,
                };
            });
        }
    };


    const productosFiltrados = productos.filter(producto => {
        const matchesNombre = producto.title.toLowerCase().includes(filtros.nombre.toLowerCase());
        const matchesCategorias = filtros.categorias.every(categoria => producto.tags.includes(categoria));
        const precioActual = producto.max_puja + producto.subida_minima;
        const matchesPrecio = (filtros.minPrecio <= precioActual && (filtros.maxPrecio >= precioActual || filtros.maxPrecio === Infinity));

        return matchesNombre && matchesCategorias && matchesPrecio;
    });

    return (
        <div>
            <h1>Listado de Productos</h1>
            <div>
                <input
                    type="text"
                    name="nombre"
                    value={filtros.nombre}
                    onChange={e => setFiltros({ ...filtros, nombre: e.target.value })}
                    placeholder="Buscar por nombre"
                />
                <input
                    type="number"
                    name="minPrecio"
                    value={filtros.minPrecio === 0 ? "" : filtros.minPrecio}
                    onChange={handleChange}
                    placeholder="Precio mínimo"
                />
                <input
                    type="number"
                    name="maxPrecio"
                    value={filtros.maxPrecio === Infinity ? "" : filtros.maxPrecio}
                    onChange={handleChange}
                    placeholder="Precio máximo"
                />
                <div>
                    <h2>Categorías</h2>
                    {categorias.map(categoria => (
                        <div key={categoria}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="categorias"
                                    value={categoria}
                                    onChange={handleChange}
                                />
                                {categoria}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="productos">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map(producto => (
                        <Producto key={producto.id} producto={producto} /> 
                    ))
                ) : (
                    <div>Producto no encontrado</div>
                )}
            </div>
        </div>
    );
};

export default ListaProductos;
