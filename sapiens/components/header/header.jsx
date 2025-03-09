"use client";

import React, { useState, useEffect } from "react";
import "./styles.header.css";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token encontrado:", token); // Verificar si el token está en el localStorage
    if (token) {
      console.log("Token encontrado, actualizando isAuthenticated");
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Asegúrate de que el loading se cambie a false después de la verificación
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");  // Eliminar el token del localStorage
    setIsAuthenticated(false);         // Actualizar el estado a false
    console.log("Cierre de sesión exitoso");
  };

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar cargando mientras se valida el token
  }

  return (
    <header>
      <nav className="nav-bar">
        <div className="logo">sAPIens</div>

        <div className="search-container">
          <input
            type="text"
            id="searchInput"
            placeholder="Buscar por producto, categoría, etc."
          />
          <button id="searchButton">🔍</button>
        </div>

        {!isAuthenticated ? (
          <div className="auth-links">
            <Link href="/inicio">
              <button>Iniciar sesión</button>
            </Link>
            <Link href="/registro">
              <button>Registrarse</button>
            </Link>
          </div>
        ) : 
        <div className="auth-links"><button onClick={handleLogout}>Cerrar sesión</button></div>
        }

      </nav>

      <nav className="menu-bar">
        <Link href="/">
          <span className="icon">🏠</span>Inicio
        </Link>
        <Link href="/subastas">
          <span className="icon">📦</span>Productos
        </Link>
        <Link href="/subastas">
          <span className="icon">🛒</span>Carrito
        </Link>
        <Link href="/subastas">
          <span className="icon">📄</span>Mis Compras
        </Link>
        <Link href="/userCRUD">
          <span className="icon">⚙️</span>Configuración
        </Link>
      </nav>
    </header>
  );
};

export default Header;
