import React from 'react';

const SimilarSkeletonList: React.FC = () => (
  <section className="mt-12 p-4 animate-pulse">
    <div className="mb-4">
      <div className="h-8 w-3/4 bg-gray-300 rounded-md"></div>
      <div className="h-6 w-1/2 bg-gray-300 rounded-md mt-2"></div>
    </div>
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col space-x-2 overflow-hidden rounded-md shadow bg-gray-300 h-64 w-full"></div>
      ))}
    </div>
  </section>
);

export default SimilarSkeletonList;
