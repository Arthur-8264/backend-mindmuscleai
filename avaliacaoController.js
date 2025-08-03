const supabase = require('../services/supabase');
const { salvarAvaliacao } = require('../services/supabaseService'); // ✅ importando função de serviço

exports.enviarAvaliacao = async (req, res) => {
  try {
    const { user_id, nota, comentario } = req.body;

    if (!user_id || !nota) {
      return res.status(400).json({ error: 'ID do usuário e nota são obrigatórios.' });
    }

    // ✅ salvamento via função do service
    const { data, error } = await salvarAvaliacao(user_id, nota, comentario);

    if (error) {
      throw error;
    }

    res.json({ message: 'Avaliação enviada com sucesso!', data });
  } catch (error) {
    console.error('Erro ao enviar avaliação:', error.message);
    res.status(500).json({ error: 'Erro ao enviar avaliação' });
  }
};
