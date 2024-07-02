import MoviesList from "@/components/movies-list";
import PageSkeletonList from "@/components/skeletons/PageSkeletonlist";
import api from "@/services/api";
import { useEffect, useState } from "react";

const FilmesEstreias: React.FC<{}> = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchUpcomingMovies();
        setUpcomingMovies(response.results);
      } catch (error) {
        console.error("Error fetching movie data: ", error);
      }
    };
    fetchData();
  }, []);

  if (upcomingMovies.length === 0) {
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
        <MoviesList movies={upcomingMovies} title="Filmes Lançamentos" description="Estes são os filmes que estão sendo lançados" />
      </section>
    </main>
  );
};

export default FilmesEstreias;
