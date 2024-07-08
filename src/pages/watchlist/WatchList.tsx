import { useEffect, useState } from "react";
import WatchListDialog from "@/components/watchlist/WatchListDialog";
import { useAuth } from "@/services/supabase/AuthContext";
import { getUserWatchList, saveUserWatchListEntry } from "@/services/supabase/Watchlist/Watchlist";
import WatchListCommandSearch from "./WatchListCommandSearch";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const WatchList: React.FC<{}> = () => {
  const [openReview, setOpenReview] = useState(false);
  const [openCommand, setOpenCommand] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const [watchListData, setWatchListData] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleDialogClick = (data: any) => {
    setSelectedData(data);
    setOpenReview(true);
  };

  const handleCommandClick = async (data: any, type: any) => {
    if (!user) return;

    const entryData = {
      user_id: user.id,
      title: data.title || data.name,
      overview: data.overview,
      media_type: type,
      vote_average: data.vote_average,
      release_date: data.release_date || data.first_air_date,
      poster_path: data.poster_path,
    };

    try {
      await saveUserWatchListEntry(entryData);

      toast({
        title: "Item adicionado na WatchList",
        description: "O item foi salvo com sucesso!",
      });

      window.location.reload();
    } catch (error) {
      console.error('Error saving entry:', error);
    }

    setOpenCommand(false);
  };

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      if (user) {
        const entries = await getUserWatchList(user.id);
        setWatchListData(entries);
      }
    };

    fetchDiaryEntries();
  }, [user]);

  return (
    <main className="w-full">
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="mb-4 max-xl:p-4 flex flex-row justify-between max-lg:flex-col gap-4">
          <div>
            <h1 className="text-4xl font-bold">Para ver mais tarde</h1>
            <p className="text-sm leading-5 text-muted-foreground md:leading-6">Suas escolhas para assistir em algum momento</p>
          </div>
          <Button
            onClick={() => setOpenCommand(true)}
            variant="outline"
            className="ml-auto max-lg:ml-0">Adicionar novo <CirclePlus className="h-5 w-5 ml-2"></CirclePlus>
          </Button>
        </div>

        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-5 max-lg:grid-cols-2 mt-4 max-lg:p-4">
          {watchListData.map((item: any) => (
            <div onClick={() => handleDialogClick(item)} key={item.id} className="flex flex-col space-x-2 overflow-hidden hover:cursor-pointer shadow bg-secondary rounded-md">
              <div className="relative flex w-full items-center justify-center overflow-hidden bg-background/50">
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title || item.name} />
              </div>
              <div className="flex flex-col space-y-0 py-3">
                <span className="text-sm">{item.title || item.name}</span>
                <span className="text-xs text-muted-foreground">{new Date(item.release_date).toLocaleDateString('pt-br') || new Date(item.first_air_date).toLocaleDateString('pt-br')} ⭐ {item.vote_average.toPrecision(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {watchListData.length === 0 && (
          <div className="p-4">
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center py-20">
                <h3 className="text-2xl font-bold tracking-tight">Ainda não há nada por aqui</h3>
                <p className="text-sm text-muted-foreground">Adicione algum item na sua watchlist</p>
              </div>
            </div>
          </div>
        )}

        <WatchListCommandSearch
          open={openCommand}
          onOpenChange={setOpenCommand}
          onSelect={handleCommandClick}
        />
        {selectedData && (
          <WatchListDialog
            open={openReview}
            onClose={() => setOpenReview(false)}
            data={selectedData}
          />
        )}
      </section>
    </main>
  );
};

export default WatchList;
