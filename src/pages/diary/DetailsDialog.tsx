import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/star-rating";
import { useAuth } from "@/services/supabase/AuthContext";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useToast } from "@/components/ui/use-toast"; // Import useToast here
import { DatePickerDetail } from "@/components/date-picker";
import { saveUserDiaryEntry } from "@/services/supabase/Diary/Diary";

const DetailsDialog = ({ open, onClose, data }: any) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(data.stars || 0);
  const [watchDate, setWatchDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

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
      title: data.type === 'movie' ? data.title : data.name,
      release_date: data.type === 'movie' ? data.release_date : data.first_air_date,
      watch_date: watchDate,
      poster_path: data.poster_path,
      rating: rating,
    };

    try {
      await saveUserDiaryEntry(entryData);
      toast({
        title: "Item adicionado!",
        description: "O item foi salvo com sucesso!",
      });
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="max-w-5xl">
        <DialogTitle></DialogTitle>
        <div className="flex flex-row gap-4 p-2">
          <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.title} className="w-[200px] rounded-sm" />
          <div>
            <h1 className="mt-4 text-2xl font-bold">{data.type === 'movie' ? data.title : data.name}
              <span className="text-gray-500 text-sm ml-2">{data.type === 'movie' ? new Date(data.release_date).toLocaleDateString('pt-BR') : new Date(data.first_air_date).toLocaleDateString('pt-BR')}
              </span>
            </h1>
            <p className="text-gray-500">{data.overview}</p>
            <div className="flex flex-col mt-4">
              <span className="text-gray-700">Nota: </span>
              <StarRating rating={rating} onRatingChange={handleRatingChange} />
            </div>

            <div className="flex flex-col mt-6 gap-2">
              <span className="text-gray-700">Assistiu em: </span>
              <DatePickerDetail date={watchDate} setDate={setWatchDate} />
            </div>
            <div className="flex justify-end mx-auto">
              <Button onClick={handleSave} className="mt-4">Adicionar</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;