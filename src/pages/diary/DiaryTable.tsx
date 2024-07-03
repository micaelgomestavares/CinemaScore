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

  function formatDate(date: string): string {
    // Verifica se a string está no formato esperado (yyyy-MM-dd)
    if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
        throw new Error('Formato de data inválido. Esperado: yyyy-MM-dd');
    }

    // Divide a string da data em partes
    const parts = date.split('-');

    // Verifica se temos três componentes de data
    if (parts.length !== 3) {
        throw new Error('Formato de data inválido. Esperado: yyyy-MM-dd');
    }

    // Extrai o dia, mês e ano
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    // Retorna a data formatada como dd/MM/yyyy
    return `${day}/${month}/${year}`;
}

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
            <TableCell className="font-medium">{formatDate(entry.watch_date)}</TableCell>
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
