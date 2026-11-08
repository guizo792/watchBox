import { useEffect } from "react";
import { MdClose } from "react-icons/md";

/**
 * Accessible modal: closes on Escape and on backdrop click, locks page scroll
 * while open, and is announced as a dialog.
 */
const Modal = ({ open, title, onClose, children }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="panel w-full max-w-sm p-5"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            className="rounded-full p-1 text-muted hover:bg-surface-sunken hover:text-ink"
            aria-label="Close"
            onClick={onClose}
          >
            <MdClose size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
