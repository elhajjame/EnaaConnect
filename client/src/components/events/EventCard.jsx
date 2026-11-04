import {
  Bookmark,
  BusFront,
  ChevronRight,
  Code2,
  GraduationCap,
  MapPin,
  Music,
  Trophy,
  UsersRound,
  WandSparkles,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import getInitials from "../../utils/getInitials";

const avatarColors = ["bg-brand-lime", "bg-[#86c48f]", "bg-[#b8d3e6]"];

const categoryStyles = {
  education: {
    label: "Education",
    background: "bg-gradient-to-br from-brand-green to-emerald-500",
    badge: "bg-white text-brand-green-dark",
    date: "text-brand-lime",
    Icon: GraduationCap,
  },

  sports: {
    label: "Sports",
    background: "bg-gradient-to-br from-sky-600 to-blue-500",
    badge: "bg-white text-sky-700",
    date: "text-white/80",
    Icon: Trophy,
  },

  workshops: {
    label: "Workshop",
    background: "bg-gradient-to-br from-brand-navy-dark to-brand-navy",
    badge: "bg-brand-lime text-brand-navy-dark",
    date: "text-brand-lime",
    Icon: Code2,
  },

  culture: {
    label: "Culture",
    background: "bg-gradient-to-br from-amber-500 to-orange-400",
    badge: "bg-white text-amber-700",
    date: "text-white/80",
    Icon: WandSparkles,
  },

  entertainment: {
    label: "Entertainment",
    background: "bg-gradient-to-br from-violet-600 to-fuchsia-500",
    badge: "bg-white text-violet-700",
    date: "text-white/80",
    Icon: Music,
  },

  trips: {
    label: "Trips",
    background: "bg-gradient-to-br from-brand-navy-dark to-brand-green",
    badge: "bg-brand-lime text-brand-navy-dark",
    date: "text-brand-lime",
    Icon: BusFront,
  },
};

function EventCard({
  event,
  onViewParticipants,
  participants,
  onJoin,
  onLeave,
  isJoining,
  isLeaving,
}) {
  const { user } = useAuth();
  const style = categoryStyles[event.category] || categoryStyles.education;
  const DecorativeIcon = style.Icon;
  const isFull =
    event.isFull || event.participantsCount >= event.maximumParticipants;
  const previewParticipants = participants?.slice(0, 3) || [];
  return (
    <article className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-card">
      <div className={`relative h-44 p-5 text-white ${style.background}`}>
        <div className="relative z-10 flex items-start justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}
          >
            {style.label}
          </span>

          <button
            type="button"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"
            aria-label={`Save ${event.title}`}
          >
            <Bookmark className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="absolute bottom-5 left-5 z-10 pr-16">
          <p className={`font-mono text-xs font-semibold ${style.date}`}>
            {event.date} · {event.time}
          </p>

          <h2 className="mt-1 font-display text-2xl font-bold">
            {event.title}
          </h2>
        </div>

        <DecorativeIcon
          className="absolute bottom-5 right-5 h-12 w-12 text-white/15"
          aria-hidden="true"
        />
      </div>

      <div className="p-5">
        <p className="text-sm leading-6 text-slate-500">{event.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="flex min-w-0 items-center gap-2 text-xs font-semibold text-slate-500">
            <MapPin
              className="h-4 w-4 shrink-0 text-brand-green"
              aria-hidden="true"
            />

            <span className="truncate">{event.location}</span>
          </p>

          <p className="shrink-0 text-xs font-bold text-brand-green">
            {event.participantsCount} / {event.maximumParticipants} seats
          </p>
        </div>
        {user?.role === "student" && (
          <button
            type="button"
            onClick={() => onViewParticipants(event)}
            className="mt-4 flex w-full items-center gap-3 rounded-xl bg-page px-3 py-2.5 text-left transition hover:bg-[#eef8ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            aria-label={`View participants for ${event.title}`}
          >
            <span className="flex shrink-0 -space-x-2" aria-hidden="true">
              {previewParticipants.length > 0 ? (
                previewParticipants.map((participant, index) =>
                  participant.profilePicture ? (
                    <img
                      key={participant.id}
                      src={participant.profilePicture}
                      alt=""
                      className="h-9 w-9 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <span
                      key={participant.id}
                      className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white font-display text-[10px] font-bold text-brand-navy-dark ${avatarColors[index]}`}
                    >
                      {getInitials(participant.fullName)}
                    </span>
                  ),
                )
              ) : (
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[#d9e8f2] text-brand-navy-dark">
                  <UsersRound className="h-4 w-4" />
                </span>
              )}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-brand-navy-dark">
                {event.participantsCount} students joined
              </span>
              <span className="block text-[11px] text-slate-500">
                View participants
              </span>
            </span>

            <ChevronRight
              className="h-4 w-4 shrink-0 text-brand-green"
              aria-hidden="true"
            />
          </button>
        )}

        {user?.role === "student" && (
          <button
            type="button"
            onClick={() => {
              if (event.joined) {
                onLeave(event.id);
              } else {
                onJoin(event.id);
              }
            }}
            disabled={isJoining || isLeaving || (!event.joined && isFull)}
            className="mt-4 w-full cursor-pointer rounded-xl bg-brand-green py-2.5 text-sm font-bold text-white transition hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isJoining
              ? "Joining..."
              : isLeaving
                ? "Leaving..."
                : event.joined
                  ? "Leave event"
                  : isFull
                    ? "Event full"
                    : "Join event"}
          </button>
        )}
      </div>
    </article>
  );
}

export default EventCard;
