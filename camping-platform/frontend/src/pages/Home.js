import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Home.css";

const Home = () => {
  const [campings, setCampings] = useState([]);

  useEffect(() => {
    const fetchCampings = async () => {
      try {
        const response = await api.get("/campings");
        setCampings(response.data.slice(0, 3)); // Pegamos apenas os 3 primeiros campings como destaque
      } catch (error) {
        console.error("Erro ao buscar campings:", error);
      }
    };

    fetchCampings();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1>🏕️ Descubra os melhores campings do Brasil</h1>
        <p>Encontre aventuras incríveis e viva experiências inesquecíveis na natureza!</p>
        <Link to="/campings" className="cta-button">Explorar Campings</Link>
      </div>

      <section className="campings-destaque">
        <h2>🏕️ Campings em destaque</h2>
        <div className="campings-grid">
          {campings.length > 0 ? (
            campings.map((camping) => (
              <div key={camping._id} className="camping-card">
                <img src={camping.imagem} alt={camping.nome} />
                <h3>{camping.nome}</h3>
                <p>{camping.descricao}</p>
                <Link to={`/camping/${camping._id}`} className="detalhes-button">Ver detalhes</Link>
              </div>
            ))
          ) : (
            <p>Carregando campings...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
