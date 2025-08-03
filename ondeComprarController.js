// controllers/ondeComprarController.js
import GeminiAI from '@google/generative-ai';
import { buscarUsuarioPorId } from '../services/supabaseService';
import { createClient } from '@supabase/supabase-js';

const gen = new GeminiAI({ apiKey: process.env.GEMINI_API_KEY });

// Supabase config
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const ondeComprar = async (req, res) => {
  try {
    const { refeicao } = req.body;
    const usuario = await buscarUsuarioPorId(req.user.id);
    const alimentos = usuario.dieta[refeicao]; // supondo que dieta é array ou objeto

    const prompt = `
Indique onde comprar (online e presencial, na cidade ${usuario.cidade}) os seguintes alimentos: ${alimentos.join(', ')}.
`;

    const resposta = await gen.generateContent(prompt);

    // Salvar no Supabase
    const { error } = await supabase
      .from('onde_comprar')
      .insert([
        {
          user_id: req.user.id,
          cidade: usuario.cidade,
          refeicao,
          alimentos: alimentos.join(', '),
          resposta: resposta,
          criado_em: new Date()
        }
      ]);

    if (error) {
      console.error('Erro ao salvar em Supabase:', error);
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Resposta gerada, mas erro ao salvar no banco de dados.'
      });
    }

    res.json({ ondeComprar: resposta });

  } catch (error) {
    console.error('Erro no endpoint ondeComprar:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao processar a solicitação.' });
  }
};
