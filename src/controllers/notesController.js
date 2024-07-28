import { ref } from "vue";
import { BASE_URL } from "../config";

const notesController = () => {
  const data = ref([]);
  const errorMsg = ref("");
  const success = ref(false);

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("auth_token")
  );

  const getNotes = async (customerID) => {
    try {
      const response = await fetch(BASE_URL + "notes?c=" + customerID, {
        headers: myHeaders,
        method: "GET",
      });
      const responseData = await response.json();
      data.value = responseData.data;
    } catch (e) {
      errorMsg.value = "Failed to get notes";
    }
  };

  const insertNote = async (notes, customerID) => {
    try {
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(BASE_URL + "notes", {
        headers: myHeaders,
        method: "POST",
        body: JSON.stringify({
          notes: notes,
          customer_id: customerID,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        data.value = responseData.data;
        success.value = true;
      } else {
        errorMsg.value = "Failed to add notes!";
        success.value = false;
      }
    } catch (e) {
      errorMsg.value = "Failed to add notes";
    }
  };

  return { data, errorMsg, success, getNotes, insertNote };
};

export default notesController;
