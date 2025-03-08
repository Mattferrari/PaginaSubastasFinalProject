import React from "react";
import "./styles.header.css"; 

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
          <a href="../LogIn/LogIn.html">
            <button>Iniciar sesión</button>
          </a>
          <a href="../Registro/registro.html">
            <button>Registrarse</button>
          </a>
        </div>
      </nav>

      {/* Segunda barra de navegación */}
      <nav className="menu-bar">
        <a href="../index.html">
          <span className="icon">🏠</span>Inicio
        </a>
        <a href="#">
          <span className="icon">📦</span>Productos
        </a>
        <a href="#">
          <span className="icon">🛒</span>Carrito
        </a>
        <a href="#">
          <span className="icon">📄</span>Mis Compras
        </a>
        <a href="#">
          <span className="icon">⚙️</span>Configuración
        </a>
      </nav>
    </header>
  );
};

export default Header;
