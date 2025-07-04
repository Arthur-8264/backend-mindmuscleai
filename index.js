// backend-mindmuscleai/index.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ROTAS PRINCIPAIS
app.post('/gerar-cronograma', async (req, res) => {
  const dadosUsuario = req.body;

  try {
    const respostaOpenAI = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Você é um personal trainer e nutricionista profissional.'
          },
          {
            role: 'user',
            content: `Crie uma rotina de treinos e uma dieta adaptada para: ${JSON.stringify(dadosUsuario)}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Coloque aqui a chave da API da OpenAI no .env
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ resultado: respostaOpenAI.data });
  } catch (erro) {
    console.error('Erro ao chamar OpenAI:', erro);
    res.status(500).json({ erro: 'Erro ao gerar cronograma com a OpenAI.' });
  }
});

app.post('/localizar-alimentos', async (req, res) => {
  const { localizacao, preferencia } = req.body;

  try {
    const respostaGemini = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: `Quais são os melhores lugares para comprar alimentos saudáveis em ${localizacao}, considerando ${preferencia}?`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          key: process.env.GEMINI_API_KEY // Coloque aqui a chave da API do Gemini no .env
        }
      }
    );

    res.json({ resultado: respostaGemini.data });
  } catch (erro) {
    console.error('Erro ao chamar Gemini:', erro);
    res.status(500).json({ erro: 'Erro ao localizar alimentos com o Gemini.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});