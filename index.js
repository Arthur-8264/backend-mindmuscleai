const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar rotas
const gerarCronogramaRoute = require('./routes/gerarCronograma');
const gerarComprasRoute = require('./routes/gerarCompras');

// Usar rotas
app.use('/api/gerar-cronograma', gerarCronogramaRoute);
app.use('/api/gerar-compras', gerarComprasRoute);

// Rota de teste padrão
app.get('/', (req, res) => {
  res.send('API do MindMuscleAI está rodando com sucesso!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
