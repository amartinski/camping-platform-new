require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const campingsRoutes = require("./routes/campings"); // Importando as rotas de campings

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/campings', campingsRoutes); // Registrando a rota corretamente

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🔥 Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Testar API
app.get('/', (req, res) => {
  res.send('Servidor rodando 🚀');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
