import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const DeleteDialog = ({ open, onClose, onDelete }: any) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="w-[400px]">
        Você tem certeza que quer deletar este item?
        <div className="flex flex-row justify-between">
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onDelete} variant={'destructive'}>Deletar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
