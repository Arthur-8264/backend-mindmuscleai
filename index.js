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

const cronogramaRoutes = require('./routes/gerarCronograma');
app.use('/api', cronogramaRoutes);

const gerarDietaRouter = require('./routes/gerarDieta');
app.use('/api/gerar-dieta', gerarDietaRouter);

const coachEmocionalRouter = require('./routes/coachEmocional');
app.use('/api/coach-emocional', coachEmocionalRouter);

const ondeComprarRoutes = require('./routes/ondeComprar');
app.use('/api/onde-comprar', ondeComprarRoutes);

const comoFazerExerciciosRoute = require('./routes/comoFazerExercicios');
app.use('/api/como-fazer-exercicio', comoFazerExerciciosRoute);

const comoFazerRoutes = require('./routes/comoFazer');
app.use('/api/como-fazer', comoFazerRoutes);

const receitaEspecialRouter = require("./routes/receitaEspecial");
app.use("/receita-especial", receitaEspecialRouter);

import avaliacaoRoutes from './routes/avaliacaoRoutes.js';
app.use('/api/avaliacao', avaliacaoRoutes);

import meuPlanoRoutes from './routes/meuPlanoRoutes.js';
app.use('/api/meu-plano', meuPlanoRoutes);

import meuPerfilRoutes from './routes/meuPerfilRoutes.js';
app.use('/api/meu-perfil', meuPerfilRoutes);

import planoAcessoRoutes from './routes/planoAcessoRoutes.js';
app.use('/api/acesso', planoAcessoRoutes);

import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

import userRoutes from './routes/userRoutes.js';
app.use('/api/usuarios', userRoutes);

import planRoutes from './routes/planRoutes.js';
app.use('/api/planos', planRoutes);

import acessoRoutes from './routes/acessoRoutes.js';
app.use('/api/acesso', acessoRoutes);

import ondeComprarRoutes from './routes/ondeComprarRoutes.js';
app.use('/api', ondeComprarRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

