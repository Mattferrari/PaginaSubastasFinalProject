"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./styles.mis_comentarios.css";
import Producto from "../../components/producto/producto";
import Link from "next/link";

const ListaMisComentarios = () => {
  const [comentariosAgrupados, setComentariosAgrupados] = useState({}); // { subastaId: [comentarios] }
  const [subastas, setSubastas] = useState({}); // { subastaId: subastaData }

  useEffect(() => {
    const cargarComentarios = async () => {
      let allComentarios = [];
      let url = "http://127.0.0.1:8000/api/auctions/subastas/comentarios/user/";
      const token = localStorage.getItem("access_token");

      try {
        while (url) {
          const response = await fetch(url, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
          const data = await response.json();

          if (Array.isArray(data.value)) {
            allComentarios = [...allComentarios, ...data.value];
          }

          if (!data.next || data.results.length === 0) {
            break;
          }
          url = data.next;
        }

        const agrupados = allComentarios.reduce((acc, comentario) => {
          if (!acc[comentario.subasta]) {
            acc[comentario.subasta] = [];
          }
          acc[comentario.subasta].push(comentario);
          return acc;
        }, {});

        setComentariosAgrupados(agrupados);
      } catch (error) {
        console.error("Error al cargar comentarios:", error);
      }
    };

    cargarComentarios();
  }, []);

  useEffect(() => {
    const cargarSubastas = async () => {
      const nuevasSubastas = {};
      await Promise.all(
        Object.keys(comentariosAgrupados).map(async (idSubasta) => {
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/auctions/subastas/${idSubasta}/`);
            if (!response.ok) throw new Error("Error al obtener la subasta");
            const data = await response.json();
            nuevasSubastas[idSubasta] = data;
          } catch (error) {
            console.error(`Error al obtener la subasta ${idSubasta}:`, error);
            nuevasSubastas[idSubasta] = null; // Manejo de error
          }
        })
      );
      setSubastas(nuevasSubastas);
    };

    if (Object.keys(comentariosAgrupados).length > 0) {
      cargarSubastas();
    }
  }, [comentariosAgrupados]);

  return (
    <div>
      <Header />
      <main>
        <h1>Listado de Comentarios</h1>
        <div className="pujas">
          {Object.entries(comentariosAgrupados).length > 0 ? (
            Object.entries(comentariosAgrupados).slice(0, 6).map(([idSubasta, comentarios]) => (
              <div key={idSubasta}>
                {subastas[idSubasta] ? (
                  <Producto key={idSubasta} producto={subastas[idSubasta]} />
                ) : (
                  <div>Subasta no encontrada</div>
                )}
                <div className="comentarios">
                  {comentarios.map((comentario, index) => (
                    <div key={index} className="comentario">
                      <p><strong>{comentario.titulo}</strong></p>
                      <p>{comentario.cuerpo}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>No se encontraron comentarios.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListaMisComentarios;
