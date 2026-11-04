import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfilePosts from "../components/profile/ProfilePosts";
import useAuth from "../hooks/useAuth";
import { getProfile } from "../services/profileService";
import { getApiErrorMessage } from "../services/api";
import { getCurrentUser } from "../context/AuthService";
import PageLoader from "../components/loading/PageLoader";

function ProfilePage() {
  const { user, updateUser } = useAuth();

  const { userId: routeUserId } = useParams();
  const profileId = routeUserId || user?.id;
  const isOwnProfile = profileId === user?.id;

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function handleProfileUpdated(updatedProfile) {
    setProfile(updatedProfile);
    updateUser(updatedProfile);
  }

  useEffect(() => {
    async function loadProfile() {
      if (!profileId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        setErrorMessage("");

        const profileData =
          isOwnProfile && user.role === "admin"
            ? await getCurrentUser()
            : await getProfile(profileId);

        setProfile(profileData);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, [profileId, isOwnProfile, user?.role]);

  if (isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <PageLoader />
      </div>
    );
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
      <ProfileInfo
        isOwnProfile={isOwnProfile}
        profile={profile}
        onProfileUpdated={handleProfileUpdated}
      />
      <ProfilePosts userId={profile.id} profileName={profile.fullName} />
    </div>
  );
}

export default ProfilePage;
