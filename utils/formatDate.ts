// convert the ISO 8601 date string to: Month Day, Year

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const formatDate = (dateStr: string) => {
  // starting date
  const date = new Date(dateStr);

  // construct desired pieces of data
  const month = months[date.getMonth() + 1];
  const day = date.getDate();
  const year = date.getFullYear();

  // return formatted date
  return `${month} ${day}, ${year}`;
};
