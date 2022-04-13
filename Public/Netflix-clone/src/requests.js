const APIKEY = "3f3690549436cb93b84381cd5d606323";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${APIKEY}&language=en-US`,
  fetchNetflixOrginals: `/discover/tv?api_key=${APIKEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${APIKEY}&language=en-US`,
  fetchTActionMovies: `/discover/movie?api_key=${APIKEY}&with_genres=28`,
  fetchTComedyMovies: `/discover/movie?api_key=${APIKEY}&with_genres=35`,
  fetchTHorrorMovies: `/discover/movie?api_key=${APIKEY}&with_genres=27`,
  fetchTRomanceMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10749`,
  fetchTDocumentaries: `/discover/movie?api_key=${APIKEY}&with_genres=99`,
};

export default requests;
