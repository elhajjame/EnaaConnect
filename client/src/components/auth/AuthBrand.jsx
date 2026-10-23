import { Link } from "react-router-dom";

function AuthBrand({ mobile = false }) {
  return (
    <Link
      to="/login"
      aria-label="EnaaConnect authentication home"
      className="flex w-fit items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-lime/70"
    >
      <span
        className={`grid place-items-center font-mono font-bold ${
          mobile
            ? "h-10 w-10 rounded-xl bg-brand-navy text-sm text-brand-lime"
            : "h-11 w-11 rounded-2xl bg-brand-lime text-lg text-brand-navy-dark shadow-lift"
        }`}
      >
        {"</>"}
      </span>

      <span
        className={`font-display text-xl font-bold tracking-tight ${
          mobile ? "text-brand-navy-dark" : "text-white"
        }`}
      >
        Enaa
        <span className={mobile ? "text-brand-green" : "text-brand-lime"}>
          Connect
        </span>
      </span>
    </Link>
  );
}

export default AuthBrand;
