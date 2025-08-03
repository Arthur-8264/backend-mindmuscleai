// controllers/meuPlanoController.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const verPlanoUsuario = async (req, res) => {
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('plano')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Plano não encontrado para este usuário.' });
    }

    res.json({ plano: data.plano });
  } catch (error) {
    console.error('Erro ao buscar plano do usuário:', error);
    res.status(500).json({ error: 'Erro interno ao buscar plano.' });
  }
};
