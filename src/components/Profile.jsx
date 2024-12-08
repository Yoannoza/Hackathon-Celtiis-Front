import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://hackathon-celtiis-back-production.up.railway.app//api/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erreur de récupération des données de l'utilisateur", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Mon Profil</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Nom: {user.name}</p>
          <p>Projets évalués: {user.projects.length}</p>
        </div>
      ) : (
        <p>Chargement des informations...</p>
      )}
    </div>
  );
};

export default Profile;
