import { Eye, EyeOff } from "lucide-react";
import AuthField from "../../components/auth/AuthField";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { getApiErrorMessage } from "../../services/api";
import FullPageLoader from "../../components/loading/FullPageLoader";

const inputClassName =
  "h-[3.25rem] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-brand-navy-dark shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await register(formData);
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSubmitting) {
    return <FullPageLoader />;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Create account form"
    >
      <AuthField id="register-full-name" label="Full name">
        <input
          value={formData.fullName}
          onChange={handleChange}
          disabled={isSubmitting}
          id="register-full-name"
          name="fullName"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          required
          minLength={3}
          maxLength={100}
          className={inputClassName}
        />
      </AuthField>

      <AuthField id="register-email" label="School email">
        <input
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          autoComplete="email"
          required
          id="register-email"
          name="email"
          type="email"
          placeholder="@enaa.ma"
          className={inputClassName}
        />
      </AuthField>
      <AuthField id="register-password" label="Create password">
        <input
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          disabled={isSubmitting}
          id="register-password"
          name="password"
          placeholder="At least 8 characters"
          className={`${inputClassName} pr-12`}
        />

        <button
          onClick={() => setShowPassword((currentValue) => !currentValue)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          disabled={isSubmitting}
          type="button"
          className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </AuthField>

      <AuthField id="register-confirm-password" label="Confirm password">
        <input
          id="register-confirm-password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Enter your password again"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          disabled={isSubmitting}
          className={`${inputClassName} pr-12`}
        />

        <button
          type="button"
          onClick={() =>
            setShowConfirmPassword((currentValue) => !currentValue)
          }
          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          aria-pressed={showConfirmPassword}
          disabled={isSubmitting}
          className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:cursor-not-allowed disabled:opacity-60"
        >
          {showConfirmPassword ? (
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </AuthField>

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
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-5 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_rgba(17,82,28,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/25 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70"
      >
        {isSubmitting ? "Creating account..." : "Create my profile"}
      </button>
    </form>
  );
}

export default RegisterPage;
