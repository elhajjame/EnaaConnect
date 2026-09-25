function FullPageLoader() {
  return (
    <main
      aria-busy="true"
      aria-labelledby="full-loader-title"
      className="code-grid fixed inset-0 z-[100] grid min-h-dvh min-w-80 grid-rows-[auto_1fr_auto] overflow-hidden bg-brand-navy px-5 py-6 text-white [background-size:32px_32px] sm:px-10 sm:py-8 lg:px-[4.5rem] lg:py-10"
    >
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-80 -z-0 h-[34rem] w-[34rem] rounded-full bg-brand-green/30 blur-[90px]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-96 -left-40 -z-0 h-[34rem] w-[34rem] rounded-full bg-brand-lime/10 blur-[90px]"
      />

      <header className="relative z-10 flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-lime font-mono text-sm font-bold text-brand-navy-dark shadow-lg"
          >
            {"</>"}
          </span>

          <span className="font-display text-xl font-bold tracking-tight">
            Enaa<span className="text-brand-lime">Connect</span>
          </span>
        </div>

        <div
          role="status"
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-xs font-bold text-white/70"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 animate-pulse rounded-full bg-brand-lime motion-reduce:animate-none"
          />
          Connecting
        </div>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-[37rem] flex-col items-center justify-center py-5 text-center sm:py-8">
        <div
          aria-hidden="true"
          className="relative mb-6 h-[9.5rem] w-[9.5rem] sm:mb-8 sm:h-[11.5rem] sm:w-[11.5rem]"
        >
          <span className="absolute inset-0 rounded-full border border-white/15" />

          <span className="absolute inset-0 m-auto h-[6.25rem] w-[6.25rem] rounded-full border border-brand-lime/25 sm:h-[7.5rem] sm:w-[7.5rem]" />

          <span className="absolute inset-0 animate-spin [animation-duration:2.4s] motion-reduce:animate-none">
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-lime shadow-[0_0_1rem_rgba(201,243,106,0.75)]" />
          </span>

          <span className="absolute inset-0 m-auto h-[6.25rem] w-[6.25rem] animate-spin [animation-direction:reverse] [animation-duration:3.4s] motion-reduce:animate-none sm:h-[7.5rem] sm:w-[7.5rem]">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_0.75rem_rgba(255,255,255,0.55)]" />
          </span>

          <span className="absolute inset-0 m-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border border-brand-lime/50 bg-brand-green font-mono text-lg font-bold text-brand-lime shadow-[0_0_0_0.75rem_rgba(17,82,28,0.19),0_24px_60px_rgba(5,18,31,0.36)] sm:h-[5.25rem] sm:w-[5.25rem] sm:text-xl">
            {"</>"}
          </span>
        </div>

        <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-lime">
          ENAA student network
        </p>

        <h1
          id="full-loader-title"
          className="mt-3 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.045em] sm:text-[3.25rem]"
        >
          Connecting your campus.
        </h1>

        <p className="mt-4 max-w-[29rem] text-[0.95rem] leading-7 text-white/60 sm:text-[1.08rem]">
          Bringing your feed, events, and conversations together.
        </p>

        <div
          className="mt-6 w-full max-w-[30rem] sm:mt-8"
          aria-label="Loading EnaaConnect"
        >
          <div className="mb-3 flex items-center justify-between text-xs font-semibold text-white/65">
            <span>Preparing your space</span>
            <span className="font-mono">30%</span>
          </div>

          <div
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="30"
            aria-valuetext="Preparing your space"
            className="h-1.5 overflow-hidden rounded-full bg-white/10"
          >
            <span className="block h-full w-[30%] rounded-full bg-brand-lime shadow-[0_0_1.1rem_rgba(201,243,106,0.6)]" />
          </div>
        </div>

        <ul
          aria-label="Content being loaded"
          className="mt-5 flex items-center justify-center gap-3 text-[0.72rem] font-semibold text-white/35 sm:gap-5"
        >
          <li className="inline-flex items-center gap-2 text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-lime shadow-[0_0_0.65rem_rgba(201,243,106,0.72)]" />
            Campus feed
          </li>

          <li className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Events
          </li>

          <li className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Messages
          </li>
        </ul>
      </section>

      <footer className="relative z-10 flex items-center justify-center text-xs text-white/35 sm:justify-between">
        <p className="hidden sm:block">Made for the ENAA community</p>

        <p className="font-mono">
          connect <span className="text-brand-lime">•</span> learn{" "}
          <span className="text-brand-lime">•</span> build
        </p>
      </footer>
    </main>
  );
}

export default FullPageLoader;
