import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Register.css"; // Fichier CSS pour le style

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        username,
        password,
      });

      // Enregistrez le token dans le localStorage
      localStorage.setItem("jwt", response.data.access_token);

      // Rediriger vers le tableau de bord ou la page de connexion
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Inscription</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Votre nom"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
            />
          </div>
          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? "Création..." : "S'inscrire"}
          </button>
        </form>
        <p className="redirect-message">
          Déjà un compte ? <a href="/login">Connectez-vous ici</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
