import { Link } from 'react-router-dom';

export const CommandSearchMovie = ({ item, onClick }: any) => {
  return (
    <div>
      <div>
        <Link
          to={`/filmes/${item.id}`}
          className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 hover:bg-muted"
          onClick={onClick}
        >
          <span className="truncate whitespace-nowrap text-sm">
            {item.title}
          </span>

          <span className="whitespace-nowrap text-xs text-muted-foreground">
            {item.release_date !== '' &&
              new Date(item.release_date).getFullYear()}
          </span>
        </Link>
      </div>
    </div>
  );
};

export const CommandSearchSeries = ({ item, onClick }: any) => {
  return (
    <div>
      <div>
        <Link
          to={`/series/${item.id}`}
          className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 hover:bg-muted"
          onClick={onClick}
        >
          <span className="truncate whitespace-nowrap text-sm">
            {item.name}
          </span>

          <span className="whitespace-nowrap text-xs text-muted-foreground">
            {item.release_date !== '' &&
              new Date(item.first_air_date).getFullYear()}
          </span>
        </Link>
      </div>
    </div>
  );
};
