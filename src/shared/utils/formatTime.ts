export const formatTime = (time: string | null) => {
  if (!time) return "-";
  const hh = time.slice(0, 2);
  const mm = time.slice(2, 4);
  return `${hh}:${mm}시`;
};
