// controllers/pagamentoController.js

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.atualizarStatusPagamento = async (req, res) => {
  try {
    const { userId, statusPagamento } = req.body;

    const { data, error } = await supabase
      .from('usuarios')
      .update({ status_pagamento: statusPagamento }) // "ativo", "inativo", "inadimplente"
      .eq('id', userId);

    if (error) {
      return res.status(500).json({ erro: 'Erro ao atualizar status do pagamento.' });
    }

    res.status(200).json({ mensagem: 'Status de pagamento atualizado com sucesso.', data });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
};
