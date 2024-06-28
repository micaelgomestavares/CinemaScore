'use client';

import { useState, useEffect } from 'react';
import { Command, CommandDialog, CommandInput, CommandList } from '@/components/command/command';
import api from '@/services/api';
import { Button } from './ui/button';
import { CommandSearchMovie, CommandSearchSeries } from './command/command-search-items';
import { CommandSearchGroup } from './command/command-search-group';
import { SearchIcon } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import { CommandSearchSkeleton } from './skeletons/CommandSearchSkeleton';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [movieResults, setMovieInfo] = useState([]);
  const [seriesResults, setSeriesResults] = useState([]);
  const [open, setOpen] = useState(false);
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

          setMovieInfo(moviesResponse.results.slice(0, 3));
          setSeriesResults(seriesResponse.results.slice(0, 3));
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

  const handleMovieClick = () => {
    setOpen(false);
  };

  const [hasMovies, hasTvSeries] = [
    Boolean(movieResults?.length),
    Boolean(seriesResults?.length),
  ];

  const hasResults = hasMovies || hasTvSeries;

  return (
    <div>
      <Button
        variant="outline"
        className="flex justify-start w-full gap-2 text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <SearchIcon width={16}></SearchIcon> Busque filmes ou séries
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandList className="max-lg:w-[400px]">
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
                      <CommandSearchMovie
                        item={movie}
                        key={movie.id}
                        onClick={handleMovieClick}
                      />
                    ))}
                  </CommandSearchGroup>
                )}

                {hasTvSeries && (
                  <CommandSearchGroup heading='Séries'>
                    {seriesResults?.map((tvSerie: any) => (
                      <CommandSearchSeries
                        item={tvSerie}
                        key={tvSerie.id}
                        onClick={handleMovieClick}
                      />
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
    </div>
  );
};

export default SearchComponent;
