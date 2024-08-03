export const formatDatetime = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() returns month index from 0 to 11
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, "0");

  // return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
  return `${day}/${month}/${year}`;
};

export const formatCurrency = (data) => {
  data = isNaN(parseFloat(data)) ? 0 : parseFloat(data);
  return data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const formatInvoiceStatus = (data) => {
  if (data == "B") return "Billed";
  else if (data == "P") return "Paid";
  else if (data == "V") return "Void";
  else return "";
};
