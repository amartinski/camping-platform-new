const express = require("express");
const Camping = require("../models/camping"); // Certifique-se de que o caminho está correto
const router = express.Router();

// ✅ Rota para listar todos os campings
router.get("/", async (req, res) => {
  try {
    const campings = await Camping.find(); // Busca todos os campings no MongoDB
    res.json(campings);
  } catch (error) {
    console.error("Erro ao buscar campings:", error);
    res.status(500).json({ mensagem: "Erro ao buscar campings" });
  }
});

// ✅ Rota para buscar um camping específico pelo ID
router.get("/:id", async (req, res) => {
  try {
    const camping = await Camping.findById(req.params.id);
    if (!camping) {
      return res.status(404).json({ mensagem: "Camping não encontrado" });
    }
    res.json(camping);
  } catch (error) {
    console.error("Erro ao buscar camping:", error);
    res.status(500).json({ mensagem: "Erro ao buscar camping" });
  }
});

// ✅ Rota para criar um novo camping (rota que estava faltando)
router.post("/", async (req, res) => {
  try {
    console.log("📩 Recebendo dados para criar camping:", req.body);
    const novoCamping = new Camping(req.body);
    const campingSalvo = await novoCamping.save();
    console.log("✅ Camping salvo:", campingSalvo);
    res.status(201).json(campingSalvo);
  } catch (error) {
    console.error("Erro ao cadastrar camping:", error);
    res.status(400).json({ mensagem: "Erro ao cadastrar camping", error: error.message });
  }
});

// ✅ Rota para adicionar comentário a um camping
router.post("/:id/comentarios", async (req, res) => {
  try {
    const { texto, nota, data } = req.body;
    const camping = await Camping.findById(req.params.id);

    if (!camping) {
      return res.status(404).json({ mensagem: "Camping não encontrado" });
    }

    const novoComentario = { texto, nota, data };
    camping.comentarios.push(novoComentario);
    await camping.save();

    res.status(201).json(novoComentario);
  } catch (error) {
    res.status(400).json({ mensagem: "Erro ao adicionar comentário", error: error.message });
  }
});

module.exports = router;
