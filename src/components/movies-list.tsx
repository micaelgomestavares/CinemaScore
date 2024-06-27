import React from 'react';

const MoviesList: React.FC<{ movies: any[]; title: string; description: string }> = ({ movies, title, description }) => (
  <section className="mt-4 p-4">
    <div className="mb-4">
      <h1 className="text-lg font-bold md:text-4xl">{title}</h1>
      <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">{description}</p>
    </div>
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
      {movies.map((movie) => (
        <div key={movie.id} className="flex flex-col space-x-2 overflow-hidden rounded-md">
          <a href={`/filmes/${movie.id}`}>
            <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="flex flex-col space-y-0 py-4">
              <span className="text-sm">{movie.title}</span>
              <span className="text-xs text-muted-foreground">{new Date(movie.release_date).toLocaleDateString('pt-br')} ⭐ {movie.vote_average.toPrecision(2)}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default MoviesList;
