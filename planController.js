// controllers/planController.js
import { supabase } from '../config/supabaseClient.js';

// Obter plano atual de um usuário
export const obterPlanoUsuario = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('usuarios')
    .select('plano')
    .eq('id', id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Plano não encontrado.' });
  }

  res.json({ plano: data.plano });
};

// Atualizar plano do usuário
export const atualizarPlanoUsuario = async (req, res) => {
  const { id } = req.params;
  const { novoPlano } = req.body;

  if (!novoPlano) {
    return res.status(400).json({ error: 'Novo plano é obrigatório.' });
  }

  const { error } = await supabase
    .from('usuarios')
    .update({ plano: novoPlano })
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: 'Erro ao atualizar o plano.' });
  }

  res.json({ mensagem: 'Plano atualizado com sucesso.', plano: novoPlano });
};
