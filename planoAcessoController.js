import { supabase } from '../services/supabaseClient.js';

// GET - Verifica se o usuário tem acesso ao recurso específico
export const verificarAcesso = async (req, res) => {
  const { id } = req.params;
  const { recurso } = req.query;

  // Exemplo: recurso = 'coach-emocional'

  const { data: usuario, error } = await supabase
    .from('usuarios')
    .select('plano')
    .eq('id', id)
    .single();

  if (error || !usuario) {
    return res.status(500).json({ error: 'Erro ao buscar plano do usuário.' });
  }

  const plano = usuario.plano;

  const permissoes = {
    'coach-emocional': ['Premium'],
    'como-fazer-exercicios': ['Normal', 'Premium'],
    'dieta': ['Básico', 'Normal', 'Premium'],
  };

  const planosPermitidos = permissoes[recurso] || [];

  if (planosPermitidos.includes(plano)) {
    return res.json({ acesso: true });
  } else {
    return res.json({ acesso: false });
  }
};
