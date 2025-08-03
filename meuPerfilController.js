import { supabase } from '../services/supabaseClient.js';

// GET - Buscar dados do perfil do usuário
export const obterPerfil = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }

  res.json(data);
};

// PUT - Atualizar dados do perfil (exceto data de nascimento)
export const atualizarPerfil = async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  // Remover data de nascimento se estiver no body
  delete dadosAtualizados.data_nascimento;

  const { data, error } = await supabase
    .from('usuarios')
    .update(dadosAtualizados)
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }

  res.json(data[0]);
};
