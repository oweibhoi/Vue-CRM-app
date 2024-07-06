<template>
  <div class="float-right mb-1">
    <VaButton icon="add" color="primary" @click="showModal = !showModal">
      Add Todo
    </VaButton>
  </div>
  <VaModal
    v-model="showModal"
    ok-text="Save"
    @Ok="saveTodo()"
    size="large"
    max-width="100%"
  >
    <h3 class="va-h6">Add Todo</h3>
    <VaForm class="mb-2 flex flex-col gap-4">
      <div class="text-red-800" v-if="errorMsg">{{ errorMsg }}</div>
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
      />
    </VaForm>
  </VaModal>
</template>

<script>
import { reactive } from "vue";

export default {
  data() {
    return {
      showModal: false,
      name: "",
      type: "",
      errorMsg: "",
    };
  },
  methods: {
    async saveTodo() {
      this.errorMsg = "";

      const formData = reactive({
        name: this.name,
        type: this.type.type,
      });

      const result = await fetch("http://127.0.0.1:8000/api/v1/settings-todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (result.ok) {
        this.$vaToast.init({ message: "Saved Successfully", color: "success" });
        this.clearAddTodoForm();
      } else {
        this.showModal = true;
        this.$vaToast.init({
          message: "Failed to save data!",
          color: "danger",
        });

        result.json().then((data) => {
          const errors = data.errors;
          Object.entries(errors).forEach(([key, value]) => {
            this.errorMsg += value.map((item) => item + " ");
          });
        });
      }
    },
    clearAddTodoForm() {
      this.name = "";
      this.type.type = "";
    },
  },
};
</script>
