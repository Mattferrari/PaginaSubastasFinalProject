"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Producto from "../../components/producto/producto";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./styles.subastas.css";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({
    nombre: "",
    categoria: "", // Solo una categoría seleccionable
    minPrecio: 0,
    maxPrecio: Infinity,
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        // Asegúrate de que la respuesta es un objeto que contiene 'products'
        if (Array.isArray(data.products)) {
          setProductos(data.products);

          const tagsUnicos = new Set();
          data.products.forEach(producto => {
            producto.tags.forEach(tag => tagsUnicos.add(tag));
          });
          setCategorias([...tagsUnicos]);
        } else {
          console.error("Error: data.products no es un array", data);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    cargarProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoria") {
      setFiltros((prevFiltros) => ({
        ...prevFiltros,
        categoria: value, // Actualizamos solo una categoría seleccionada
      }));
    } else {
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
    console.log('filtros.categoria', filtros.categoria);
    const matchesCategoria = filtros.categoria ? producto.tags.includes(filtros.categoria) : true;
    const precioActual = producto.price;
    const matchesPrecio = (filtros.minPrecio <= precioActual && (filtros.maxPrecio >= precioActual || filtros.maxPrecio === Infinity));

    // console.log('Producto:', producto.tags, 'Filtros:', filtros, 'matchesCategoria:', matchesCategoria);
    console.log(`matchesNombre: ${matchesNombre}, matches Categoria: ${matchesCategoria}, matchesPrecio: ${matchesPrecio}`);
    console.log(`${filtros.maxPrecio} ${filtros.minPrecio} ${precioActual}`)
    console.log(`${filtros.minPrecio <= precioActual}`)
    return matchesNombre && matchesCategoria && matchesPrecio;
  });

  console.log('Productos filtrados:', productosFiltrados);

  return (
    <div>
      <Header />
      <main>
        <h1>Listado de Productos</h1>
        <div>
          <input
            className="inputs"
            type="text"
            name="nombre"
            value={filtros.nombre}
            onChange={e => setFiltros({ ...filtros, nombre: e.target.value })}
            placeholder="Buscar por nombre"
          />
          <input
            className="inputs"
            type="number"
            name="minPrecio"
            value={filtros.minPrecio === 0 ? "" : filtros.minPrecio}
            onChange={handleChange}
            placeholder="Precio mínimo"
          />
          <input
            className="inputs"
            type="number"
            name="maxPrecio"
            value={filtros.maxPrecio === Infinity ? "" : filtros.maxPrecio}
            onChange={handleChange}
            placeholder="Precio máximo"
          />
          <div>
            <h2>Categorías</h2>
            <select name="categoria" value={filtros.categoria} onChange={handleChange}>
              <option value="">Seleccionar categoría</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="productos">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.slice(0, 9).map(producto => (
              <Producto key={producto.id} producto={producto} />
            ))
          ) : (
            <div>Producto no encontrado</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListaProductos;
