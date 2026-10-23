function AuthField({ id, label, icon: Icon, action, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm font-bold text-brand-navy-dark">
          {label}
        </label>

        {action}
      </div>

      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        )}

        {children}
      </div>
    </div>
  );
}
export default AuthField;
