// controllers/ondeComprarController.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function ondeComprarAlimentos(req, res) {
  try {
    const { listaAlimentos, cidade } = req.body;

    // 🧠 Prompt base para recomendação de locais
    const prompt = `
Você é um assistente de compras. Um usuário te deu a seguinte lista de alimentos:

${listaAlimentos}

Você deve recomendar lugares presenciais e online para comprar esses alimentos na cidade de ${cidade}, priorizando lugares confiáveis e com bom preço.

Não responda nada que não esteja relacionado a isso. Seja objetivo e organizado em tópicos.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const texto = response.text();

    res.json({ resposta: texto });
  } catch (error) {
    console.error("Erro ao gerar onde comprar:", error);
    res.status(500).json({ erro: "Erro ao gerar onde comprar." });
  }
}

module.exports = { ondeComprarAlimentos };

