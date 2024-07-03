import SearchComponent from "@/components/search";
import PopularesNaSemana from "@/components/week-trend";

const Home: React.FC<{}> = () => {
  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-6xl mt-8">
        <div className="mb-4 max-xl:p-4">
          <h1 className="text-lg font-bold md:text-4xl">Busca</h1>
          <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">Procure por seus filmes ou séries preferidos(as)</p>
        </div>
        <div className="my-4 max-xl:p-4">
          <SearchComponent></SearchComponent>
        </div>

        <div className="mb-4 mt-12">
          <PopularesNaSemana></PopularesNaSemana>
        </div>
      </section>
    </main>
  );
}

export default Home;
