import PageSkeletonList from "@/components/skeletons/PageSkeletonlist";
import api from "@/services/api";
import { useEffect, useState } from "react";

const PopularesNaSemana: React.FC<{}> = () => {
  const [trendWeek, setTrendWeek] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchTredingInWeek();
        setTrendWeek(response);

        console.log("TrendWeek: ", response);
      } catch (error) {
        console.error("Error fetching movie data: ", error);
      }
    };
    fetchData();
  }, []);

  if (trendWeek.length === 0 || !trendWeek) {
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
        <EmAltaLista emalta={trendWeek} title="Em alta" description="Estes são os filmes e séries em alta na semana" />
      </section>
    </main>
  );
};

const EmAltaLista: React.FC<{ emalta: any[]; title: string; description: string }> = ({ emalta, title, description }) => (
  <section className="mt-4 p-4">
    <div className="mb-4">
      <h1 className="text-lg font-bold md:text-4xl">{title}</h1>
      <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">{description}</p>
    </div>
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
      {emalta.map((item) => (
        <div key={item.id} className="flex flex-col space-x-2 overflow-hidden rounded-md">
          <a href={`/filmes/${item.id}`}>
            <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50">
              <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title || item.name} />
            </div>
            <div className="flex flex-col space-y-0 py-4">
              <span className="text-sm">{item.title || item.name}</span>
              <span className="text-xs text-muted-foreground">{new Date(item.release_date).toLocaleDateString('pt-br') || new Date(item.first_air_date).toLocaleDateString('pt-br')} ⭐ {item.vote_average.toPrecision(2)}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default PopularesNaSemana;
