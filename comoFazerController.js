// controllers/comoFazerController.js
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import { supabase } from '../services/supabaseClient.js';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const obterComoFazer = async (req, res) => {
  const { exercicio } = req.query;

  if (!exercicio) {
    return res.status(400).json({ error: 'Exercício não especificado.' });
  }

  try {
    // Parte 1: Gerar explicação teórica com a OpenAI
    const openaiResponse = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Você é o melhor treinador profissional de exercícios físicos que ensina como executar exercícios passo a passo. Sempre fale em português, e use uma linguagem que seja de fácil compreensão, uma linguagem que até mesmo uma criança entenderia.',
        },
        {
          role: 'user',
          content: `Explique passo a passo como fazer o exercício: ${exercicio}`,
        },
      ],
      temperature: 0.7,
    });

    const explicacaoTeorica = openaiResponse.data.choices[0].message.content;

    // Parte 2: Buscar vídeos do YouTube
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    const youtubeResponse = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          q: `como fazer ${exercicio} exercício academia`,
          key: youtubeApiKey,
          part: 'snippet',
          maxResults: 3,
          type: 'video',
          regionCode: 'BR',
          relevanceLanguage: 'pt',
        },
      }
    );

    const videos = youtubeResponse.data.items.map((item) => ({
      titulo: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
      canal: item.snippet.channelTitle,
    }));

    // Parte 3: Salvamento no Supabase (histórico de exercícios do usuário)
    await supabase
      .from('historico_exercicios')
      .insert([
        {
          user_id: req.user.id,
          nome_exercicio: exercicio,
          explicacao: explicacaoTeorica,
          criado_em: new Date(),
        },
      ]);

    res.json({
      explicacao: explicacaoTeorica,
      videos,
    });
  } catch (error) {
    console.error('Erro ao buscar como fazer o exercício:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};
