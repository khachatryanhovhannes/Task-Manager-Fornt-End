function formatDateString(originalDateString: string) {
  const dateObject = new Date(originalDateString);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export { formatDateString };
