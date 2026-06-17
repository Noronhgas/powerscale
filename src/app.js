const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const { calcularNivelPersonagem } = require("./services/personagemService");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    message: "API da PowerScale funcionando",
  });
});

app.post("/api/personagem/calcular", (req, res) => {
  try {
    const resultado = calcularNivelPersonagem(req.body);

    res.json({
      sucesso: true,
      resultado,
    });
  } catch (error) {
    res.status(400).json({
      sucesso: false,
      erro: error.message,
    });
  }
});

module.exports = app;