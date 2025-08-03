// controllers/gerarDietaController.js
const { buscarUsuarioPorId } = require('../services/supabaseService');
const { gerarRespostaIA } = require('../services/openaiService');
const supabase = require('../services/supabaseService');

const gerarDieta = async (req, res) => {
  const userId = req.user.id;
  const { rotinaExercicios } = req.body; // rotina do cronograma

  try {
    const usuario = await buscarUsuarioPorId(userId);

    const prompt = `
o prompt começa aqui
Você é o melhor nutricionista virtual que ja ajudou várias pessoas a conseguirem o corpo desejado. Crie uma dieta personalizada com base nos dados:
Nome: ${usuario.nome}
Objetivo: ${usuario.objetivo}
Rotina de exercícios: ${rotinaExercicios}
Se o objetivo é ganhar massa, inclua superávit calórico; se emagrecer, déficit.
Não inclua alimentos que causem alergia: ${usuario.restricoes || 'Nenhuma'}
o prompt acaba aqui
`;

    const resposta = await gerarRespostaIA(prompt);

    // Salvando a dieta no Supabase
    const { error } = await supabase
      .from('dietas')
      .insert([
        {
          user_id: userId,
          dieta: resposta,
        },
      ]);

    if (error) {
      console.error('Erro ao salvar dieta:', error.message);
      return res.status(500).json({ error: 'Erro ao salvar dieta no Supabase' });
    }

    res.json({ dieta: resposta });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar dieta personalizada' });
  }
};

module.exports = { gerarDieta };
