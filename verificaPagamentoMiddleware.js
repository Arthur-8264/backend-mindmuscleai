// middlewares/verificaPagamentoMiddleware.js

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const verificaPagamentoMiddleware = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(401).json({ erro: 'Usuário não autenticado.' });
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('status_pagamento')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return res.status(403).json({ erro: 'Erro ao verificar status de pagamento.' });
    }

    if (data.status_pagamento !== 'ativo') {
      return res.status(403).json({ erro: 'Acesso negado. Pagamento pendente ou expirado.' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno ao verificar pagamento.' });
  }
};

module.exports = verificaPagamentoMiddleware;
