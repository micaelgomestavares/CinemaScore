const { VITE_TMDB_BEARER } = import.meta.env;
const baseUrl = 'https://api.themoviedb.org/3';

const api = {
  fetchSeriesInfoById: async (seriesId: string) => {
    const apiUrl = `${baseUrl}/tv/${seriesId}?&language=pt-BR`;

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

  fetchMoviesByQuery: async (query: string) => {
    const apiUrl = `${baseUrl}/search/movie?query=${query}&language=pt-BR`;
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
      console.error('Error fetching movie data:', error);
    }
  },

  fetchSeriesByQuery: async (query: string) => {
    const apiUrl = `${baseUrl}/search/tv?query=${query}&language=pt-BR`;

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
      console.error('Error fetching series data:', error);
    }
  },

  fetchMoviesInfoById: async (movieId: string) => {
    const apiUrl = `${baseUrl}/movie/${movieId}?&&language=pt-BR`;

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
    const apiUrl = `${baseUrl}/discover/movie?&language=pt-BR`;

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

  fetchPersonById: async (person_id: string) => {
    const apiUrl = `${baseUrl}/person/${person_id}?language=pt-BR`;

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

  fetchPersonCast: async (person_id: string) => {
    const apiUrl = `${baseUrl}/person/${person_id}/combined_credits?language=pt-BR`;

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

  fetchBestRatedMovies: async (page = 1) => {
    const apiUrl = `${baseUrl}/movie/top_rated?&language=pt-BR&page=${page}`;

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
    const apiUrl = `${baseUrl}/tv/top_rated?&language=pt-BR&page=${page}`;

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
    const apiUrl = `${baseUrl}/movie/upcoming?`;

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
    const apiUrl = `${baseUrl}/tv/on_the_air?&language=pt-BR`;

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
    const apiUrl = `${baseUrl}/tv/popular?&language=pt-BR`;

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
    const apiUrl = `${baseUrl}/movie/${movieId}/recommendations?&language=pt-BR`;

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
    const apiUrl = `${baseUrl}/tv/${seriesId}/recommendations?&language=pt-BR`;

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
    const apiUrl = `${baseUrl}/movie/${movieId}/credits?&language=pt-BR`;

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
    const apiUrl = `${baseUrl}/tv/${serieId}/aggregate_credits?&language=pt-BR`;

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

  fetchSerieSeasons: async (serieId: number, seasonNumber: number) => {
    const apiUrl = `${baseUrl}/tv/${serieId}/season/${seasonNumber}?&language=pt-BR`;

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

