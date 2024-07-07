import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/star-rating";
import { useAuth } from "@/services/supabase/AuthContext";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useToast } from "@/components/ui/use-toast"; // Import useToast here
import { DatePickerDetail } from "@/components/date-picker";
import { saveUserDiaryEntry } from "@/services/supabase/Diary/Diary";
import { deleteWatchlistEntry } from "@/services/supabase/Watchlist/Watchlist";

const WatchListDialog = ({ open, onClose, data }: any) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [rating, setRating] = useState(data.stars || 0);
  const [watchDate, setWatchDate] = useState(new Date().toISOString().split('T')[0]);

  const handleRatingChange = (rate: number) => {
    setRating(rate);
  };

  const handleSave = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const entryData = {
      user_id: user.id,
      title: data.title || data.name,
      release_date: data.release_date || data.first_air_date,
      watch_date: watchDate,
      poster_path: data.poster_path,
      rating: rating,
    };

    try {
      await saveUserDiaryEntry(entryData);
      toast({
        title: "Item adicionado ao diário",
        description: "O item foi salvo com sucesso!",
      });
      await deleteWatchlistEntry(data.id, user.id);
      onClose();
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Não foi possível salvar o item. Tente novamente.",
      });
      console.error('Error saving entry:', error);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    try {
      await deleteWatchlistEntry(data.id, user.id);

      toast({
        title: "Item removido da watchlist",
        description: "O item foi removido com sucesso",
      });

      onClose();
      setInterval(() => {
        window.location.reload();
      }, 500);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Não foi possível remover o item. Tente novamente.",
      });
      console.error('Error deleting entry:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="max-w-5xl">
        <DialogTitle></DialogTitle>
        <div className="flex flex-row gap-4 p-2">
          <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.title} className="w-[250px] rounded-sm max-lg:hidden" />
          <div className="flex flex-col gap-4">

            <div>
              <h1 className="mt-4 text-2xl font-bold">{data.title || data.name}
                <span className="text-secondary-foreground text-sm ml-2">{new Date(data.release_date).toLocaleDateString('pt-BR') || new Date(data.first_air_date).toLocaleDateString('pt-BR')}</span>
              </h1>
              <p className="text-secondary-foreground">{data.overview}</p>
            </div>

            <div>
              <span className="text-primary">Nota: </span>
              <StarRating rating={rating} onRatingChange={handleRatingChange} />
            </div>

            <div className="flex flex-col">
              <span className="text-primary">Assistiu em: </span>
              <DatePickerDetail date={watchDate} setDate={setWatchDate} />
            </div>

            <div className="flex justify-end gap-4 max-lg:justify-between mt-auto">
              <Button onClick={handleDelete} variant={'destructive'} className="mt-4">Remover</Button>
              <Button onClick={handleSave} className="mt-4">Adicionar ao diário</Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WatchListDialog;