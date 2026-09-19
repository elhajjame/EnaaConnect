import { Outlet } from "react-router-dom";
import AuthBrand from "../components/auth/AuthBrand";
import AuthShowcase from "../components/auth/AuthShowcase";
import AuthTabs from "../components/auth/AuthTabs";

function AuthLayout() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <AuthShowcase />

      <section className="light-grid relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-green via-brand-lime to-brand-navy lg:hidden"
        />

        <div className="w-full max-w-[470px]">
          <div className="mb-10 lg:hidden">
            <AuthBrand mobile />
          </div>

          <header className="mb-8">
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">
              Welcome to campus
            </p>

            <h1 className="font-display text-3xl font-bold tracking-tight text-brand-navy-dark sm:text-4xl">
              Your community starts here.
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-500">
              Sign in with your school account or create your student profile.
            </p>
          </header>

          <AuthTabs />

          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
