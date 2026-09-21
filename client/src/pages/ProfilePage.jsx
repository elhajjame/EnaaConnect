import ProfileInfo from "../components/profile/ProfileInfo";
import ProfilePosts from "../components/profile/ProfilePosts";

function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileInfo />
      <ProfilePosts />
    </div>
  );
}

export default ProfilePage;
