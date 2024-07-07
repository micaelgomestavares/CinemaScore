import supabase from "../client";

interface WatchListEntryData {
  id?: string;
  user_id: string;
  title: string;
  vote_average: Number;
  media_type: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

export const getUserWatchList = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('watchlist_entries')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching diary entries:', error);
    return [];
  }
}

export const deleteWatchlistEntry = async (entryId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from("watchlist_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
};

export const saveUserWatchListEntry = async (entryData: WatchListEntryData) => {
  try {
    const { error } = await supabase
      .from('watchlist_entries')
      .insert([entryData]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error saving entry:', error);
    throw error;
  }
};