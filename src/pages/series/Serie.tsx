import TabsSection from "@/components/tabs-section";
import BackdropSection from "@/components/backdrop-section";
import BackdropSkeletonSection from "@/components/skeletons/BackdropSkeletonSection";
import InfoSkeletonSection from "@/components/skeletons/InfoSkeletonSection";
import SimilarSkeletonList from "@/components/skeletons/SimilarSkeletonList";
import TabsSkeletonSection from "@/components/skeletons/TabsSkeletonSection";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export interface SeriesInfo {
  id: string;
  name: string;
  backdrop_path: string;
  first_air_date: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  overview: string;
  seasons: { id: number; name: string; poster_path: string; episode_count: number }[];
}

export interface Credits {
  cast: { profile_path: string; name: string; roles: { character: string }[] }[];
  crew: { profile_path: string; name: string; jobs: { job: string }[] }[];
}

export interface RecommendedSeries {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
}

const Serie: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const [seriesInfo, setSeriesInfo] = useState<SeriesInfo | null>(null);
  const [seriesCredits, setSeriesCredits] = useState<Credits | null>(null);
  const [seriesRecommended, setSeriesRecommended] = useState<RecommendedSeries[] | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [infoData, seriesCreditsData, seriesRecommendedData] = await Promise.all([
          api.fetchSeriesInfoById(id),
          api.fetchSeriesCredits(id),
          api.fetchRecommendedSeries(id),
        ]);
        setSeriesInfo(infoData);
        setSeriesCredits(seriesCreditsData);
        setSeriesRecommended(seriesRecommendedData);

      } catch (error) {
        console.error("Error fetching series data: ", error);
      }
    };

    fetchData();
  }, [id]);



  if (!seriesInfo) {
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
        <BackdropSection backdropPath={seriesInfo.backdrop_path} />
        <SeriesInfoSection seriesInfo={seriesInfo} />
        <TabsSection seriesCredits={seriesCredits} seriesInfo={seriesInfo} CreditsTab={CreditsTab} />
        <SimilarSeriesSection seriesRecommended={seriesRecommended} />
      </section>
    </main>
  );
};


const SeriesInfoSection: React.FC<{ seriesInfo: SeriesInfo }> = ({ seriesInfo }) => (
  <section className="mx-auto my-4 space-y-8 p-4">
    <main>
      <article className="flex w-full flex-col gap-3">
        <h1 className="font-bold text-4xl">
          {seriesInfo.name} <span className="text-xs text-muted-foreground">({new Date(seriesInfo.first_air_date).toLocaleDateString('pt-br')})</span>
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {seriesInfo.genres.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
          <Badge className="light:text-white" variant={'topEpisode'}>⭐ {seriesInfo.vote_average.toPrecision(2)}</Badge>
        </div>
        <p className="text-sm leading-5 text-muted-foreground md:leading-6">{seriesInfo.overview}</p>
      </article>
    </main>
  </section>
);

const CreditsTab: React.FC<{ credits: any, type: any }> = ({ credits, type }) => (
  <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3">
    {credits && credits.map((credit: any, index: any) => (
      <Link key={index} to={`/pessoas/${credit.id}`}>
        <div key={index} className="flex flex-col space-x-2 overflow-hidden rounded-md border bg-muted shadow">
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-background/50">
            <img src={credit.profile_path ? `https://image.tmdb.org/t/p/w500/${credit.profile_path}` : `https://ui-avatars.com/api/?name=${credit.name}`} alt={`${credit.name}`} />
          </div>
          <div className="flex flex-col space-y-0 py-2">
            <span className="text-sm">{credit.name}</span>
            <span className="text-xs text-muted-foreground">{type == 'character' ? credit.roles[0].character : credit.jobs[0].job}</span>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

const SimilarSeriesSection: React.FC<{ seriesRecommended: RecommendedSeries[] | null }> = ({ seriesRecommended }) => (
  <section className="mt-12 p-4">
    <div className="mb-4">
      <h1 className="text-4xl font-bold">Recomendados</h1>
      <p className="text-sm leading-5 text-muted-foreground md:leading-6">Outros usuários também assistiram</p>
    </div>
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
      {seriesRecommended?.map((serieRecommend) => (
        <div key={serieRecommend.id} className="flex flex-col space-x-2 overflow-hidden shadow bg-secondary rounded-md">
          <a href={`/series/${serieRecommend.id}`}>
            <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50">
              <img src={`https://image.tmdb.org/t/p/w500/${serieRecommend.poster_path}`} alt={serieRecommend.name} />
            </div>
            <div className="flex flex-col space-y-0 p-3">
              <span className="text-sm">{serieRecommend.name}</span>
              <span className="text-xs text-muted-foreground">{new Date(serieRecommend.first_air_date).toLocaleDateString('pt-br')}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default Serie;