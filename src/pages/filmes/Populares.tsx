import MoviesList from "@/components/movies-list";
import PageSkeletonList from "@/components/skeletons/PageSkeletonlist";
import api from "@/services/api";
import { useEffect, useState } from "react";

const FilmesPopulares: React.FC<{}> = () => {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchPopularMovies();
        setPopularMovies(response.results);
      } catch (error) {
        console.error("Error fetching movie data: ", error);
      }
    };
    fetchData();
  }, []);

  if (popularMovies.length === 0 || !popularMovies) {
    return (
      <main className="w-full">
        <section className="mx-auto my-4 w-full max-w-6xl">
          <PageSkeletonList />
        </section>
      </main>
    )
  }

  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-6xl">
        <MoviesList movies={popularMovies} title="Filmes Populares" description="Estes são os filmes mais populares no momento" />
      </section>
    </main>
  );
};

export default FilmesPopulares;
