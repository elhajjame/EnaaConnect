import { ArrowRight, Eye, LockKeyhole, Mail } from "lucide-react";
import AuthField from "../../components/auth/AuthField";

function LoginPage() {
  return (
    <form className="space-y-5" aria-label="Sign in form">
      <AuthField id="login-email" label="School email" icon={Mail}>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="name@enaa.ma"
          className="h-[3.25rem] w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-base text-brand-navy-dark shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
        />
      </AuthField>

      <AuthField
        id="login-password"
        label="Password"
        icon={LockKeyhole}
        action={
          <button
            type="button"
            className="rounded-md text-sm font-bold text-brand-green hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/20"
          >
            Forgot password?
          </button>
        }
      >
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="h-[3.25rem] w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-base text-brand-navy-dark shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
        />

        <button
          type="button"
          aria-label="Show password"
          className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          <Eye className="h-5 w-5" aria-hidden="true" />
        </button>
      </AuthField>

      <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          name="rememberDevice"
          className="h-4 w-4 rounded border-slate-300 accent-brand-green"
        />
        Keep me signed in on this device
      </label>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-5 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_rgba(17,82,28,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/25"
      >
        Enter EnaaConnect
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <p className="text-center text-xs leading-5 text-slate-400">
        UI preview only — no account information is submitted.
      </p>
    </form>
  );
}

export default LoginPage;
