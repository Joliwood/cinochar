const apiKey = process.env.TMDB_API_KEY;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${apiKey}&language=en-US`,
};

export default requests;
