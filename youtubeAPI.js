// services/youtubeAPI.js

const axios = require('axios');
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function buscarVideosNoYouTube(query) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        q: `${query} como fazer`,
        type: 'video',
        maxResults: 3,
        regionCode: 'BR',
        relevanceLanguage: 'pt',
        safeSearch: 'strict'
      }
    });

    return response.data.items.map(item => ({
      titulo: item.snippet.title,
      videoId: item.id.videoId,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    console.error('Erro ao buscar vídeos no YouTube:', error.message);
    return [];
  }
}

module.exports = { buscarVideosNoYouTube };
