"use client";  

import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./styles.inicio.css";
import { useRouter } from 'next/navigation';

import Link from "next/link";

const LogIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [valid, setvalid] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin(username, password); 
  };


  const handleLogin = async (username, password) => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });
      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        console.error("Error en el login:", data);
        setError("Ha habido un problema");
      }else{
        setvalid("Registrado con éxito");
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        console.log(localStorage.getItem("access_token"))
        console.log(localStorage.getItem("refresh_token"))
        router.push('/');
      }
    } catch (error) {
      console.error("Error con el servidor:", error);
      setError("Error en la conexión");
    }
  };

  return (
    <div>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            {valid && <p style={{ color: "green" }}>{valid}</p>}
          </form>
          <p className="LogInFields">
            <Link href="/">
              <img src="../imgs/homeIcon2.jpeg" alt="" className="homeIcon" />
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LogIn;
