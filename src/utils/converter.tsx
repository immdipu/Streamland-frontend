export function convertMinutesToHours(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = `${hours} hour${hours > 1 ? "s" : ""}`;
  const minutesText =
    remainingMinutes > 0
      ? `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
      : "";

  return `${hoursText} ${minutesText}`.trim();
}
