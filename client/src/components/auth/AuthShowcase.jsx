import { CalendarDays, MessagesSquare, UsersRound } from "lucide-react";
import AuthBrand from "./AuthBrand";

const showcaseStats = [
  {
    id: "exchange",
    value: "24/7",
    label: "Campus exchange",
    icon: MessagesSquare,
  },
  {
    id: "events",
    value: "12",
    label: "Events this month",
    icon: CalendarDays,
  },
  {
    id: "clubs",
    value: "08",
    label: "Active clubs",
    icon: UsersRound,
  },
];

function AuthShowcase() {
  return (
    <section
      className="auth-grid relative hidden min-h-screen overflow-hidden bg-brand-navy px-10 py-9 text-white lg:flex lg:flex-col"
      aria-label="About EnaaConnect"
    >
      <div
        aria-hidden="true"
        className="absolute -left-28 top-32 h-80 w-80 rounded-full bg-brand-green/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-brand-lime/15 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="dot-field absolute right-8 top-8 h-48 w-48 opacity-40"
      />

      <div className="relative z-10">
        <AuthBrand />
      </div>

      <div className="relative z-10 my-auto max-w-xl py-16">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-brand-lime shadow-[0_0_12px_#c9f36a]"
          />
          ENAA student network
        </div>

        <h1 className="font-display text-5xl font-semibold leading-[1.06] tracking-[-0.045em] xl:text-6xl">
          One campus.
          <br />
          Every <span className="text-brand-lime">connection.</span>
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-8 text-white/65">
          Share what you learn, find your next event, join a club, and build
          stronger projects with the ENAA community.
        </p>

        <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
          {showcaseStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.id}
                className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur"
              >
                <Icon
                  className="mb-5 h-5 w-5 text-brand-lime"
                  aria-hidden="true"
                />

                <p className="font-display text-2xl font-bold">{stat.value}</p>

                <p className="mt-1 text-xs text-white/55">{stat.label}</p>
              </article>
            );
          })}
        </div>
      </div>

      <footer className="relative z-10 flex items-center justify-between text-xs text-white/40">
        <p>Designed for ENAA students</p>
        <p className="font-mono">connect • learn • build</p>
      </footer>
    </section>
  );
}

export default AuthShowcase;
