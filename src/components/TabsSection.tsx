import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import api from '@/services/api';
import { Badge } from './ui/badge';
import { EpisodesSkeleton } from './skeletons/EpisodeDialogSkeleton';

const TabsSection: React.FC<{ seriesCredits: any | null; seriesInfo: any; CreditsTab: any }> = ({ seriesCredits, seriesInfo, CreditsTab }) => {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<any | null>(null);

  const handleSeasonClick = async (serieId: number, seasonNumber: number) => {
    const seasonDetails = await api.fetchSerieSeasons(serieId, seasonNumber);
    setSelectedSeason(seasonDetails);
    setOpenDialog(seasonNumber);
  };

  return (
    <section className="p-4">
      <Tabs defaultValue="temporadas">
        <TabsList>
          <TabsTrigger value="temporadas">Temporadas</TabsTrigger>
          <TabsTrigger value="elenco">Elenco ({seriesCredits?.cast.length})</TabsTrigger>
          <TabsTrigger value="equipe">Equipe ({seriesCredits?.crew.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="temporadas">
          <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3">
            {seriesInfo.seasons.map((season: any) => (
              <React.Fragment key={season.id}>
                <Dialog open={openDialog === season.season_number} onOpenChange={(isOpen) => setOpenDialog(isOpen ? season.season_number : null)}>
                  <DialogTrigger asChild>
                    <div
                      className="flex flex-col space-x-2 overflow-hidden rounded-md border bg-muted shadow cursor-pointer"
                      onClick={() => handleSeasonClick(seriesInfo.id, season.season_number)}
                    >
                      <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50">
                        <img src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} alt={season.name} />
                      </div>
                      <div className="flex flex-col space-y-0 py-2">
                        <span className="text-sm">{season.name}</span>
                        <span className="text-xs text-muted-foreground">{season.episode_count} episódios</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl h-[500px] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{selectedSeason?.name}</DialogTitle>
                      <DialogDescription>
                        {selectedSeason?.overview}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {selectedSeason?.episodes ? (
                        <div className="space-y-8">
                          {selectedSeason.episodes.map((episode: any, index: number) => (
                            <div key={episode.id} className="flex items-start space-x-4 rounded-md">
                              <img
                                src={`https://image.tmdb.org/t/p/w200/${episode.still_path}`}
                                alt={episode.name}
                                className="w-32 h-auto rounded-md"
                              />
                              <div className="flex flex-col space-y-2">
                                <span className="font-semibold">{index + 1}. {episode.name}  <Badge variant={'topEpisode'}>⭐ {episode.vote_average.toPrecision(2)}</Badge></span>
                                <span className="text-xs text-muted-foreground"> ({new Date(episode.air_date).toLocaleDateString('pt-br')}) - {episode.runtime} min</span>
                                <p className="text-sm">{episode.overview}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <EpisodesSkeleton />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </React.Fragment>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="elenco">
          <CreditsTab credits={seriesCredits?.cast} type="character" />
        </TabsContent>
        <TabsContent value="equipe">
          <CreditsTab credits={seriesCredits?.crew} type="job" />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TabsSection;
