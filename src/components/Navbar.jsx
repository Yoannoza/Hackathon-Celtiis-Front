import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Importer le fichier CSS pour le style

import logo from "../assets/celtiis.png"; // Importer le logo (assurez-vous de placer l'image logo dans votre dossier `assets` ou un autre dossier approprié)

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo Hackathon" />
          Hackathon Celtiis
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        {/* Si vous souhaitez afficher un bouton de déconnexion, décommentez la ligne suivante */}
        {/* <li><button className="logout-button" onClick={handleLogout}>Déconnexion</button></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
