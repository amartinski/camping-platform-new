import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../services/api";
import "leaflet/dist/leaflet.css";
import "./CampingDetalhes.css"; // Arquivo CSS para estilização

const CampingDetalhes = () => {
  const { id } = useParams();
  const [camping, setCamping] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [nota, setNota] = useState(5);
  const [mediaNotas, setMediaNotas] = useState(0);

  useEffect(() => {
    const fetchCamping = async () => {
      try {
        const response = await api.get(`/campings/${id}`);
        setCamping(response.data);
        setComentarios(response.data.comentarios || []);
        calcularMediaNotas(response.data.comentarios);
      } catch (error) {
        console.error("Erro ao buscar detalhes do camping:", error);
      }
    };
    fetchCamping();
  }, [id]);

  const calcularMediaNotas = (comentarios) => {
    if (comentarios.length > 0) {
      const somaNotas = comentarios.reduce((acc, comentario) => acc + comentario.nota, 0);
      setMediaNotas((somaNotas / comentarios.length).toFixed(1));
    } else {
      setMediaNotas(0);
    }
  };

  const handleComentarioSubmit = async (e) => {
    e.preventDefault();
    if (!novoComentario.trim()) return;

    const comentario = {
      texto: novoComentario,
      nota: parseInt(nota),
      data: new Date().toISOString(),
    };

    try {
      const response = await api.post(`/campings/${id}/comentarios`, comentario);
      const novoComentarioAdicionado = response.data;
      setComentarios([novoComentarioAdicionado, ...comentarios]);
      calcularMediaNotas([novoComentarioAdicionado, ...comentarios]); // Atualiza a média das notas
      setNovoComentario("");
      setNota(5);
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
  };

  return (
    <div className="camping-detalhes">
      {camping ? (
        <>
          <h1>{camping.nome}</h1>
          <img src={camping.imagem} alt={camping.nome} className="camping-imagem" />
          <p className="descricao">{camping.descricao}</p>
          <strong className="preco">Preço: {camping.preco}</strong>

          {/* Média das avaliações */}
          <div className="avaliacao">
            <h3>⭐ {mediaNotas} / 5</h3>
            <p>Baseado em {comentarios.length} avaliações</p>
          </div>

          {/* Mapa mostrando a localização */}
          <h3>📍 Localização</h3>
          <MapContainer center={[camping.latitude, camping.longitude]} zoom={13} className="mapa">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[camping.latitude, camping.longitude]}>
              <Popup>{camping.nome}</Popup>
            </Marker>
          </MapContainer>

          {/* Seção de Comentários e Avaliações */}
          <h3>📝 Avaliações e Comentários</h3>
          <form className="form-comentario" onSubmit={handleComentarioSubmit}>
            <textarea
              placeholder="Deixe seu comentário..."
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              required
            />
            <label>Nota:</label>
            <select value={nota} onChange={(e) => setNota(e.target.value)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} estrelas</option>
              ))}
            </select>
            <button type="submit">Enviar Comentário</button>
          </form>

          {/* Lista de Comentários */}
          {comentarios.length > 0 ? (
            <ul className="lista-comentarios">
              {comentarios
                .sort((a, b) => new Date(b.data) - new Date(a.data)) // Ordenar do mais recente para o mais antigo
                .map((comentario, index) => (
                  <li key={index} className="comentario">
                    <strong>⭐ {comentario.nota} estrelas</strong>
                    <p>{comentario.texto}</p>
                    <small>{new Date(comentario.data).toLocaleString()}</small>
                  </li>
                ))}
            </ul>
          ) : (
            <p>Sem comentários ainda.</p>
          )}
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default CampingDetalhes;
