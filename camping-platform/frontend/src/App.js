import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Campings from "./pages/Campings";
import CampingDetalhes from "./pages/CampingDetalhes";
import NovoCamping from "./pages/NovoCamping";


function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/campings">Campings</a></li>
          <li><a href="/reservas">Reservas</a></li>
          <li><a href="/novo-camping">Adicionar Camping</a></li>

        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campings" element={<Campings />} />
        <Route path="/camping/:id" element={<CampingDetalhes />} />
        <Route path="/novo-camping" element={<NovoCamping />} />
      </Routes>
    </Router>
  );
}

export default App;
