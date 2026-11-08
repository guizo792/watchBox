import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

// Shared frame for the login / register screens.
export const AuthShell = ({ title, subtitle, children, footer, wide }) => (
  <main className="brand-glow relative flex min-h-screen flex-col items-center justify-center px-4 py-10">
    <ThemeToggle className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-surface-sunken hover:text-ink" />
    <div className={"w-full " + (wide ? "max-w-lg" : "max-w-md")}>
      <Link
        to="/"
        className="mx-auto mb-6 flex w-fit items-center gap-2 text-xl font-bold tracking-tight"
      >
        <img src="/images/logo.png" alt="" className="h-10 w-auto rounded-lg" />
        <span>
          Watch<span className="text-brand">Box</span>
        </span>
      </Link>
      <div className="panel p-6 sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
      {footer && <p className="mt-5 text-center text-sm text-muted">{footer}</p>}
    </div>
  </main>
);

export const TextField = ({ id, label, ...props }) => (
  <div>
    <label htmlFor={id} className="field-label">
      {label}
    </label>
    <input id={id} className="field" {...props} />
  </div>
);

export const PasswordField = ({ id, label, invalid, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          className={"field pr-10 " + (invalid ? "!border-red-500" : "")}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted hover:text-ink"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((s) => !s)}
        >
          {show ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

// Fixed toast so validation messages are always visible, wherever the form is.
export const AuthToast = ({ children }) => (
  <span className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2">
    {children}
  </span>
);
