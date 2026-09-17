import { Eye, Sparkles } from "lucide-react";
import AuthField from "../../components/auth/AuthField";

const inputClassName =
  "h-[3.25rem] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-brand-navy-dark shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";

function RegisterPage() {
  return (
    <form className="space-y-4" aria-label="Create account form">
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField id="register-full-name" label="Full name">
          <input
            id="register-full-name"
            name="fullName"
            type="text"
            placeholder="Your name"
            className={inputClassName}
          />
        </AuthField>

        <AuthField id="register-academic-year" label="Academic year">
          <select
            id="register-academic-year"
            name="academicYear"
            defaultValue="1st year"
            className={`${inputClassName} text-slate-600`}
          >
            <option>1st year</option>
            <option>2nd year</option>
          </select>
        </AuthField>
      </div>

      <AuthField id="register-email" label="School email">
        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="name@enaa.ma"
          className={inputClassName}
        />
      </AuthField>

      <AuthField id="register-study-field" label="Field of study">
        <input
          id="register-study-field"
          name="fieldOfStudy"
          type="text"
          defaultValue="Web & Mobile Development"
          className={inputClassName}
        />
      </AuthField>

      <AuthField id="register-password" label="Create password">
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          className={`${inputClassName} pr-12`}
        />

        <button
          type="button"
          aria-label="Show password"
          className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          <Eye className="h-5 w-5" aria-hidden="true" />
        </button>
      </AuthField>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-5 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_rgba(17,82,28,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/25"
      >
        Create my profile
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </button>

      <p className="text-center text-xs leading-5 text-slate-400">
        UI preview only — no account information is submitted.
      </p>
    </form>
  );
}

export default RegisterPage;
