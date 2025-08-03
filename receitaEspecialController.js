// controllers/receitaEspecialController.js
const { buscarUsuarioPorId } = require('../services/supabaseService');
const { gerarRespostaIA } = require('../services/openaiService');
const supabase = require('../services/supabaseService');

const gerarReceitaEspecial = async (req, res) => {
  const userId = req.user.id;
  const { refeicao, modificacoes } = req.body;

  try {
    const usuario = await buscarUsuarioPorId(userId);

    const prompt = `
o prompt começa aqui
Você é o melhor nutricionista esportivo, que já ajudou várias pessoas a conseguirem o corpo desejado. Crie uma receita que substitua a refeição: ${refeicao}
Objetivo: ${usuario.objetivo}
Restrições alimentares: ${usuario.restricoes || 'Nenhuma'}
Modificações solicitadas: ${modificacoes || 'Nenhuma'}
Inclua ingredientes, modo de preparo e valor calórico, e o valor calórico da refeição tem que ser o mesmo que o da ${refeicao}.
o prompt acaba aqui
`;

    const resposta = await gerarRespostaIA(prompt);

    // Salvando a receita especial no Supabase
    const { error } = await supabase
      .from('receitas_especiais')
      .insert([
        {
          user_id: userId,
          refeicao_original: refeicao,
          modificacoes: modificacoes || null,
          receita_gerada: resposta,
        },
      ]);

    if (error) {
      console.error('Erro ao salvar receita especial:', error.message);
      return res.status(500).json({ error: 'Erro ao salvar receita especial no Supabase' });
    }

    res.json({ receita: resposta });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar receita especial' });
  }
};

module.exports = { gerarReceitaEspecial };
