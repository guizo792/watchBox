import { useEffect, useState } from "react";
import { MdOndemandVideo } from "react-icons/md";

/**
 * Thumbnail image that fades in once loaded and shows a neutral placeholder
 * if the image is missing or fails. The parent supplies the box size/shape
 * (this fills it), so it works for cards, lists and search results.
 */
const Thumbnail = ({ src, alt = "", className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center bg-surface-sunken text-muted " +
          className
        }
        role="img"
        aria-label={alt || "No thumbnail"}
      >
        <MdOndemandVideo size={36} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={
        "h-full w-full object-cover transition-opacity duration-500 " +
        (loaded ? "opacity-100 " : "opacity-0 ") +
        className
      }
    />
  );
};

export default Thumbnail;
