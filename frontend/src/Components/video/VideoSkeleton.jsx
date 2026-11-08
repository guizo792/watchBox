// Placeholder with the same footprint as <VideoComponent /> so the grid does
// not jump when real data arrives.
const VideoSkeleton = () => (
  <div className="flex flex-col gap-3" aria-hidden="true">
    <div className="skeleton aspect-video w-full !rounded-xl" />
    <div className="flex gap-3">
      <div className="skeleton h-9 w-9 shrink-0 !rounded-full" />
      <div className="flex-1 space-y-2 pt-0.5">
        <div className="skeleton h-4 w-11/12" />
        <div className="skeleton h-3 w-2/5" />
        <div className="skeleton h-3 w-1/4" />
      </div>
    </div>
  </div>
);

export default VideoSkeleton;
