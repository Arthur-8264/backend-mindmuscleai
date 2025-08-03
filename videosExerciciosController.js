// controllers/videosExerciciosController.js
const { youtube } = require('../services/youtubeAPI');

exports.buscarVideosExercicios = async (req, res) => {
  try {
    const { exercicio } = req.body;

    if (!exercicio) {
      return res.status(400).json({ error: 'Exercício não informado.' });
    }

    const resultados = await youtube.search.list({
      part: 'snippet',
      q: `${exercicio} exercício em português`,
      type: 'video',
      maxResults: 5,
    });

    const links = resultados.data.items.map((item) => ({
      titulo: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    res.json({ videos: links });
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    res.status(500).json({ error: 'Erro ao buscar vídeos' });
  }
};
