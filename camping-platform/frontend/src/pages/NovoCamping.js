import React, { useState } from "react";
import api from "../services/api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./NovoCamping.css";

const NovoCamping = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mensagem, setMensagem] = useState("");

  // Componente que captura o clique no mapa e define a localização
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      },
    });

    return latitude && longitude ? <Marker position={[latitude, longitude]} /> : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      setMensagem("❌ Por favor, selecione a localização no mapa.");
      return;
    }

    const novoCamping = {
      nome,
      descricao,
      preco,
      imagem,
      latitude,
      longitude,
    };

    try {
      const response = await api.post("/campings", novoCamping, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Camping cadastrado:", response.data);
      setMensagem("✔️ Camping cadastrado com sucesso!");

      // Limpar os campos após cadastro
      setNome("");
      setDescricao("");
      setPreco("");
      setImagem("");
      setLatitude(null);
      setLongitude(null);
    } catch (error) {
      console.error("❌ Erro ao cadastrar camping:", error.response ? error.response.data : error);
      setMensagem("❌ Erro ao cadastrar camping.");
    }
  };

  return (
    <div className="novo-camping-container">
      <h2>➕ Adicionar Novo Camping</h2>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <form className="form-camping" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Camping"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Preço (Ex: R$ 50,00)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Imagem (URL)"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
        />

        {/* Mapa interativo para selecionar a localização */}
        <h3>📍 Selecione a localização no mapa:</h3>
        <MapContainer center={[-29.5, -51]} zoom={6} className="mapa">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>

        {/* Coordenadas selecionadas */}
        {latitude && longitude && (
          <p className="coordenadas">📍 {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
        )}

        <button type="submit">✅ Cadastrar Camping</button>
      </form>
    </div>
  );
};

export default NovoCamping;
