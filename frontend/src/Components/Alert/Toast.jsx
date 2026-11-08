import { useEffect } from "react";
import Alert from "./Alert";

/**
 * Floating notice pinned to the bottom of the screen that dismisses itself.
 * Usage: {state.show && <Toast msg={state.msg} show={setState} />}
 * `show` is the state setter; it is called with { show: false, msg: "" }.
 */
const Toast = ({ msg, show, duration = 5000 }) => {
  useEffect(() => {
    const t = setTimeout(() => show({ show: false, msg: "" }), duration);
    return () => clearTimeout(t);
  }, [msg, show, duration]);

  return (
    <span className="fixed bottom-6 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2">
      <Alert msg={msg} show={show} />
    </span>
  );
};

export default Toast;
