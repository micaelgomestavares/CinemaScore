import React from 'react';

const BackdropSkeletonSection: React.FC = () => (
  <section className="h-[30dvh] w-full overflow-hidden bg-muted shadow md:rounded-lg lg:h-[55dvh] lg:border animate-pulse">
    <div className="h-full w-full bg-gray-300"></div>
  </section>
);

export default BackdropSkeletonSection;
