"use client";

import React, { useState } from "react";
import styles from "./styles.editarusuario.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";

const EditarContrasena = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Las nuevas contraseñas no coinciden.");
            return;
        }

        try {
            const token = localStorage.getItem("access_token");

            const response = await fetch("http://127.0.0.1:8000/api/users/me/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    password: newPassword
                }),
            });

            if (response.ok) {
                setMensaje("Contraseña actualizada correctamente.");
                setError("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                const data = await response.json();
                setError(data.detail || "Error al actualizar la contraseña.");
                setMensaje("");
            }
        } catch (err) {
            setError("Error con el servidor.");
            setMensaje("");
        }
    };

    return (
        <div>
            <Header />
            <div className="editar-contrasena-container">
                <h2>Editar Contraseña</h2>
                <form onSubmit={handlePasswordUpdate} className="editar-form">
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Actualizar Contraseña</button>
                    {mensaje && <div className="mensaje-exito">{mensaje}</div>}
                    {error && <div className="mensaje-error">{error}</div>}
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default EditarContrasena;
