import SearchComponent from "@/components/search";
import PopularesNaSemana from "@/components/week-trend";

const Home: React.FC<{}> = () => {
  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-6xl mt-8">

        <div className="py-2 max-xl:p-4">
          <h1 className="text-4xl font-bold">Busca</h1>
          <p className="text-sm leading-5 text-muted-foreground md:leading-6">Procure por seus filmes ou séries preferidos(as)</p>
        </div>

        <div className="py-2 max-xl:p-4">
          <SearchComponent></SearchComponent>
        </div>

        <div className="py-2">
          <PopularesNaSemana></PopularesNaSemana>
        </div>
      </section>
    </main>
  );
}

export default Home;
