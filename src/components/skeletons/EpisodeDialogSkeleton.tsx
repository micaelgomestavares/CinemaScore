export const EpisodesSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="flex items-start space-x-4 rounded-md">
          <div className="w-32 h-20 bg-gray-300 rounded-md"></div>
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};