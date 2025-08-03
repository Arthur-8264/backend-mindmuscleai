const axios = require('axios');

const gerarExplicacaoExercicio = async (req, res) => {
  const { nomeExercicio } = req.body;

  if (!nomeExercicio) {
    return res.status(400).json({ erro: 'Nome do exercício é obrigatório' });
  }

  try {
    const prompt = `
Você é um personal trainer. Explique como fazer o exercício chamado "${nomeExercicio}" de forma teórica, com passos simples, cuidados que a pessoa deve tomar e, se possível, dê uma dica sobre variações ou erros comuns. Use uma linguagem clara e direta.
    `;

    const resposta = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const explicacao = resposta.data.choices[0].message.content;
    res.json({ explicacao });
  } catch (erro) {
    console.error('Erro ao gerar explicação do exercício:', erro.message);
    res.status(500).json({ erro: 'Erro ao gerar explicação do exercício' });
  }
};

module.exports = { gerarExplicacaoExercicio };
