import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import AuthField from "../../components/auth/AuthField";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { getApiErrorMessage } from "../../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login({ email, password }, rememberDevice);

      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((currentValue) => !currentValue);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-label="Sign in form"
    >
      <AuthField id="login-email" label="School email" icon={Mail}>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          disabled={isSubmitting}
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
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
          required
          maxLength={128}
          disabled={isSubmitting}
          autoComplete="current-password"
          id="login-password"
          name="password"
          placeholder="Enter your password"
          className="h-[3.25rem] w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-base text-brand-navy-dark shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          disabled={isSubmitting}
          className=" disabled:cursor-not-allowed disabled:opacity-60 absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </AuthField>

      <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-600">
        <input
          checked={rememberDevice}
          onChange={(event) => setRememberDevice(event.target.checked)}
          disabled={isSubmitting}
          type="checkbox"
          name="rememberDevice"
          className="h-4 w-4 rounded border-slate-300 accent-brand-green"
        />
        Keep me signed in on this device
      </label>
      {errorMessage && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className=" disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-5 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_rgba(17,82,28,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/25 "
      >
        {isSubmitting ? "Signing in..." : "Enter EnaaConnect"}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>
      <p className="text-center text-xs leading-5 text-slate-400">
        Use your @enaa.ma school account to continue.
      </p>
    </form>
  );
}

export default LoginPage;
