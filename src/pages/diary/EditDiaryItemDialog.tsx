import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import StarRating from '@/components/star-rating';
import { Input } from '@/components/ui/input';

const EditDialog = ({ open, onClose, entry, onSave }: any) => {
  const [editedEntry, setEditedEntry] = useState(entry);
  const [rating, setRating] = useState(entry.rating || 0);


  const handleRatingChange = (rate: number) => {
    setRating(rate);
    setEditedEntry({ ...editedEntry, rating: rate });
  };

  const handleSave = () => {
    onSave(editedEntry);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 p-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-primary">
              Título
            </label>
            <Input
              type="text"
              name="title"
              id="title"
              value={editedEntry.title}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div className="flex flex-col">
            <span className="text-primary">Nota: </span>
            <StarRating rating={rating} onRatingChange={handleRatingChange} />
          </div>

          <div className="flex justify-between mt-4">
            <Button variant={'destructive'} onClick={onClose} className="mr-2">Cancelar</Button>
            <Button onClick={handleSave}>Salvar alterações</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
