import { useEffect, useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfilePosts from "../components/profile/ProfilePosts";
import useAuth from "../hooks/useAuth";
import { getProfile } from "../services/profileService";
import { getApiErrorMessage } from "../services/api";

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function handleProfileUpdated(updatedProfile) {
    setProfile(updatedProfile);
    updateUser(updatedProfile);
  }

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }
      try {
        setErrorMessage("");

        const profileData = await getProfile(user.id);
        setProfile(profileData);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, [user?.id]);

  if (isLoading) {
    return;
  }

  if (errorMessage) {
    return (
      <div
        role="alert"
        className="rounded-card border border-red-200 bg-red-50 p-6 text-sm
        text-red-700"
      >
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileInfo profile={profile} onProfileUpdated={handleProfileUpdated} />
      <ProfilePosts />
    </div>
  );
}

export default ProfilePage;
