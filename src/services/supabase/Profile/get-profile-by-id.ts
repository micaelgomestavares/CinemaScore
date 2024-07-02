import { Profile } from "@/types/user-profile";
import supabase from "../client";

export const getProfileById = async (id: string) => {
  const { data: user } = await supabase
    .from('profiles')
    .select()
    .eq('id', id)
    .single<Profile>()

  return user;
}