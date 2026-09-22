import { BadgeCheck, Pencil } from "lucide-react";

import profileCover from "../../assets/profile-cover.png";
import { useState } from "react";
import EditProfile from "./EditProfile";

const activityStats = [
  { label: "Posts", value: "18" },
  { label: "Clubs", value: "04" },
  { label: "Events", value: "11" },
];

function ProfileInfo({ profile, onProfileUpdated }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

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
            <img
              src={profile.profilePicture}
              alt={profile.fullName}
              className="h-28 w-28 shrink-0 rounded-[1.8rem] border-4 border-white object-cover shadow-card"
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-brand-navy-dark">
                  {profile.fullName}
                </h1>

                <BadgeCheck
                  className="h-5 w-5 text-brand-green"
                  aria-label="Verified student"
                />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {profile.fieldOfStudy} · {profile.academicYear} promo
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
              {profile.biography}
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
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-green">
              Community activity
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {activityStats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white p-3">
                  <strong className="font-display text-xl text-brand-navy-dark">
                    {stat.value}
                  </strong>

                  <span className="mt-1 block text-[10px] text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
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
