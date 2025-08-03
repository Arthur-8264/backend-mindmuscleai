// controllers/userController.js
import { supabase } from '../config/supabaseClient.js';

export const obterUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  res.json(data);
};

export const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const novosDados = req.body;

  if (novosDados.data_nascimento) {
    return res.status(400).json({ error: 'Data de nascimento não pode ser alterada.' });
  }

  const { data, error } = await supabase
    .from('usuarios')
    .update(novosDados)
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }

  res.json({ mensagem: 'Usuário atualizado com sucesso.', data });
};
