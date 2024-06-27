import React from 'react';

const TabsSkeletonSection: React.FC = () => (
  <section className="p-4 animate-pulse">
    <div className="flex gap-4">
      <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
      <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
      <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
    </div>
    <div className="mt-4">
      <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
      <div className="h-6 w-3/4 bg-gray-300 rounded-md mt-2"></div>
    </div>
  </section>
);

export default TabsSkeletonSection;
