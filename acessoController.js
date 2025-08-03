import { buscarUsuarioPorId } from '../services/supabaseService';

export const verificarAcessoPorPlano = async (req, res) => {
  const usuario = await buscarUsuarioPorId(req.params.id);
  const plano = usuario.tipoPlano;

  const permissoes = {
    basico: ['cronograma', 'dieta', 'receitaEspecial'],
    normal: ['cronograma', 'dieta', 'receitaEspecial', 'comoFazer', 'ondeComprar'],
    premium: ['cronograma','dieta','receitaEspecial','comoFazer','ondeComprar','coachEmocional']
  };

  const recurso = req.query.recurso; // ex: 'coachEmocional'
  const acesso = permissoes[plano]?.includes(recurso) || false;
  res.json({ acesso });
};
