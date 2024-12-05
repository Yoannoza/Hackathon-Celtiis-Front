// PublicRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté via le token JWT
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    } else {
      setIsAuthenticated(false); // L'utilisateur n'est pas authentifié
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Chargement...</div>; // En attendant de savoir si l'utilisateur est connecté
  }

  if (isAuthenticated) {
    // Si l'utilisateur est authentifié, redirigez-le vers le tableau de bord
    // return <Navigate to="/dashboard" />;
  }

  // Si l'utilisateur n'est pas authentifié, affichez la page de connexion ou d'inscription
  return children;
};
