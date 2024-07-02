import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useAuth } from "@/services/supabase/AuthContext";
import { getUserDiaryEntries } from "@/services/supabase/Diary/get-user-diary";

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

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      if (user) {
        const entries = await getUserDiaryEntries(user.id);
        setData(entries);
      }
    };

    fetchDiaryEntries();
  }, [user]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data assistida</TableHead>
          <TableHead>Titulo</TableHead>
          <TableHead>Data de lançamento</TableHead>
          <TableHead>Nota</TableHead>
          <TableHead>Editar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry: any) => (
          <TableRow key={entry.id}>
            <TableCell className="font-medium">{new Date(entry.watch_date).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>{entry.title}</TableCell>
            <TableCell>{new Date(entry.release_date).getFullYear()}</TableCell>
            <TableCell>{renderStars(entry.rating.toString())}</TableCell>
            <TableCell>
              {/* Add edit button if needed */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
