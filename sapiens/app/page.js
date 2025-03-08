import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./page.module.css";

const Page = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "imgs/logoSubAstas.png",
      title: "Sobre Nosotros",
      text: "Esta es una página de subastas. Los creadores de esta página web son dos ingenieros de la Universidad Pontificia de Comillas para la asignatura de Servicios y Aplicaciones web. El objetivo de esta página es el de ofrecer un entorno confortable con todo tipo de productos útiles del día a día. Cientos de personas se encuentran hoy suscritas a esta web.",
    },
    {
      img: "imgs/personas_fondo.webp",
      title: "Regístrate Gratis",
      text: "Accede a subastas y puja por los mejores productos.",
    },
    {
      img: "imgs/privacidadImg.jpg",
      title: "Compra Segura",
      text: "Garantizamos una experiencia segura y confiable. Tus datos quedarán protegidos para garantizar tu seguridad. ¡Tu seguridad y comodidad es lo más importante!",
    },
  ];

  const moverCarrusel = (direction) => {
    setCurrentSlide((prev) => (prev + direction + slides.length) % slides.length);
  };

  return (
    <>
      <Header />
      <main>
        <section>
          <h1>Bienvenido a la mejor página de subastas</h1>
        </section>

        <div className="carousel">
          <button className="prev" onClick={() => moverCarrusel(-1)}>
            &#10094;
          </button>
          <div className="carousel-content">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? "active" : ""}`}
              >
                <img src={slide.img} alt={`Imagen ${index + 1}`} />
                <div className="text">
                  <h2>{slide.title}</h2>
                  <p>{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="next" onClick={() => moverCarrusel(1)}>
            &#10095;
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Page;
