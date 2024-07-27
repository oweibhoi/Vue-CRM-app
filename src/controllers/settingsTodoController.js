import { ref } from "vue";

const settingsTodoController = () => {
  const data = ref([]);
  const errorMsg = ref("");

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("auth_token")
  );

  const getTodos = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: myHeaders,
      });
      const responseData = await response.json();
      data.value = responseData;
    } catch (err) {
      errorMsg.value = err.message;
    }
  };

  const deleteTodo = async (url) => {
    try {
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(url, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({ status: 0 }),
      });
      if (response.ok) {
        const responseData = await response.json();
        data.value = responseData;
        if (!responseData.success) errorMsg.value = "Delete Failed";
      } else {
        errorMsg.value = "Delete Failed";
      }
    } catch (err) {
      errorMsg.value = err.message;
    }
  };

  const addTodo = async (url, payload) => {
    errorMsg.value = "";
    try {
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();

      if (response.ok) {
        data.value = responseData;
      } else {
        if (responseData.errors) {
          const errors = responseData.errors;
          Object.entries(errors).forEach(([key, value]) => {
            errorMsg.value += value.map((item) => item + "<br/>");
          });
        } else {
          errorMsg.value = responseData.message;
        }
      }
    } catch (err) {
      errorMsg.value = err.message;
    }
  };

  return { getTodos, data, errorMsg, deleteTodo, addTodo };
};

export default settingsTodoController;
