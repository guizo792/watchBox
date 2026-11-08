import { useState } from "react";

/**
 * Drag-and-drop support for a drop zone.
 * `accept` is a MIME prefix such as "video/" or "image/" (optional).
 * Spread `dropProps` on the zone element and use `dragging` for styling.
 */
const useFileDrop = (onFile, accept) => {
  const [dragging, setDragging] = useState(false);

  const dropProps = {
    onDragEnter: (e) => {
      e.preventDefault();
      setDragging(true);
    },
    onDragOver: (e) => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: (e) => {
      // ignore leave events fired when moving over child elements
      if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false);
    },
    onDrop: (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer?.files?.[0];
      if (file && (!accept || file.type.startsWith(accept))) onFile(file);
    },
  };

  return { dragging, dropProps };
};

export default useFileDrop;
