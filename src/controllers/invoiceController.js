import { ref } from "vue";
import { BASE_URL } from "../config";

const invoiceController = () => {
  const data = ref([]);
  const errorMsg = ref("");
  const success = ref(false);

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("auth_token")
  );

  const getInvoices = async (url) => {
    data.value = [];
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: myHeaders,
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error("Unable to get invoices");
      data.value = responseData;
      success.value = true;
    } catch (err) {
      success.value = false;
      errorMsg.value = err.message;
    }
  };

  return { data, errorMsg, success, getInvoices };
};

export default invoiceController;
