import { Profile } from "@/types/user-profile";
import supabase from "../client";

export const getProfileByUsername = async (username: string) => {
  const { data: user } = await supabase
    .from('profiles')
    .select()
    .eq('username', username)
    .single<Profile>()

  return user;
}