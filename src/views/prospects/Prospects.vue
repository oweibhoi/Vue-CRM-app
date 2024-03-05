<template>
  <h5>Prospects</h5>
  <div class="float-right mb-1">
    <VaButton icon="add" color="primary" @click="showModal = !showModal">
      Add Prospect
    </VaButton>
  </div>
  <ProspectTable />

  <VaModal
    v-model="showModal"
    ok-text="Save"
    @Ok="saveProspect()"
    size="large"
    max-width="1800px"
  >
    <h3 class="va-h6">Add Prospect</h3>
    <VaForm ref="addProspectForm" class="mb-2 flex flex-col gap-4">
      <small class="text-red-800" v-if="errorMsg">{{ errorMsg }}</small>
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
import ProspectTable from "../datatables/ProspectTable.vue";
import { reactive } from "vue";

export default {
  components: {
    ProspectTable,
  },
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
      if (
        this.name == "" ||
        this.type == "" ||
        this.email == "" ||
        this.phone == "" ||
        this.address == ""
      ) {
        this.showModal = true;
        this.errorMsg = "Please fill in all fields";
        return;
      }

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
        },
        body: JSON.stringify(formData),
      });

      if (result.ok) {
        this.$vaToast.init({ message: "Saved Successfully", color: "success" });
        this.clearAddProspectForm();
        ProspectTable.methods.get_prospects(ProspectTable.data().links.current);
      } else {
        this.$vaToast.init({ message: "Saved Failed!", color: "danger" });
        this.showModal = true;
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
