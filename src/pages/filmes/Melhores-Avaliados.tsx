import MoviesList from "@/components/movies-list";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { SkeletonList } from "@/components/skeletons/SkeletonList";
import PageSkeletonList from "@/components/skeletons/PageSkeletonlist";

const FilmesMelhoresAvaliados: React.FC<{}> = () => {
  const [bestRatedMovies, setBestRatedMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [_, setHasMore] = useState(true);

  const fetchMoreMovies = async (page: number) => {
    setLoading(true);
    try {
      const newMovies = await api.fetchBestRatedMovies(page);
      setBestRatedMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setHasMore(newMovies.length > 0);
    } catch (error) {
      console.error("Error fetching movie data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreMovies(page);
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || loading) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  if (bestRatedMovies.length === 0 || !bestRatedMovies) {
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
        <MoviesList movies={bestRatedMovies} title="Filmes Melhores Avaliados" description="Estes são os filmes mais bem avaliados da história do cinema!" />
        {loading && <SkeletonList />}
      </section>
    </main>
  );
};

export default FilmesMelhoresAvaliados;
