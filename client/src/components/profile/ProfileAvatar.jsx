import getInitials from "../../utils/getInitials";

function ProfileAvatar({ profile }) {
  if (profile.profilePicture) {
    return (
      <img
        src={profile.profilePicture}
        alt={profile.fullName}
        className="h-28 w-28 shrink-0 rounded-[1.8rem] border-4 border-white object-cover shadow-card"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={profile.fullName}
      className="grid h-28 w-28 shrink-0 place-items-center rounded-[1.8rem] border-4 border-white bg-gradient-to-br from-brand-lime to-[#86c48f] font-display text-3xl font-bold text-brand-navy-dark shadow-card"
    >
      {getInitials(profile.fullName)}
    </div>
  );
}

export default ProfileAvatar;
