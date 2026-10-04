import { useEffect, useState } from "react";

type Size = "header" | "hero" | "feed" | "icon";

const frame: Record<Size, string> = {
  header: "size-10",
  hero: "size-40 sm:size-56",
  feed: "size-16 sm:size-20",
  icon: "size-12",
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export function Mark({
  size,
  motion = false,
}: {
  size: Size;
  motion?: boolean;
}) {
  const reduced = useReducedMotion();
  const [broken, setBroken] = useState(false);
  const showVideo = motion && !reduced && !broken;

  return (
    <div className={`${frame[size]} shrink-0 overflow-hidden`}>
      {showVideo ? (
        <video
          className="block h-full w-full object-cover"
          src="/mark.mp4"
          poster="/mark.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-label="The Pleading Sanity mark"
          onError={() => setBroken(true)}
        />
      ) : (
        <img
          className="block h-full w-full object-cover"
          src="/mark.jpg"
          alt="The Pleading Sanity mark. A cosmic brain, one tear."
        />
      )}
    </div>
  );
}
