// DATES
export function addThreeDays(date) {
  const result = new Date(date);
  result.setDate(result.getDate() + 3);
  return (
    result.getFullYear() +
    "-" +
    (result.getMonth() + 1) +
    "-" +
    result.getDate()
  );
}

const today = new Date();
export const todaysDate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
