"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.registro.css"
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Register = () => {
  // form data initialized to ""
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    DNI: "",
    email: "",
    username: "",
    password: "",
    confirmation: "",
    birthdate: "",
    comunidad: "",
    ciudad: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [sendingText, setSendingText] = useState("")
  const [error, setError] = useState("");

  const handleRegister = async (formData) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
      method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            first_name: formData.name,
            last_name: formData.surname,
            birth_date: formData.birth_date, 
            locality: formData.ciudad,
            municipality: formData.comunidad
        }),
    });
    
    return response
  };


  useEffect(() => {
    const today = new Date();
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];
    const minDate = new Date(
      today.getFullYear() - 120,
      today.getMonth(),
      today.getDate()
    );
    document.getElementById("birthdate").setAttribute("max", maxDate);
    document.getElementById("birthdate").setAttribute("min", minDate.toISOString().split("T")[0]);
  }, []);

  const comunidades = {
    "Andalucía": ["Sevilla", "Granada", "Málaga", "Córdoba", "Cádiz"],
    "Cataluña": ["Barcelona", "Tarragona", "Girona", "Lleida"],
    "Madrid": ["Madrid", "Alcalá de Henares", "Getafe"],
    // Agrega más comunidades según sea necesario
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmation") {
      validatePasswords(name, value);
    }

    if (name === "comunidad") {
      setCiudades(comunidades[value] || []);
    }
  };

  const validatePasswords = (field, value) => {
    if (field === "password") {
      if (value.length < 8) {
        setPasswordError("La contraseña debe tener al menos 8 caracteres.");
      } else {
        setPasswordError("");
      }
    }
    if (field === "confirmation") {
      if (value !== formData.password) {
        setConfirmationError("Las contraseñas no coinciden.");
      } else {
        setConfirmationError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordError && !confirmationError) {
        const formData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            first_name: e.target.name.value,
            last_name: e.target.surname.value,
            birth_date: e.target.birthdate.value,
            locality: e.target.comunidad.value,
            municipality: e.target.ciudad.value,
        };

        try {
            const response = await handleRegister(formData);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || "Hubo un problema al crear el usuario.");
            }

            location.href = "../"; // Redirigir después de éxito

        } catch (error) {
            console.error("Error al crear usuario:", error.message);
            setSendingText(error.message); 
        }
    } else {
        setSendingText("El formulario no se pudo enviar");
    }
};


  return (
    <div>
      <Header />
      <main>
        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-group">
            <label className="FormLabel" htmlFor="name">Nombre</label>
            <input
              type="text"
              className="FormInput"
              name="name"
              id="name"
              placeholder="Nombre"
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label className="FormLabel" htmlFor="surname">Apellido</label>
            <input
              type="text"
              className="FormInput"
              name="surname"
              id="surname"
              placeholder="Apellido"
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label className="FormLabel" htmlFor="DNI">DNI/NIE</label>
            <input
              type="text"
              className="FormInput"
              name="DNI"
              id="DNI"
              placeholder="DNI/NIE"
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label className="FormLabel" htmlFor="email">Correo (alu.comillas.edu)</label>
            <input
              type="email"
              className="FormInput"
              name="email"
              id="email"
              placeholder="Correo (alu.comillas.edu)"
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label className="FormLabel" htmlFor="username">Usuario</label>
            <input
              type="text"
              className="FormInput"
              name="username"
              id="username"
              placeholder="Usuario"
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label className="FormLabel" htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="FormInput"
              name="password"
              id="password"
              placeholder="Contraseña"
              onChange={handleChange}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
  
          <div className="form-group">
            <label className="FormLabel" htmlFor="confirmation">Confirmar contraseña</label>
            <input
              type="password"
              className="FormInput"
              name="confirmation"
              id="confirmation"
              placeholder="Confirmar contraseña"
              onChange={handleChange}
              required
            />
            {confirmationError && <p className="error">{confirmationError}</p>}
          </div>
  
          <div className="form-group">
            <label className="FormLabel" htmlFor="birthdate">Fecha de nacimiento</label>
            <input
              type="date"
              className="FormInput"
              id="birthdate"
              name="birthdate"
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label className="FormLabel" htmlFor="comunidad">Comunidad</label>
            <select
              name="comunidad"
              id="comunidad"
              className="FormInput"
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una comunidad</option>
              {Object.keys(comunidades).map((com) => (
                <option key={com} value={com}>{com}</option>
              ))}
            </select>
          </div>
  
          <div className="form-group">
            <label className="FormLabel" htmlFor="ciudad">Ciudad</label>
            <select
              name="ciudad"
              id="ciudad"
              className="FormInput"
              onChange={handleChange}
              disabled={!formData.comunidad}
              required
            >
              <option value="">Selecciona una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>
          </div>
  
          <button type="submit" className="MoveButton">Registrarse</button>
          {sendingText && <p className="error">{sendingText}</p>}
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </main>
      <Footer />
    </div>
  );
  
};

export default Register;
