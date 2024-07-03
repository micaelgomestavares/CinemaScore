import supabase from "@/services/supabase/client";

export const getUserDiaryEntries = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', userId)
      .order('watch_date', { ascending: false }); // Ordena por watch_date decrescente

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching diary entries:', error);
    return [];
  }
};