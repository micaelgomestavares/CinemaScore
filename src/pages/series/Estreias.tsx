import SeriesList from "@/components/series-list";
import PageSkeletonList from "@/components/skeletons/PageSkeletonlist";
import api from "@/services/api";
import { useEffect, useState } from "react";

const SeriesEstreias: React.FC<{}> = () => {
  const [upcomingSeries, setUpcomingSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchUpcomingSeries();
        setUpcomingSeries(response.results);
      } catch (error) {
        console.error("Error fetching series data: ", error);
      }
    };
    fetchData();
  }, []);

  if (upcomingSeries.length === 0) {
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
        <SeriesList series={upcomingSeries} title="Séries Lançamentos" description="Estas são as séries que irão lançar episódios nos próximos 7 dias." />
      </section>
    </main>
  );
};

export default SeriesEstreias;
