"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.userCRUD.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        surname: "",
        email: "",
        username: "",
        birthdate: "",
        comunidad: "",
        ciudad: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const handleGetProfile = async () => {
            try {
                let token = localStorage.getItem("token");
                console.log(token)
                const response = await fetch("https://das-p2-backend.onrender.com/api/users/profile/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });



                if (response.ok) {
                    const data = await response.json();
                    setProfileData({
                        name: data.first_name,
                        surname: data.last_name,
                        email: data.email,
                        username: data.username,
                        birthdate: data.birth_date,
                        comunidad: data.locality,
                        ciudad: data.municipality,
                    });
                    console.log(data)
                } else {
                    console.error("Error al obtener el perfil:", response.statusText);
                    setError("Error al obtener el perfil");
                }
            } catch (error) {
                console.error("Error al obtener el perfil:", error);
                setError("Error con el servidor");
            }
        };

        handleGetProfile();
    }, []);

    return (
        <div>
            <Header />
            <main>
                <form className="formulario">
                    <div className="form-group">
                        <label className="FormLabel" htmlFor="name">Nombre</label>
                        <label className="FormData" htmlFor="name">{profileData.name}</label>
                    </div>
    
                    <div className="form-group">
                        <label className="FormLabel" htmlFor="surname">Apellido</label>
                        <label className="FormData" htmlFor="surname">{profileData.surname}</label>
                    </div>
    
                    <div className="form-group">
                        <label className="FormLabel" htmlFor="email">Correo (alu.comillas.edu)</label>
                        <label className="FormData" htmlFor="email">{profileData.email}</label>
                    </div>
    
                    <div className="form-group">
                        <label className="FormLabel" htmlFor="username">Usuario</label>
                        <label className="FormData" htmlFor="username">{profileData.username}</label>
                    </div>
    
                    <div className="form-group">
                        <label className="FormLabel" htmlFor="birthdate">Fecha de nacimiento</label>
                        <label className="FormData" htmlFor="birthdate">{profileData.birthdate}</label>
                    </div>
    
                    <div className="form-group">
                        <label className="FormLabel" htmlFor="comunidad">Comunidad</label>
                        <label className="FormData" htmlFor="comunidad">{profileData.comunidad}</label>
                    </div>
    
                    <div className="form-group">
                        <label className="FormLabel" htmlFor="ciudad">Ciudad</label>
                        <label className="FormData" htmlFor="ciudad">{profileData.ciudad}</label>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
