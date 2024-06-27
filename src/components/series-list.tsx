import React from 'react';

const SeriesList: React.FC<{ series: any[]; title: string; description: string }> = ({ series, title, description }) => (
  <section className="mt-4 p-4">
    <div className="mb-4">
      <h1 className="text-lg font-bold md:text-4xl">{title}</h1>
      <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">{description}</p>
    </div>
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
      {series.map((serie) => (
        <div key={serie.id} className="flex flex-col space-x-2 overflow-hidden rounded-md">
          <a href={`/series/${serie.id}`}>
            <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50">
              <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
            </div>
            <div className="flex flex-col space-y-0 py-4">
              <span className="text-sm">{serie.name}</span>
              <span className="text-xs text-muted-foreground">{new Date(serie.first_air_date).toLocaleDateString('pt-br')} ⭐ {serie.vote_average.toPrecision(2)}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default SeriesList;
