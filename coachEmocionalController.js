// controllers/coachEmocionalController.js
const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Supabase config
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.gerarCoachEmocional = async (req, res) => {
  try {
    const { nome, objetivo, dificuldadeAtual, userId } = req.body;

    const prompt = `Aja como um coach emocional muito experiente e motivador. Crie uma mensagem personalizada e intensa para um usuário chamado ${nome}, que está com o objetivo de ${objetivo} e está enfrentando a seguinte dificuldade: ${dificuldadeAtual}. A mensagem deve ser direta, motivadora, com tom de força mental, sem pena, e com foco em superação, disciplina e persistência. E diga o que o usuário precisa ouvir.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o'
    });

    const mensagemMotivacional = completion.choices[0].message.content;

    // Salvar no Supabase
    const { error } = await supabase
      .from('coach_emocional')
      .insert([
        {
          user_id: userId,
          nome,
          objetivo,
          dificuldade: dificuldadeAtual,
          mensagem: mensagemMotivacional,
          criado_em: new Date()
        }
      ]);

    if (error) {
      console.error('Erro ao salvar mensagem no Supabase:', error);
      return res.status(500).json({ sucesso: false, mensagem: 'Mensagem gerada, mas não foi possível salvar no banco de dados.' });
    }

    res.status(200).json({ sucesso: true, mensagem: mensagemMotivacional });

  } catch (error) {
    console.error('Erro no Coach Emocional:', error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao gerar mensagem do Coach Emocional.' });
  }
};
