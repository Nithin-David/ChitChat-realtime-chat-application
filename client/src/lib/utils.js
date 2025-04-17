const formatSmartTime = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();

  // Helper for formatting time
  const formatTime = (d) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${paddedMinutes} ${ampm}`;
  };

  // Check if same day
  const isToday = date.toDateString() === now.toDateString();

  // Check if yesterday
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return formatTime(date); // e.g., 3:12 PM
  } else if (isYesterday) {
    return `Yesterday, ${formatTime(date)}`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}, ${formatTime(date)}`;
  }
};


export default formatSmartTime;