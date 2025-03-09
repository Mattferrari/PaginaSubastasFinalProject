import React from "react";
import "./styles.header.css"; 
import Link from "next/link";

const Header = () => {

  return (
    <header>
      {/* Primera barra de navegación */}
      <nav className="nav-bar">
        <div className="logo">sAPIens</div>

        <div className="search-container">
          <input type="text" id="searchInput" placeholder="Buscar por producto, categoría, etc." />
          <button id="searchButton">🔍</button>
        </div>

        <div className="auth-links">
 
          <Link href="/inicio">
            <button>Iniciar sesión</button>
          </Link>

          <Link href="/registro">
            <button>Registrarse</button>
          </Link>
        </div>
      </nav>

      {/* Segunda barra de navegación */}
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
        <Link href="/subastas">
          <span className="icon">⚙️</span>Configuración
        </Link>
      </nav>
    </header>
  );
};

export default Header;
