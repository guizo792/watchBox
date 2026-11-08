import Modal from "./Modal";

// Replacement for window.confirm: styled, themeable and keyboard friendly.
const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
  onConfirm,
  onCancel,
}) => (
  <Modal open={open} title={title} onClose={onCancel}>
    {message && <p className="text-sm text-muted">{message}</p>}
    <div className="mt-5 flex justify-end gap-2">
      <button type="button" className="btn-ghost" onClick={onCancel}>
        Cancel
      </button>
      <button
        type="button"
        autoFocus
        className={
          danger ? "btn bg-red-600 text-white hover:bg-red-700" : "btn-primary"
        }
        onClick={onConfirm}
      >
        {confirmLabel}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;
