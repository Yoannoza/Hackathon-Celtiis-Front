import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    // Simule une vérification côté serveur (remplacez par une vraie requête si nécessaire)
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Afficher un état de chargement pendant la vérification
  if (isAuthenticated === null) {
    return <div>Chargement...</div>;
  }

  // Rediriger si l'utilisateur n'est pas connecté
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children; // Rendre le contenu si authentifié
};
