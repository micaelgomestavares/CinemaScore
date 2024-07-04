import supabase from "../client";

interface DiaryEntryData {
  id?: string;
  user_id: string;
  title: string;
  release_date: string;
  watch_date: string;
  poster_path: string;
  rating: number;
}

export const getUserDiaryEntries = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', userId)
      .order('watch_date', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching diary entries:', error);
    return [];
  }
};

export const updateDiaryEntry = async (entry: DiaryEntryData): Promise<void> => {
  const { error } = await supabase
    .from("diary_entries")
    .update({
      title: entry.title,
      release_date: entry.release_date,
      watch_date: entry.watch_date,
      poster_path: entry.poster_path,
      rating: entry.rating,
    })
    .eq("user_id", entry.user_id)
    .eq("id", entry.id);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteDiaryEntry = async (entryId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from("diary_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
};

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

