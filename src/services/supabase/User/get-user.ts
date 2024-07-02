import { getProfileById } from '../Profile/get-profile-by-id';
import supabase from '../client'

export const getUserService = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user?.id) {
    const profile = getProfileById(user.id)
    return profile;
  }

  return null;
}