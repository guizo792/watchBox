import { useEffect, useState } from "react";

// Stable color per name so the same person always gets the same avatar.
const hueFor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 360;
  }
  return hash;
};

/**
 * Round avatar. Shows the picture when there is one, otherwise a colored
 * circle with the person's initial. While the user is still loading (no
 * name, no picture) it renders a neutral placeholder.
 * Size and text size come from `className` (e.g. "h-9 w-9 text-sm").
 */
const Avatar = ({ src, name, className = "" }) => {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className={
          "shrink-0 rounded-full bg-surface-sunken object-cover " + className
        }
      />
    );
  }

  const label = (name || "").trim();
  if (!label) {
    return (
      <span
        aria-hidden="true"
        className={"inline-block shrink-0 rounded-full bg-line " + className}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={
        "inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold uppercase text-white " +
        className
      }
      style={{ backgroundColor: `hsl(${hueFor(label)} 52% 42%)` }}
    >
      {label.charAt(0)}
    </span>
  );
};

export default Avatar;
