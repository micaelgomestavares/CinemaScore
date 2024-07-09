import BackdropSection from "@/components/backdrop-section";
import BackdropSkeletonSection from "@/components/skeletons/BackdropSkeletonSection";
import InfoSkeletonSection from "@/components/skeletons/InfoSkeletonSection";
import SimilarSkeletonList from "@/components/skeletons/SimilarSkeletonList";
import TabsSkeletonSection from "@/components/skeletons/TabsSkeletonSection";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface MovieInfo {
  backdrop_path: string;
  title: string;
  release_date: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  overview: string;
  budget: number;
  revenue: number;
}

interface MovieCredit {
  cast: { profile_path: string; name: string; character: string }[];
  crew: { profile_path: string; name: string; job: string }[];
}

interface MovieSimilar {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

const Filme: React.FC<{}> = () => {
  let { id } = useParams<{ id: string }>();

  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCredit | null>(null);
  const [movieSimilars, setMovieSimilars] = useState<MovieSimilar[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [infoData, creditsData, similarsData] = await Promise.all([
          api.fetchMoviesInfoById(id),
          api.fetchMoviesCredits(id),
          api.fetchRecommendedMovies(id)
        ]);
        setMovieInfo(infoData);
        setMovieCredits(creditsData);
        setMovieSimilars(similarsData.results);
      } catch (error) {
        setError("Erro ao carregar os dados do filme.");
        console.error("Error fetching movie data: ", error);
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return <div className="w-full text-center text-red-500">{error}</div>;
  }

  if (!movieInfo) {
    return (
      <main className="w-full">
        <section className="mx-auto my-4 w-full max-w-6xl">
          <BackdropSkeletonSection />
          <InfoSkeletonSection />
          <TabsSkeletonSection />
          <SimilarSkeletonList />
        </section>
      </main>
    )
  }

  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-6xl">
        <BackdropSection backdropPath={movieInfo.backdrop_path} />
        <MovieInfoSection movieInfo={movieInfo} />
        <TabsSection movieCredits={movieCredits} movieInfo={movieInfo} />
        <SimilarMoviesSection movieSimilars={movieSimilars} />
      </section>
    </main>
  );
};

const MovieInfoSection: React.FC<{ movieInfo: MovieInfo }> = ({ movieInfo }) => (
  <section className="mx-auto my-8 space-y-8 p-4">
    <main>
      <article className="flex w-full flex-col gap-3 ">
        <h1 className="text-4xl font-bold">
          {movieInfo.title} <span className="text-xs text-muted-foreground">({new Date(movieInfo.release_date).toLocaleDateString('pt-br')})</span>
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {movieInfo.genres.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
          <Badge className="light:text-white" variant={'topEpisode'}>⭐ {movieInfo.vote_average.toPrecision(2)}</Badge>
        </div>
        <p className="text-sm leading-5 text-muted-foreground md:leading-6">{movieInfo.overview}</p>
      </article>
    </main>
  </section>
);

const TabsSection: React.FC<{ movieCredits: MovieCredit | null, movieInfo: MovieInfo }> = ({ movieCredits, movieInfo }) => (
  <section className="p-4">
    <Tabs defaultValue="boxoffice">
      <TabsList>
        <TabsTrigger value="boxoffice">Bilheteria</TabsTrigger>
        <TabsTrigger value="elenco">Elenco ({movieCredits?.cast.length})</TabsTrigger>
        <TabsTrigger value="equipe">Equipe ({movieCredits?.crew.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="boxoffice">
        <BoxOfficeTab budget={movieInfo.budget} revenue={movieInfo.revenue} />
      </TabsContent>
      <TabsContent value="elenco">
        <CreditsTab credits={movieCredits?.cast} type="character" />
      </TabsContent>
      <TabsContent value="equipe">
        <CreditsTab credits={movieCredits?.crew} type="job" />
      </TabsContent>
    </Tabs>
  </section>
);

const BoxOfficeTab: React.FC<{ budget: number; revenue: number }> = ({ budget, revenue }) => (
  <div className="flex flex-col gap-2 bg-secondary p-4 rounded-md">
    <h1 className="text-lg font-bold md:text-4xl">Bilheteria</h1>
    <h3>Orçamento: {budget.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>
    <h3>Faturamento: {revenue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>
  </div>
);

const CreditsTab: React.FC<{ credits?: { profile_path: string; name: string;[key: string]: string }[]; type: string }> = ({ credits, type }) => (
  <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3">
    {credits && credits.map((credit, index) => (
      <Link key={index} to={`/pessoas/${credit.id}`}>
        <div key={index} className="flex flex-col space-x-2 overflow-hidden rounded-md border bg-muted shadow">
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-background/50">
            <img src={credit.profile_path ? `https://image.tmdb.org/t/p/w500/${credit.profile_path}` : `https://ui-avatars.com/api/?name=${credit.name}&background=FFFFFF`} alt={`${credit.name}`} />
          </div>
          <div className="flex flex-col space-y-0 py-2">
            <span className="text-sm">{credit.name}</span>
            <span className="text-xs text-muted-foreground">{credit[type]}</span>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

const SimilarMoviesSection: React.FC<{ movieSimilars: MovieSimilar[] | null }> = ({ movieSimilars }) => (
  <section className="mt-12 p-4">
    <div className="mb-4">
      <h1 className="text-lg font-bold md:text-4xl">Recomendados</h1>
      <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">Outros usuários também assistiram</p>
    </div>
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
      {movieSimilars && movieSimilars.map((movieSimilar) => (
        <div key={movieSimilar.id} className="flex flex-col space-x-2 overflow-hidden shadow bg-secondary rounded-md">
          <a href={`/filmes/${movieSimilar.id}`}>
            <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50">
              <img src={`https://image.tmdb.org/t/p/w500/${movieSimilar.poster_path}`} alt={movieSimilar.title} />
            </div>
            <div className="flex flex-col space-y-0 p-3">
              <span className="text-sm">{movieSimilar.title}</span>
              <span className="text-xs text-muted-foreground">{new Date(movieSimilar.release_date).toLocaleDateString('pt-br')}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default Filme;