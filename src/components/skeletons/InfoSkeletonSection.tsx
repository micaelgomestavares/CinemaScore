import React from 'react';

const InfoSkeletonSection: React.FC = () => (
  <section className="mx-auto my-8 space-y-8 p-4 animate-pulse">
    <main>
      <article className="flex w-full flex-col gap-3">
        <div className="h-8 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-4 w-12 bg-gray-300 rounded-md"></div>
          ))}
          <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
        </div>
        <div className="h-6 w-full bg-gray-300 rounded-md"></div>
        <div className="h-6 w-full bg-gray-300 rounded-md"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded-md"></div>
      </article>
    </main>
  </section>
);

export default InfoSkeletonSection;
