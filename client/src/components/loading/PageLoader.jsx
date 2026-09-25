function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading EnaaConnect"
      className="flex flex-col items-center gap-5"
    >
      <div
        className="relative h-[5.75rem] w-[5.75rem] min-[421px]:h-[6.5rem] min-[421px]:w-[6.5rem]"
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full border border-brand-navy/30" />

        <span className="absolute inset-0 m-auto h-[3.75rem] w-[3.75rem] rounded-full border border-brand-green/50 min-[421px]:h-[4.25rem] min-[421px]:w-[4.25rem]" />

        <span className="absolute inset-0 animate-spin [animation-duration:2.6s] motion-reduce:animate-none">
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-lime shadow-[0_0_0.75rem_rgba(201,243,106,0.78)]" />
        </span>

        <span className="absolute inset-0 m-auto h-[3.75rem] w-[3.75rem] animate-spin [animation-direction:reverse] [animation-duration:3.25s] motion-reduce:animate-none min-[421px]:h-[4.25rem] min-[421px]:w-[4.25rem]">
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-navy shadow-[0_0_0.5rem_rgba(24,56,98,0.3)]" />
        </span>

        <span className="absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full border border-brand-lime bg-brand-green font-mono text-base font-semibold text-brand-lime shadow-[0_0_0_0.25rem_rgba(17,82,28,0.1),0_0.75rem_1.75rem_rgba(11,32,56,0.2)] min-[421px]:h-[3.4rem] min-[421px]:w-[3.4rem]">
          {"</>"}
        </span>
      </div>

      <p
        aria-hidden="true"
        className="text-center font-mono text-[0.64rem] font-semibold uppercase leading-[1.4] tracking-[0.26em] text-brand-green"
      >
        ENAA student network
      </p>

      <span className="sr-only">Loading EnaaConnect</span>
    </div>
  );
}

export default PageLoader;
