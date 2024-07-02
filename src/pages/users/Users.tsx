import { getProfileByUsername } from "@/services/supabase/Profile/get-profile-by-username";
import { Profile } from "@/types/user-profile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UsersProfile: React.FC<{}> = () => {
  let { username } = useParams<{ username: string }>();
  const [userInfo, setUserInfo] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) return;
        const data = await getProfileByUsername(username);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <main className="w-full">
      <section className="mx-auto mt-12 w-full max-w-6xl">
        {userInfo ? (
          <p>{userInfo.username}</p>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">User not found</h2>
          </div>
        )}
      </section>
    </main>
  );
};

export default UsersProfile;
