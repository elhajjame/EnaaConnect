import { Bell, Menu, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-page/90 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-3 px-4 sm:px-6 xl:px-9">
        <a
          href="#mobile-sidebar"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-brand-navy lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </a>

        <div className="hidden min-w-0 lg:block">
          <h1 className="truncate text-xl font-bold tracking-tight text-brand-navy-dark">
            Campus feed
          </h1>

          <p className="truncate text-xs text-muted">
            A quick look at what is happening today.
          </p>
        </div>

        <label
          className="relative mx-auto hidden w-full max-w-xl md:block lg:ml-auto lg:mr-0"
          aria-label="Search EnaaConnect"
        >
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />

          <input
            type="search"
            className="w-full rounded-2xl border border-line bg-white py-3 pl-11 pr-20 text-sm text-brand-navy-dark shadow-sm placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
            placeholder="Search students, clubs, events..."
          />
        </label>

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-brand-navy md:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-brand-navy"
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />

          <span
            className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-lime to-brand-green text-sm font-bold text-brand-navy-dark shadow-sm"
          aria-label="Open my profile"
        >
          ME
        </button>
      </div>
    </header>
  );
}

export default Topbar;
