import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';  // Assurez-vous que votre fichier CSS est importé

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bienvenue sur la plateforme des jurys <br/>du <span>Hackathon Celtiis</span></h1>
        <br/><br/>
        <p className="home-subtitle">
          Participez à cette aventure technologique et montrez votre talent.
          <br />
          Connectez-vous ou inscrivez-vous pour démarrer.
        </p>
        <br/>
        <div className="home-buttons">
          <Link to="/login" className="home-btn login-btn">Se connecter</Link>
          <Link to="/register" className="home-btn register-btn">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
