import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "./Campings.css";

const Campings = () => {
  const [campings, setCampings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampings = async () => {
      try {
        console.log("🔄 Buscando campings...");
        const response = await api.get("/campings");
        console.log("✅ Campings carregados:", response.data);
        setCampings(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar campings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampings();
  }, []);

  return (
    <div className="campings-container">
      <h1>🏕️ Campings Disponíveis</h1>
      
      {loading ? (
        <p className="loading">Carregando campings...</p>
      ) : campings.length === 0 ? (
        <p className="no-results">Nenhum camping encontrado.</p>
      ) : (
        <div className="campings-grid">
          {campings.map((camping) => (
            <div key={camping._id} className="camping-card">
              <img src={camping.imagem} alt={camping.nome} />
              <div className="camping-info">
                <h2>{camping.nome}</h2>
                <p>{camping.descricao}</p>
                <Link to={`/camping/${camping._id}`} className="detalhes-button">Ver detalhes</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campings;
