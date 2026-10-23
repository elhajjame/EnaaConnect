import { BadgeCheck, Pencil } from "lucide-react";

import profileCover from "../../assets/profile-cover.png";
import { useState } from "react";
import EditProfile from "./EditProfile";
import ProfileAvatar from "./ProfileAvatar";

function ProfileInfo({ profile, onProfileUpdated }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const isAdmin = profile.role === "admin";

  const studentDetails = [
    profile.fieldOfStudy,
    profile.academicYear ? `${profile.academicYear} promo` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <section className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-card">
      <img
        src={profileCover}
        alt="ENAA students collaborating in a coding lab"
        className="h-44 w-full object-cover sm:h-56"
      />

      <div className="px-5 pb-7 sm:px-8">
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ProfileAvatar profile={profile} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-brand-navy-dark">
                  {profile.fullName}
                </h1>
                {isAdmin && <BadgeCheck className="h-5 w-5 text-brand-green" />}
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {isAdmin
                  ? "EnaaConnect administrator"
                  : studentDetails || "ENAA student"}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsEditOpen(true);
            }}
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-bold text-brand-navy transition hover:bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Edit profile
          </button>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-display text-lg font-bold text-brand-navy-dark">
              About
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              {profile.biography ||
                (isAdmin
                  ? "EnaaConnect administrator helping manage and support the campus community."
                  : "No biography has been added yet.")}
            </p>

            <h2 className="mt-7 font-display text-lg font-bold text-brand-navy-dark">
              Skills &amp; interests
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-xl bg-brand-green/10 px-3 py-2 text-xs font-bold text-brand-green"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl bg-page p-5">
            {/* <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-green">
              Community activity
            </p> */}

            <div className="mt-4 rounded-xl bg-white p-4">
              <span className="inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-green">
                Coming soon
              </span>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Community activity statistics will be available soon.
              </p>
            </div>
          </aside>
        </div>
      </div>
      <EditProfile
        onProfileUpdated={onProfileUpdated}
        profile={profile}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </section>
  );
}

export default ProfileInfo;
