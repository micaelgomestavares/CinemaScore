import { Skeleton } from "@/components/ui/skeleton";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PersonInfo {
  name: string;
  biography: string;
  profile_path: string;
  birthday: string;
}

const Pessoas: React.FC<{}> = () => {
  const [personInfo, setPersonInfo] = useState<PersonInfo | null>(null);
  const [recognizedBy, setRecognizedBy] = useState<any[]>([]);
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [personInfoData, recognizedByData] = await Promise.all([
          api.fetchPersonById(id),
          api.fetchPersonCast(id)
        ]);

        setPersonInfo(personInfoData);
        setRecognizedBy(recognizedByData.cast);

      } catch (error) {
        console.error("Error fetching person data: ", error);
      }
    };
    fetchData();
  }, [id]);

  const getLinkPath = (item: any) => {
    if (item.media_type === "movie") {
      return `/filmes/${item.id}`;
    } else if (item.media_type === "tv") {
      return `/series/${item.id}`;
    }
  };

  return (
    <main className="w-full">
      <section className="mx-auto mt-12 w-full max-w-6xl">
        {personInfo ? (
          <div className="flex flex-col md:flex-row items-start md:items-center max-lg:p-6">
            <img
              src={`https://image.tmdb.org/t/p/original${personInfo.profile_path}`}
              alt={`Foto de ${personInfo.name}`}
              className="h-72 md:w-64 rounded-lg mb-4 md:mb-0 md:mr-4"
            />
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-4xl font-bold">{personInfo.name}</h1>
                <span className="text-sm text-muted-foreground">Data de nascimento: {new Date(personInfo.birthday).toLocaleDateString('pt-BR')}</span>
              </div>
              <div>
                <h2>Biografia</h2>
                <div className="relative">
                  <p className="text-sm leading-5 text-muted-foreground line-clamp-5">
                    {personInfo.biography ? personInfo.biography : "Sem biografia disponível."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <PessoasSkeleton></PessoasSkeleton>
            <FilmesSkeleton></FilmesSkeleton>
          </>
        )}
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl max-lg:p-6">
        <h1 className="text-2xl font-bold">Conhecido(a) por:</h1>
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
          {recognizedBy.map((item: any, index: any) => (
            <div key={index} className="flex flex-col space-x-2 overflow-hidden shadow bg-secondary rounded-md">
              <a href={getLinkPath(item)}>
                <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50">
                  <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} />
                </div>
                <div className="flex flex-col space-y-0 p-3">
                  <span className="text-sm">{item.title || item.name}</span>
                  <span className="text-xs text-muted-foreground">{new Date(item.first_air_date || item.release_date).toLocaleDateString('pt-br')}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const PessoasSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center max-lg:p-6">
      <Skeleton className="h-72 md:w-64 rounded-lg mb-4 md:mb-0 md:mr-4" />
      <div className="flex flex-col gap-4">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div>
          <h2>Biografia</h2>
          <div className="relative">
            <Skeleton className="h-5 w-full mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FilmesSkeleton: React.FC = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-3 mt-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex flex-col space-x-2 overflow-hidden shadow bg-secondary rounded-md">
          <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50">
            <Skeleton className="h-72 w-full" />
          </div>
          <div className="flex flex-col space-y-0 p-3">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pessoas;
