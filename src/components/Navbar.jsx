import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Importer l'icône utilisateur
import "../styles/Navbar.css"; // Importer le fichier CSS pour le style
import logo from "../assets/celtiis.png"; // Importer le logo (assurez-vous de placer l'image logo dans votre dossier `assets` ou un autre dossier approprié)

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      try {
        const response = await fetch("https://hackathon-celtiis-back-production.up.railway.app/api/user-info/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Met à jour l'état avec les informations utilisateur
        } else {
          console.error("Failed to fetch user info:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo Hackathon" className="navbar-logo-image" />
          <span className="navbar-title">Hackathon Celtiis</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
      </ul>
      {user ? (
        <div className="navbar-user-info">
          <FaUserCircle className="user-icon" /> {/* Ajout de l'icône utilisateur */}
          <span className="navbar-username">Bienvenue, {user.username}</span>
          <button className="logout-button" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      ) : (
        <div className="navbar-auth-links">
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;