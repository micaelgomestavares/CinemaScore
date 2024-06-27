const { VITE_TMDB_API_KEY, VITE_TMDB_BEARER } = import.meta.env;
const baseUrl = 'https://api.themoviedb.org/3';

const api = {
  fetchSeriesInfoById: async (seriesId: string) => {
    const apiUrl = `${baseUrl}/tv/${seriesId}?api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error fetching series information:', error);
    }
  },

  fetchMoviesInfoById: async (movieId: string) => {
    const apiUrl = `${baseUrl}/movie/${movieId}?&api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },

  fetchPopularMovies: async () => {
    const apiUrl = `${baseUrl}/discover/movie?api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },

  fetchBestRatedMovies: async (page =  1) => {
    const apiUrl = `${baseUrl}/movie/top_rated?api_key=${VITE_TMDB_API_KEY}&language=pt-BR&page=${page}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return [];
    }
  },

  fetchBestRatedSeries: async (page = 1) => {
    const apiUrl = `${baseUrl}/tv/top_rated?api_key=${VITE_TMDB_API_KEY}&language=pt-BR&page=${page}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching series data:', error);
      return [];
    }
  },
  
  fetchUpcomingMovies: async () => {
    const apiUrl = `${baseUrl}/movie/upcoming?api_key=${VITE_TMDB_API_KEY}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },

  fetchUpcomingSeries: async () => {
    const apiUrl = `${baseUrl}/tv/on_the_air?api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },

  fetchPopularSeries: async () => {
    const apiUrl = `${baseUrl}/tv/popular?api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },

  fetchRecommendedMovies: async (movieId: string) => {
    const apiUrl = `${baseUrl}/movie/${movieId}/recommendations?api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },

  fetchRecommendedSeries: async (seriesId: string) => {
    const apiUrl = `${baseUrl}/tv/${seriesId}/recommendations?api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },

  fetchMoviesCredits: async (movieId: string) => {
    const apiUrl = `${baseUrl}/movie/${movieId}/credits?api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },

  fetchSeriesCredits: async (serieId: string) => {
    const apiUrl = `${baseUrl}/tv/${serieId}/aggregate_credits?api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },

  fetchSerieSeasons: async (serieId: string, serieNumber: string) => {
    const apiUrl = `${baseUrl}/tv/${serieId}/season/${serieNumber}?api_key=${VITE_TMDB_API_KEY}&language=pt-BR`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${VITE_TMDB_BEARER}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  },
};

export default api;

