// controllers/gerarDietaController.js
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// O prompt começa aqui
const promptBase = `
Você é um nutricionista virtual. Crie uma dieta saudável e personalizada com base nas informações do usuário: idade, altura, peso, rotina e objetivos. 
A resposta deve ser clara, organizada por: Café da manhã, Almoço, Lanche e Jantar.
Use linguagem acessível e apenas fale sobre alimentação.

Importante: Não responda perguntas fora do contexto de dieta. Se for feita uma pergunta fora do contexto, responda:
"Desculpe, eu só posso ajudar com sua dieta. Use os outros botões para outras funções."
`;
// O prompt acaba aqui

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const gerarDieta = async (req, res) => {
  try {
    const { nome, idade, altura, peso, rotina, objetivo } = req.body;

    const prompt = `
${promptBase}

Nome: ${nome}
Idade: ${idade}
Altura: ${altura}
Peso: ${peso}
Rotina: ${rotina}
Objetivo: ${objetivo}
`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const resposta = completion.data.choices[0].message.content;
    res.json({ dieta: resposta });
  } catch (error) {
    console.error("Erro ao gerar dieta:", error.message);
    res.status(500).json({ erro: "Erro ao gerar dieta" });
  }
};

module.exports = { gerarDieta };
