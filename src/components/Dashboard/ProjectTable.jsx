import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ProjectTable.css";

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [votes, setVotes] = useState({});
  const [submittedProjects, setSubmittedProjects] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    axios
      .get("https://hackathon-celtiis-back-production.up.railway.app/api/projects/")
      .then((response) => setProjects(response.data))
      .catch((error) =>
        toast.error("Erreur de récupération des projets", { position: "top-right" })
      );

    const storedVotes = JSON.parse(localStorage.getItem("votes")) || {};
    setVotes(storedVotes);

    const storedSubmitted = JSON.parse(localStorage.getItem("submittedProjects")) || [];
    setSubmittedProjects(storedSubmitted);
  }, []);

  const handleVoteChange = (projectId, criteria, value) => {
    setVotes((prevVotes) => {
      const updatedVotes = {
        ...prevVotes,
        [projectId]: {
          ...prevVotes[projectId],
          [criteria]: parseInt(value, 10),
        },
      };

      localStorage.setItem("votes", JSON.stringify(updatedVotes));
      return updatedVotes;
    });
  };

  const handleVoteSubmit = (projectId) => {
    const vote = votes[projectId];
    if (!vote) {
      toast.warn("Veuillez remplir tous les critères avant de voter.", { position: "top-right" });
      return;
    }

    const requiredCriteria = [
      "fonctionnalite",
      "outils_specifiques",
      "ux_ui",
      "originalite",
      "faisabilite_technique",
      "potentiel_impact",
      "presentation",
    ];

    for (const criteria of requiredCriteria) {
      if (!vote[criteria]) {
        toast.warn(`Veuillez renseigner le champ ${criteria} pour ce projet.`, { position: "top-right" });
        return;
      }
    }

    axios
      .post(
        "https://hackathon-celtiis-back-production.up.railway.app/api/votes/",
        { project: projectId, ...vote },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(() => {
        toast.success("Vote enregistré avec succès !", { position: "top-right" });

        // Marque le projet comme soumis
        setSubmittedProjects((prevSubmitted) => {
          const updatedSubmitted = [...prevSubmitted, projectId];
          localStorage.setItem("submittedProjects", JSON.stringify(updatedSubmitted));
          return updatedSubmitted;
        });
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.detail || "Vous avez déjà voté !";
        toast.error(errorMessage, { position: "top-right" });
      });
  };

  const calculateTotal = (projectId) => {
    const vote = votes[projectId];
    if (!vote) return 0;

    const criteria = [
      "fonctionnalite",
      "outils_specifiques",
      "ux_ui",
      "originalite",
      "faisabilite_technique",
      "potentiel_impact",
      "presentation",
    ];

    return criteria.reduce((total, criterion) => total + (vote[criterion] || 0), 0);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const totalA = calculateTotal(a.id);
    const totalB = calculateTotal(b.id);

    if (sortOrder === "asc") return totalA - totalB;
    if (sortOrder === "desc") return totalB - totalA;
    return 0;
  });

  const handleSortToggle = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "asc" ? "desc" : prevSortOrder === "desc" ? null : "asc"
    );
  };

  const criteriaLimits = {
    fonctionnalite: 10,
    outils_specifiques: 10,
    ux_ui: 10,
    originalite: 5,
    faisabilite_technique: 5,
    potentiel_impact: 5,
    presentation: 5,
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="dash-title"> Table des Projets </h2>
      <table className="project-table">
        <thead>
          <tr>
            <th>Equipe</th>
            <th>Projet  <br /> ( sur 10 )</th>
            <th>Fonctionnalités  <br /> ( sur 10 )</th>
            <th>Outils Spécifiques  <br /> ( sur 10 )</th>
            <th>UX/UI  <br /> (sur 5)</th>
            <th>Originalité  <br /> ( sur 5 )</th>
            <th>Faisabilité Technique  <br /> ( sur 5 )</th>
            <th>Potentiel Impact  <br /> ( sur 5 )</th>
            <th>Présentation <br /> ( sur 5 )</th>
            <th onClick={handleSortToggle} style={{ cursor: "pointer" }}>
              Total{" "}
              <FontAwesomeIcon
                icon={
                  sortOrder === "asc"
                    ? faSortUp
                    : sortOrder === "desc"
                    ? faSortDown
                    : faSort
                }
              />
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.team}</td>
              <td>{project.name}</td>
              {Object.keys(criteriaLimits).map((criteria) => (
                <td key={criteria}>
                  <select
                    value={votes[project.id]?.[criteria] || 0}
                    onChange={(e) =>
                      handleVoteChange(project.id, criteria, e.target.value)
                    }
                    disabled={submittedProjects.includes(project.id)}
                  >
                    {[...Array(criteriaLimits[criteria] + 1).keys()].map((score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
              <td>{calculateTotal(project.id)}</td>
              <td>
                {submittedProjects.includes(project.id) ? (
                  <span className="submitted-status"> Soumis</span>
                ) : (
                  <button onClick={() => handleVoteSubmit(project.id)}>
                    Soumettre
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
