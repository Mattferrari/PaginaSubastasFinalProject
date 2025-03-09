import React from "react";
import "./styles.footer.css"; 

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <h2 className="footerTitle">CONTÁCTANOS</h2>

        <div className="subcontainer">
          <div className="footerInfo">
            <img src="/imgs/perfilLogo.avif" alt="Perfil Logo" className="perfilLogo" />
            <p>Sobre Nosotros</p>
          </div>

          <div className="footerInfo">
            <img src="/imgs/InstagramLogo.png" alt="Instagram Logo" className="instaLogo" />
            <p>Nuestro Instagram</p>
          </div>

          <div className="footerInfo">
            <a href="https://www.instagram.com/">
              <img src="/imgs/logoX.net_.png" alt="X Logo" className="xLogo" />
            </a>
            <p>Nuestro X</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
