<template>
  <div class="py-6 px-4">
    <div class="grid grid-cols-2">
      <div>
        <VaForm class="mb-2 flex flex-col gap-4">
          <div class="text-red-800" v-if="errorMsg">{{ errorMsg }}</div>
          <input type="hidden" v-model="id" />
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
            value-by="type"
          />
          <VaInput v-model="email" label="Email" />
          <VaInput v-model="phone" label="Phone Number" />
          <VaInput v-model="address" label="Address" />
          <VaInput v-model="state" label="State" />
          <VaInput v-model="postalCode" label="Postal Code" />
        </VaForm>
        <div>
          <div class="relative h-32 w-full mt-3">
            <div class="absolute inset-y-0 right-0 w-25">
              <VaButton @click="saveData()"> Save Changes </VaButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  props: ["prospectID"],
  data() {
    return {
      id: "",
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
    async saveData() {
      this.errorMsg = "";

      const formData = reactive({
        name: this.name,
        type: this.type,
        email: this.email,
        phone: this.phone,
        address: this.address,
        state: this.state,
        postalCode: this.postalCode,
        status: 1,
      });

      const result = await fetch(
        "http://127.0.0.1:8000/api/v1/customers/" + this.prospectID,
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
  },
  mounted() {
    const getDetails = () => {
      const result = fetch(
        "http://127.0.0.1:8000/api/v1/customers/" + this.prospectID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          const data = result.data;
          this.id = data.id;
          this.name = data.name;
          this.type = data.type;
          this.email = data.email;
          this.phone = data.phone;
          this.address = data.address;
          this.state = data.state;
          this.postalCode = data.postalCode;
        })
        .catch((error) => console.log("error", error));
    };
    getDetails();
  },
};
</script>
