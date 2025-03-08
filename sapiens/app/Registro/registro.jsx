import React, { useState, useEffect } from "react";

const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError && !confirmationError) {
      console.log("Formulario enviado", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
      <input type="text" name="surname" placeholder="Apellido" onChange={handleChange} required />
      <input type="text" name="DNI" placeholder="DNI/NIE" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo (alu.comillas.edu)" onChange={handleChange} required />
      <input type="text" name="username" placeholder="Usuario" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      {passwordError && <p>{passwordError}</p>}
      <input type="password" name="confirmation" placeholder="Confirmar contraseña" onChange={handleChange} required />
      {confirmationError && <p>{confirmationError}</p>}
      <input type="date" id="birthdate" name="birthdate" onChange={handleChange} required />
      <select name="comunidad" onChange={handleChange} required>
        <option value="">Selecciona una comunidad</option>
        {Object.keys(comunidades).map((com) => (
          <option key={com} value={com}>{com}</option>
        ))}
      </select>
      <select name="ciudad" onChange={handleChange} disabled={!formData.comunidad} required>
        <option value="">Selecciona una ciudad</option>
        {ciudades.map((ciudad) => (
          <option key={ciudad} value={ciudad}>{ciudad}</option>
        ))}
      </select>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
