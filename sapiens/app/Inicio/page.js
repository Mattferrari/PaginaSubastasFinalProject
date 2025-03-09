"use client";  

import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./styles.inicio.css";

import Link from "next/link";


const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí manejarías la lógica de login, por ejemplo, validando con una API.
    console.log('Iniciar sesión con:', username, password);
  };

  return (
    <div>
      {/* Aquí importamos el Header ya hecho */}
      <Header />

      <main>
        <Link href="/"><img src="../imgs/logoSubAstas.png" alt="Logo de sAPIens" className="Logo" /></Link>
        <div className="LogInArea">
          <h1 className="LogInText">Inicie sesión</h1>
          <form className="LogInFields" onSubmit={handleSubmit}>
            <label htmlFor="username" className="LogInLabel">Usuario:</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              required
              className="LogInInputs"
              placeholder="usuario123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label htmlFor="password" className="LogInLabel">Contraseña:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              required
              className="LogInInputs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <p className="LogInLabel">
              ¿no tiene cuenta? <br />
              <button type="button">¡cree una!</button>
            </p>
            <br />
            <button type="reset" className="SendButton">Limpiar</button>
            <button type="submit" className="SendButton">Enviar</button>
            <br />
          </form>
          <p className="LogInFields">
            <Link href="/">
              <img src="../imgs/homeIcon2.jpeg" alt="" className="homeIcon" />
            </Link>
          </p>
        </div>
      </main>

      {/* Aquí importamos el Footer ya hecho */}
      <Footer />
    </div>
  );
};

export default LogIn;
