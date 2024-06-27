import SeriesList from "@/components/series-list";
import PageSkeletonList from "@/components/skeletons/PageSkeletonlist";
import { SkeletonList } from "@/components/skeletons/SkeletonList";
import api from "@/services/api";
import { useEffect, useState } from "react";

const SeriesMelhoresAvaliadas: React.FC<{}> = () => {
  const [bestRatedSeries, setBestRatedSeries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreSeries = async (page: number) => {
    setLoading(true);
    try {
      const newSeries = await api.fetchBestRatedSeries(page);
      setBestRatedSeries((prevSeries) => [...prevSeries, ...newSeries]);
      setHasMore(newSeries.length > 0);
    } catch (error) {
      console.error("Error fetching series data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreSeries(page);
  }, [page]);

  const handleScroll = () => {
    const scrollTop = window.innerHeight + document.documentElement.scrollTop;
    const offsetHeight = document.documentElement.offsetHeight;

    if (offsetHeight - scrollTop > 200 || loading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  if (bestRatedSeries.length === 0) {
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
        <SeriesList series={bestRatedSeries} title="Séries Melhores Avaliadas" description="Estas são as séries mais bem avaliadas da história!" />
        {loading && <SkeletonList />}
      </section>
    </main>
  );
};

export default SeriesMelhoresAvaliadas;
