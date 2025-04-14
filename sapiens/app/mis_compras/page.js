"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./styles.mis_compras.css";
import Puja from "../../components/puja/puja";
import Link from "next/link";


const ListaMisPujas = () => {
  const [pujas, setpujas] = useState([]);

  useEffect(() => {
    const cargarpujas = async () => {
        let allpujas = [];
        let url = "http://127.0.0.1:8000/api/auctions/subastas/mis-pujas/";
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
      
            if (Array.isArray(data.results)) {
              allpujas = [...allpujas, ...data.results];
            }
      
            // Romper si no hay más resultados
            if (!data.next || data.results.length === 0) {
              break;
            }
      
            url = data.next;
          }
          setpujas(allpujas);
        } catch (error) {
          console.error("Error al cargar pujas paginadas:", error);
        }
      };

    cargarpujas();
  }, []);
  return (
    <div>
      <Header />
      <main>
        <h1>Listado de pujas</h1>
        <div className="pujas">
            {pujas.length > 0 ? (pujas.slice(0, 6).map(puja_ => (
                <Puja key={puja_.id} puja={puja_} />
            ))
            ) : (
            <div>puja no encontrada</div>
            )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListaMisPujas;
