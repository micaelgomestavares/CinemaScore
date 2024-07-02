import { useAuth } from "@/services/supabase/AuthContext";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import DetailsDialog from "./DetailsDialog";
import { DiaryTable } from "./DiaryTable";
import CommandSearch from "./DiaryCommandSearch";

const Diary: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleDialogClick = (data: any, type: string) => {
    setSelectedData({ ...data, type });
    setOpen(false);
    setTimeout(() => setOpenReview(true), 100);
  };

  if (!user) {
    return <div>User not logged in</div>;
  }

  return (
    <main className="w-full">
      <section className="mx-auto my-4 w-full max-w-6xl mt-8">
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="ml-auto">Adicionar novo <CirclePlus className="h-5 w-5 ml-2"></CirclePlus>
          </Button>

          <DiaryTable />

          <CommandSearch
            open={open}
            onOpenChange={setOpen}
            onSelect={handleDialogClick}
          />

          {selectedData && (
            <DetailsDialog
              open={openReview}
              onClose={() => setOpenReview(false)}
              data={selectedData}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Diary;
