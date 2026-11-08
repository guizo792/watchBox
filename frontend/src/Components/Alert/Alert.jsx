import React from "react";
import Fade from "react-reveal/Fade";
import { MdErrorOutline, MdClose } from "react-icons/md";

const Alert = ({ msg, show }) => {
  return (
    <Fade top>
      <div
        id="alert-1"
        className="flex max-w-xl items-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-white shadow-card-hover"
        role="alert"
      >
        <MdErrorOutline size={22} className="shrink-0" aria-hidden="true" />
        <div className="text-sm font-medium">{msg}</div>
        <button
          type="button"
          className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-red-700"
          aria-label="Close"
          onClick={() => show({ show: false, msg: "" })}
        >
          <MdClose size={20} />
        </button>
      </div>
    </Fade>
  );
};

export default Alert;
