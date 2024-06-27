import SeriesList from "@/components/series-list";
import PageSkeletonList from "@/components/skeletons/PageSkeletonlist";
import api from "@/services/api";
import { useEffect, useState } from "react";

const SeriesPopulares: React.FC<{}> = () => {
  const [popularSeries, setPopularSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchPopularSeries();
        setPopularSeries(response.results);
      } catch (error) {
        console.error("Error fetching series data: ", error);
      }
    };
    fetchData();
  }, []);

  if (popularSeries.length === 0) {
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
        <SeriesList series={popularSeries} title="Séries Populares" description="Estas são as séries mais populares no momento." />
      </section>
    </main>
  );
};

export default SeriesPopulares;
