const { createClient } = require('@supabase/supabase-js');
const openai = require('../services/openaiService');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const gerarCronogramaController = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ erro: 'ID do usuário não fornecido.' });
  }

  try {
    // Buscar dados do usuário no Supabase
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('nome, idade, objetivo, rotina, restricoes_saude, local_treino, ja_treinou, tipo_treino_anterior')
      .eq('id', userId)
      .single();

    if (error || !usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado no Supabase.' });
    }

    const prompt = `
[INÍCIO DO PROMPT]
Você é o melhor especialista em treinamento físico do mundo.

Gere um cronograma de treino com base nas seguintes informações do usuário:
- Nome: ${usuario.nome}
- Idade: ${usuario.idade}
- Objetivo: ${usuario.objetivo}
- Rotina: ${usuario.rotina}
- Restrições médicas: ${usuario.restricoes_saude || 'Nenhuma'}
- Local de treino: ${usuario.local_treino || 'Não especificado'}
- Já treinou antes?: ${usuario.ja_treinou || 'Não informado'}
- Tipo de treino anterior: ${usuario.tipo_treino_anterior || 'Não informado'}

Organize o cronograma assim:
Exercício / Séries / Repetições / Tempo de descanso
Quantas vezes na semana deve treinar , é quais os dias que vai treinar, o que vai treinar em cada dia( faça um calendário, com dias da semana e com meses do ano, e uma cor para cada dia de treino, e nos dias que não for para treinar deixe em branco)
Quando o usuário vai ter resultados dependendo do objetivo dele
Regras:
- Respeite as restrições médicas.
- Leve em conta o local de treino: se for calistenia, evite equipamentos de academia; se for academia, utilize aparelhos.
- Caso o local de treino não seja definido, escolha o tipo de treino mais adequado ao objetivo do usuário.
- Se o usuário já treinou, pode usar exercícios mais avançados (com cuidado). Se for iniciante, use exercícios mais simples e seguros.
- Se o objetivo for ganhar massa muscular, avise que é necessário ajustar o cronograma após 4 a 8 semanas.
- Seja direto, claro e motivador. Explique bem as instruções.
[FIM DO PROMPT]
    `;

    const respostaIA = await openai.sendMessage(prompt);

    // ✅ Salvar cronograma gerado no Supabase
    const { error: erroInsert } = await supabase
      .from('cronogramas')
      .insert([{ user_id: userId, cronograma: respostaIA }]);

    if (erroInsert) {
      console.error('Erro ao salvar cronograma no Supabase:', erroInsert);
    }

    return res.status(200).json({ cronograma: respostaIA });
  } catch (erro) {
    console.error('Erro ao gerar cronograma:', erro);
    return res.status(500).json({ erro: 'Erro ao gerar cronograma.' });
  }
};

module.exports = gerarCronogramaController;
