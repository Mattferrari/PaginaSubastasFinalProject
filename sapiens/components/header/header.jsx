"use client";
import React, { useState, useEffect } from "react";
import "./styles.header.css";
import Link from "next/link";


const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("Token encontrado:", token);
    if (token) {
      console.log("Token encontrado, actualizando isAuthenticated");
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");  // Elimina el token correcto
    setIsAuthenticated(false);
    console.log("Cierre de sesión exitoso");
    window.location.href = "/";
  };

  if (isLoading) {
    return <div>Cargando...</div>; // Muestra cargando mientras se verifica el token
  }

  return (
    <header>
      <nav className="nav-bar">
        <div className="logo">sAPIens</div>

        <div className="search-container">
          <input type="text" id="searchInput" placeholder="Buscar por producto, categoría, etc." />
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
        ) : (
          <div className="auth-links">
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </nav>

      <nav className="menu-bar">
        <Link href="/">
          <span className="icon">🏠</span>Inicio
        </Link>
        <Link href="/subastas">
          <span className="icon">📦</span>Productos
        </Link>
        <Link href="/mis_compras">
          <span className="icon">🛒</span>Mis pujas
        </Link>
        <Link href="/mis_subastas">
          <span className="icon">📄</span>Mis subastas
        </Link>
        <Link href="/mis_ratings">
          <span className="icon">⭐</span>Mis ratings
        </Link>
        <Link href="/mis_comentarios">
          <span className="icon">💬</span>Mis comentarios
        </Link>

        <Link href="/usuario">
          <span className="icon">⚙️</span>Configuración
        </Link>
      </nav>
    </header>
  );
};

export default Header;
