export default function getInitials(fullName = "") {
  const initials = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return initials || "U";
}
