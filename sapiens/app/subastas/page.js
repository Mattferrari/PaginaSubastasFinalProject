"use client";

import React, { useState, useEffect } from "react";
import Subasta from "../../components/producto/producto";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./styles.subastas.css";
import Producto from "../../components/producto/producto";
import Link from "next/link";


const ListaSubastas = () => {
  const [subastas, setSubastas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState({
    nombre: "",
    categoria: "", // Solo una categoría seleccionable
    minPrecio: 0,
    maxPrecio: Infinity,
  });

  // Obtener categorías del backend
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

  useEffect(() => {
    const cargarSubastas = async () => {
      let allsubastas = [];
      let url = "http://127.0.0.1:8000/api/auctions/subastas/";

      try {
        while (url) {
          const response = await fetch(url);
          const data = await response.json();

          if (Array.isArray(data.results)) {
            allsubastas = [...allsubastas, ...data.results];
          }

          // Romper si no hay más resultados
          if (!data.next || data.results.length === 0) {
            break;
          }

          url = data.next;
        }

        setSubastas(allsubastas);
      } catch (error) {
        console.error("Error al cargar subastas paginadas:", error);
      }
    };

    cargarSubastas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoria") {
      setFiltros((prevFiltros) => ({
        ...prevFiltros,
        categoria: parseInt(value), // Actualizamos solo una categoría seleccionada
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

  const subastasFiltradas = subastas?.filter(subasta => {
    const matchesNombre = subasta.title.toLowerCase().includes(filtros.nombre.toLowerCase());
    const matchesCategoria = filtros.categoria ? subasta.category === filtros.categoria : true;
    const precioActual = subasta.price;
    const matchesPrecio = (filtros.minPrecio <= precioActual && (filtros.maxPrecio >= precioActual || filtros.maxPrecio === Infinity));

    return matchesNombre && matchesCategoria && matchesPrecio;
  });

  return (
    <div>
      <Header />
      <main>
        <h1>Listado de Subastas</h1>
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
              {categorias?.map(categoria => (
                <option key={categoria.id} value={categoria.id}> {/* Asumiendo que tienes un id y nombre para cada categoría */}
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="subastas">
          {subastasFiltradas.length > 0 ? (
            subastasFiltradas.slice(0, 6)?.map(subasta => (
              <Producto key={subasta.id} producto={subasta} />
            ))
          ) : (
            <div>Subasta no encontrada</div>
          )}
        </div>
        <Link href="/subastas/nueva">
          <button>Nueva subasta</button>
        </Link>

      </main>
      <Footer />
    </div>
  );
};

export default ListaSubastas;
