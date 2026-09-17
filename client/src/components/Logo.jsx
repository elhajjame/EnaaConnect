import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="flex w-fit items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime focus-visible:ring-offset-2
        focus-visible:ring-offset-brand-navy"
      aria-label="EnaaConnect home"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-lime font-mono text-sm font-bold text-brand-navy-dark">
        {"</>"}
      </span>

      <span className="text-lg font-bold tracking-tight text-white">
        Enaa<span className="text-brand-lime">Connect</span>
      </span>
    </Link>
  );
}

export default Logo;
