import FilmesPopulares from "./filmes/Populares";

const Home: React.FC<{}> = () => {
  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-6xl mt-8">
        <div className="mb-4 p-4">
          <h1 className="text-lg font-bold md:text-4xl">Ínicio</h1>
          <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">Veja o que está acontecendo no mundo dos filmes e séries</p>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center py-20">
            <h3 className="text-2xl font-bold tracking-tight">Ainda não há nada por aqui</h3>
            <p className="text-sm text-muted-foreground">🚧 Em breve adicionando mais funcionalidades</p>
          </div>
        </div>
        <div className="mb-4 mt-8">
          <FilmesPopulares></FilmesPopulares>
        </div>
      </section>
    </main>
  );
}

export default Home;
