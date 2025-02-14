export default function formatDate(isoString) {
  //const isoString = "2025-02-13T13:21:44.227Z";

  // Create a Date object from the ISO string
  const date = new Date(isoString);

  // Format the date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  
  const formattedDate = date.toLocaleString('en-US', { ...options, timeZone: 'Asia/Karachi' });

  return (formattedDate);
}
