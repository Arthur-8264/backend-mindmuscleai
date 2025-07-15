const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function gerarCronograma(req, res) {
  try {
    const { idade, peso, altura, objetivos, rotina, treino } = req.body;

    const prompt = `
      Você é um especialista em fitness e deve criar um cronograma de treinos.
      Dados do usuário:
      - Idade: ${idade}
      - Peso: ${peso}
      - Altura: ${altura}
      - Objetivos: ${objetivos}
      - Rotina: ${rotina}
      - Tipo de treino: ${treino}
      
      Crie um cronograma semanal de treinos (segunda a sábado) personalizado, com nome dos exercícios, duração e observações se necessário.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    const cronograma = completion.choices[0].message.content;
    res.json({ cronograma });
  } catch (error) {
    console.error('Erro ao gerar cronograma:', error);
    res.status(500).json({ erro: 'Erro ao gerar cronograma.' });
  }
}

module.exports = { gerarCronograma };
