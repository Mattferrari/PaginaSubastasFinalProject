"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./styles.mis_ratings.css";
import Producto from "../../components/producto/producto";
import Link from "next/link";

const ListaMisPujas = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const cargarRatings = async () => {
      let allRatings = [];
      let url = "http://127.0.0.1:8000/api/auctions/subastas/rate/user/";
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
            allRatings.push(...data.value);
          }

          if (!data.next || data.length === 0) break;
          url = data.next;
        }


        // Obtener la subasta de cada rating
        const ratingsConSubasta = await Promise.all(
          allRatings.map(async (rating) => {
            if (!rating.auction) {
              return { ...rating, subasta: null };
            }

            try {
              const responseSubasta = await fetch(
                `http://127.0.0.1:8000/api/auctions/subastas/${rating.auction}/`,
                {
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                  }
                }
              );
              const subasta = await responseSubasta.json();
              return { ...rating, subasta };
            } catch (error) {
              alert(`Error al cargar la subasta para el rating ${rating.id}:`, error);
              return { ...rating, subasta: null };
            }
          })
        );

        setRatings(ratingsConSubasta);
      } catch (error) {
        alert("Error al cargar ratings:", error);
      }
    };

    cargarRatings();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h1>Listado de Ratings</h1>
        <div className="pujas">
          {ratings.length > 0 ? (
            ratings.slice(0, 6).map((rating) => (
              <div key={rating.auction}>
                {rating.subasta ? (
                  <Producto key={rating.subasta.id} producto={rating.subasta} />
                ) : (
                  <div>Subasta no encontrada</div>
                )}
                {/* Mostrar el rating debajo de la subasta */}
                <div className="rating-info">
                  <p>Rating: {rating.value ?? "Sin valoración"}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No se encontraron ratings.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListaMisPujas;
