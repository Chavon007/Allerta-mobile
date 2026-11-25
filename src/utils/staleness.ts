export type StaleLevel = "live" | "warning" | "stale";

export function getStaleness(updatedAt?: string | null, now = Date.now()) {
  if (!updatedAt) {
    return {
      level: "live" as StaleLevel,
      label: "Waiting for location",
      minutes: 0,
    };
  }

  const seconds = Math.max(
    0,
    Math.floor((now - new Date(updatedAt).getTime()) / 1000),
  );

  const minutes = Math.floor(seconds / 60);

  let ago: string;

  if (seconds < 60) ago = "just now";
  else if (minutes < 60) ago = `${minutes} min ago`;
  else ago = `${Math.floor(minutes / 60)} hr ago`;

  let level: StaleLevel = "live";
  if (minutes >= 10) level = "stale";
  else if (minutes >= 2) level = "warning";

  return { level, label: ago, minutes };
}
