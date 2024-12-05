import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/ProjectTable";
import Leaderboard from "./components/Dashboard/Leaderboard";
import NotFound from "./components/NotFound";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { PublicRoute } from "./components/Auth/PublicRoute";
import "./App.css"

const App = () => {
  const location = useLocation(); // useLocation doit être appelé ici, dans le contexte du Router

  const showNavbar = location.pathname !== "/leaderboard";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        {/* Pages accessibles uniquement si non connecté */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Pages accessibles uniquement si connecté */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Pages accessibles à tous */}
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
};

// Enveloppez App dans le Router dans index.js ou au niveau de ce fichier pour éviter l'erreur
export default () => (
  <Router>
    <App />
  </Router>
);
