import React, { useState, useEffect } from "react";
import { Command, CommandDialog, CommandInput, CommandList } from "@/components/command";
import { CommandSearchSkeleton } from "@/components/skeletons/CommandSearchSkeleton";
import { CommandSearchGroup } from "@/components/command-search-group";
import { useDebounce } from "@uidotdev/usehooks";
import api from "@/services/api";
import { DialogTitle } from "@radix-ui/react-dialog";

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (data: any, type: string) => void; // Updated onSelect function to include type
}

const CommandSearch: React.FC<CommandSearchProps> = ({ open, onOpenChange, onSelect }) => {
  const [query, setQuery] = useState('');
  const [movieResults, setMovieInfo] = useState([]);
  const [seriesResults, setSeriesResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery) {
        setLoading(true);
        try {
          const [moviesResponse, seriesResponse] = await Promise.all([
            api.fetchMoviesByQuery(debouncedQuery),
            api.fetchSeriesByQuery(debouncedQuery)
          ]);

          setMovieInfo(moviesResponse.results.slice(0, 5)); // Fetch more results if needed
          setSeriesResults(seriesResponse.results.slice(0, 5)); // Fetch more results if needed
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setMovieInfo([]);
        setSeriesResults([]);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const [hasMovies, hasTvSeries] = [
    Boolean(movieResults?.length),
    Boolean(seriesResults?.length),
  ];

  const hasResults = hasMovies || hasTvSeries;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandList aria-describedby="Movies" className="max-lg:w-[400px]">
          <DialogTitle></DialogTitle>
          <CommandInput
            placeholder={"Busque pelo nome do filme ou série"}
            value={query}
            onValueChange={(value) => setQuery(value)}
          />

          {isLoading && (
            <div className="space-y-8">
              <CommandSearchGroup heading='Filmes'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CommandSearchSkeleton key={index} />
                ))}
              </CommandSearchGroup>

              <CommandSearchGroup heading='Séries'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CommandSearchSkeleton key={index} />
                ))}
              </CommandSearchGroup>
            </div>
          )}

          {!isLoading && hasResults ? (
            <div className="">
              {hasMovies && (
                <CommandSearchGroup heading='Filmes'>
                  {movieResults?.map((movie: any) => (
                    <a
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 hover:bg-muted"
                      onClick={() => onSelect(movie, 'movie')}
                      key={movie.id}
                    >
                      <span className="truncate whitespace-nowrap text-sm">
                        {movie.title}
                      </span>

                      <span className="whitespace-nowrap text-xs text-muted-foreground">
                        {movie.first_air_date !== '' &&
                          new Date(movie.release_date).getFullYear()}
                      </span>
                    </a>
                  ))}
                </CommandSearchGroup>
              )}

              {hasTvSeries && (
                <CommandSearchGroup heading='Séries'>
                  {seriesResults?.map((tvSerie: any) => (
                    <a
                      key={tvSerie.id}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 hover:bg-muted"
                      onClick={() => onSelect(tvSerie, 'series')} // Pass type 'series'
                    >
                      <span className="truncate whitespace-nowrap text-sm">
                        {tvSerie.name}
                      </span>

                      <span className="whitespace-nowrap text-xs text-muted-foreground">
                        {tvSerie.release_date !== '' &&
                          new Date(tvSerie.first_air_date).getFullYear()}
                      </span>
                    </a>
                  ))}
                </CommandSearchGroup>
              )}
            </div>
          ) : (
            <p className="p-8 text-center">
              Não encontramos nada para a sua busca
            </p>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default CommandSearch;
