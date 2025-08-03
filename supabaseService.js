// services/supabaseService.js
import { supabase } from './supabaseClient.js';

export const salvarHistoricoExercicio = async (exercicio) => {
  try {
    const { error } = await supabase
      .from('historico_exercicios')
      .insert([{ nome_exercicio: exercicio, criado_em: new Date() }]);
    if (error) throw error;
  } catch (err) {
    console.error('Erro ao salvar histórico de exercício:', err.message);
  }
};

export const salvarCoachInteracao = async ({ mensagem_usuario, resposta_ia }) => {
  try {
    const { error } = await supabase
      .from('coach_emocional')
      .insert([{ mensagem_usuario, resposta_ia, criado_em: new Date() }]);
    if (error) throw error;
  } catch (err) {
    console.error('Erro ao salvar coach emocional:', err.message);
  }
};

export const salvarLocalCompra = async ({ alimento, local }) => {
  try {
    const { error } = await supabase
      .from('onde_comprar')
      .insert([{ alimento, local, criado_em: new Date() }]);
    if (error) throw error;
  } catch (err) {
    console.error('Erro ao salvar local de compra:', err.message);
  }
};

export const salvarAvaliacao = async (user_id, nota, comentario) => {
  return await supabase
    .from('avaliacoes')
    .insert([{ user_id, nota, comentario }]);
};
