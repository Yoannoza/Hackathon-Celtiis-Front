import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token); // Si le token existe, l'utilisateur est connecté
  }, []);

  return isAuthenticated;
};
