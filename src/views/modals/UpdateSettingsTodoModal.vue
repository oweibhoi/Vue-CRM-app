<template>
  <VaModal
    v-model="showModal"
    ok-text="Save"
    @Ok="updateTodo()"
    size="large"
    max-width="100%"
    @close="closeModal()"
  >
    <h3 class="va-h6">Edit Todo</h3>
    <VaForm class="mb-2 flex flex-col gap-4">
      <VaAlert
        color="#fdeae7"
        text-color="#940909"
        v-if="errorMsg"
        v-html="errorMsg"
      >
      </VaAlert>
      <VaInput v-model="id" label="ID" readonly />
      <VaInput v-model="name" label="Todo Name" />
      <VaRadio
        v-model="type"
        :options="[
          {
            text: 'Prospects',
            type: 'P',
          },
          {
            text: 'Customers',
            type: 'C',
          },
        ]"
        value-by="type"
      />
    </VaForm>
  </VaModal>
</template>

<script>
import { reactive } from "vue";

export default {
  props: ["showUpdateModal", "updateID", "getAllTodos"],
  data() {
    return {
      id: "",
      name: "",
      type: "",
      errorMsg: "",
      showModal: false,
    };
  },
  watch: {
    showUpdateModal(newVal) {
      this.showModal = newVal;
      if (this.showModal) {
        this.getDetails();
      }
    },
  },
  methods: {
    getDetails() {
      fetch("http://127.0.0.1:8000/api/v1/settings-todos/" + this.updateID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          const data = result.data;
          this.id = data.id;
          this.name = data.name;
          this.type = data.type;
        })
        .catch((error) => console.log("error", error));
    },
    async updateTodo() {
      this.errorMsg = "";

      const formData = reactive({
        id: this.id,
        name: this.name,
        type: this.type,
      });

      const result = await fetch(
        "http://127.0.0.1:8000/api/v1/settings-todos/" + this.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (result.ok) {
        this.$vaToast.init({ message: "Saved Successfully", color: "success" });
        this.clearUpdateTodoForm();
        this.getAllTodos();
      } else {
        this.showModal = true;
        this.$vaToast.init({
          message: "Failed to update data!",
          color: "danger",
        });

        result.json().then((data) => {
          const errors = data.errors;
          Object.entries(errors).forEach(([key, value]) => {
            this.errorMsg += value.map((item) => item + "<br/>");
          });
        });
      }
    },
    clearUpdateTodoForm() {
      this.id = "";
      this.name = "";
      this.type = "";
    },
    closeModal() {
      this.$emit("closed");
    },
  },
};
</script>
