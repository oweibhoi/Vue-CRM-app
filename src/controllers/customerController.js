import { ref } from "vue";
import { BASE_URL } from "../config";

const customerController = () => {
  const data = ref([]);
  const errorMsg = ref("");
  const success = ref(false);

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("auth_token")
  );

  const getCustomers = async (url) => {
    data.value = [];
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: myHeaders,
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error("Unable to get customers");
      data.value = responseData;
      success.value = true;
    } catch (err) {
      success.value = false;
      errorMsg.value = err.message;
    }
  };

  const deleteCustomer = async (id) => {
    myHeaders.append("Content-type", "application/json");
    try {
      const response = await fetch(BASE_URL + "customer-status/" + id, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({ status: 0 }),
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error("Unable to delete customer");
      data.value = responseData;
      success.value = true;
    } catch (err) {
      success.value = false;
      errorMsg.value = err.message;
    }
  };

  return { data, errorMsg, success, getCustomers, deleteCustomer };
};

export default customerController;
