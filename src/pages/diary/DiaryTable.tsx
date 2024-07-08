import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useAuth } from "@/services/supabase/AuthContext";
import EditDialog from "./EditDiaryItemDialog";
import { Button } from "@/components/ui/button";
import DeleteDialog from "./DeleteDiaryItemDialog";
import { deleteDiaryEntry, getUserDiaryEntries, updateDiaryEntry } from "@/services/supabase/Diary/Diary";
import { PenIcon, Trash } from "lucide-react";
import { formatDate } from "@/lib/utils";

const renderStars = (stars: string) => {
  const fullStars = Math.floor(Number(stars));
  const halfStar = Number(stars) % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex flex-row">
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-500 w-5 h-5" />
        ))}
      {halfStar === 1 && <FaStarHalfAlt key="half" className="text-yellow-500 w-5 h-5" />}
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-gray-300 w-5 h-5" />
        ))}
    </div>
  );
};

export function DiaryTable() {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      if (user) {
        const entries = await getUserDiaryEntries(user.id);
        setData(entries);
      }
    };

    fetchDiaryEntries();
  }, [user]);

  useEffect(() => {
    if (!isEditDialogOpen) {
      setSelectedEntry(null);
    }
  }, [isEditDialogOpen]);

  const handleEditClick = (entry: any) => {
    setSelectedEntry(entry);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (entry: any) => {
    setSelectedEntry(entry);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = async (editedEntry: any) => {
    await updateDiaryEntry(editedEntry);
    setData((prevData) =>
      prevData.map((item) => (item.id === editedEntry.id ? editedEntry : item))
    );
  };

  const handleDelete = async () => {
    if (!selectedEntry || !user) {
      return;
    }
    await deleteDiaryEntry(selectedEntry.id, user.id);
    setData((prevData) => prevData.filter((item) => item.id !== selectedEntry.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data assistida</TableHead>
            <TableHead>Poster</TableHead>
            <TableHead>Titulo</TableHead>
            <TableHead>Data de lançamento</TableHead>
            <TableHead>Nota</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry: any) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{formatDate(entry.watch_date)}</TableCell>
              <TableCell><img className="w-16" src={`https://image.tmdb.org/t/p/w500/${entry.poster_path}`} alt={entry.title} /></TableCell>
              <TableCell>{entry.title}</TableCell>
              <TableCell>{new Date(entry.release_date).getFullYear()}</TableCell>
              <TableCell>{renderStars(entry.rating.toString())}</TableCell>
              <TableCell>
                <div className="flex flex-row max-lg:flex-col gap-2">
                  <Button onClick={() => handleEditClick(entry)}><PenIcon className="w-5 h-5" /></Button>
                  <Button variant={'destructive'} onClick={() => handleDeleteClick(entry)}><Trash className="w-5 h-5"></Trash></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedEntry && (
        <EditDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          entry={selectedEntry}
          onSave={handleSave}
        />
      )}
      {selectedEntry && (
        <DeleteDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
