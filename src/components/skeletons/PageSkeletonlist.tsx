import React from 'react';

const PageSkeletonList: React.FC = () => (
  <section className="mt-4 p-4">
    <div className="mb-4">
      <h1 className="text-lg font-bold md:text-4xl">Carregando...</h1>
      <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">Por favor, aguarde enquanto carregamos os itens.</p>
    </div>
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col space-x-2 overflow-hidden rounded-md animate-pulse">
          <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50 h-48">
            <div className="w-full h-full bg-gray-300"></div>
          </div>
          <div className="flex flex-col space-y-0 py-4">
            <span className="text-sm bg-gray-300 h-4 w-3/4"></span>
            <span className="text-xs text-muted-foreground bg-gray-300 h-3 w-1/2 mt-2"></span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PageSkeletonList;
