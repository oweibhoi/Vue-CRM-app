<template>
  <div class="float-right mb-1">
    <VaButton icon="add" color="primary" @click="showModal = !showModal">
      Add Prospect
    </VaButton>
  </div>
  <VaModal
    v-model="showModal"
    ok-text="Save"
    @Ok="saveProspect()"
    size="large"
    max-width="100%"
  >
    <h3 class="va-h6">Add Prospect</h3>
    <VaForm class="mb-2 flex flex-col gap-4">
      <div class="text-red-800" v-if="errorMsg">{{ errorMsg }}</div>
      <VaInput v-model="name" label="Name" />
      <VaRadio
        v-model="type"
        :options="[
          {
            text: 'Business',
            type: 'B',
          },
          {
            text: 'Individual',
            type: 'I',
          },
        ]"
      />
      <VaInput v-model="email" label="Email" />
      <VaInput v-model="phone" label="Phone Number" />
      <VaInput v-model="address" label="Address" />
      <VaInput v-model="state" label="State" />
      <VaInput v-model="postalCode" label="Postal Code" />
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
      email: "",
      phone: "",
      address: "",
      state: "",
      postalCode: "",
      errorMsg: "",
    };
  },
  methods: {
    async saveProspect() {
      this.errorMsg = "";

      const formData = reactive({
        name: this.name,
        type: this.type.type,
        email: this.email,
        phone: this.phone,
        address: this.address,
        state: this.state,
        postalCode: this.postalCode,
        status: 1,
      });

      const result = await fetch("http://127.0.0.1:8000/api/v1/customers", {
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
        this.clearAddProspectForm();
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
    clearAddProspectForm() {
      this.name = "";
      this.type.type = "";
      this.email = "";
      this.phone = "";
      this.address = "";
      this.state = "";
      this.postalCode = "";
    },
  },
};
</script>
