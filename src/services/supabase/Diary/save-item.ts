import supabase from "@/services/supabase/client";

interface DiaryEntryData {
  user_id: string;
  title: string;
  release_date: string;
  watch_date: string;
  rating: number;
}

export const saveUserDiaryEntry = async (entryData: DiaryEntryData) => {
  try {
    const { error } = await supabase
      .from('diary_entries')
      .insert([entryData]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error saving entry:', error);
    throw error;
  }
};
