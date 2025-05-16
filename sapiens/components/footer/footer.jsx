import React from "react";
import "./styles.footer.css"; 

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <h2 className="footerTitle">CONTÁCTANOS</h2>

        <div className="subcontainer">
          <div className="footerInfo">
            <a href="http://es.wikipedia.org/wiki/Special:Random">
            <img src="/imgs/perfilLogo.avif" alt="Perfil Logo" className="perfilLogo" />
            </a>
            <p>Sobre Nosotros</p>
          </div>

          <div className="footerInfo">
            <a href="http://es.wikipedia.org/wiki/Special:Random">
              <img src="/imgs/InstagramLogo.png" alt="Instagram Logo" className="instaLogo" />
            </a>
            <p>Nuestro Instagram</p>
          </div>

          <div className="footerInfo">
            <a href="http://es.wikipedia.org/wiki/Special:Random">
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
