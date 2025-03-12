const mongoose = require("mongoose");

const campingSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: String, required: true },
  imagem: String,
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  comentarios: [
    {
      texto: String,
      nota: Number,
      data: { type: Date, default: Date.now },
    },
  ],
});

const Camping = mongoose.model("Camping", campingSchema);
module.exports = Camping;
