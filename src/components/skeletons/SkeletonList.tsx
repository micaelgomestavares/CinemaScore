export const SkeletonList: React.FC = () => (
  <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
    {[...Array(5)].map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export const SkeletonCard: React.FC = () => (
  <div className="flex flex-col space-x-2 overflow-hidden rounded-md animate-pulse">
    <div className="relative flex w-full h-64 items-center justify-center bg-background/50">
      <div className="w-full h-full bg-gray-300"></div>
    </div>
    <div className="flex flex-col space-y-2 py-4">
      <div className="w-3/4 h-4 bg-gray-300"></div>
      <div className="w-1/2 h-4 bg-gray-300"></div>
    </div>
  </div>
);