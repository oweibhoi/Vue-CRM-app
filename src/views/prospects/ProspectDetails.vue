<template>
  <div>
    <VaButton class="float-right" @click="convertProspect(this.id)">
      Convert to Customer
    </VaButton>
  </div>
  <div>
    <DetailsTab></DetailsTab>
  </div>
</template>

<script>
import DetailsTab from "./DetailsTab.vue";

export default {
  components: {
    DetailsTab,
  },
  data() {
    const id = null;
    return { id };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    convertProspect(id) {
      this.$vaModal
        .confirm({
          message:
            "Are you sure you want to convert this prospect to a customer?",
          title: "Are you sure?",
          okText: "Yes",
          cancelText: "Cancel",
        })
        .then((ok) => {
          if (ok) {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append(
              "Authorization",
              "Bearer " + localStorage.getItem("auth_token")
            );

            var requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: JSON.stringify({ status: 2 }),
            };

            fetch(
              "http://127.0.0.1:8000/api/v1/customer-status/" + this.id,
              requestOptions
            )
              .then((response) => response.json())
              .then((result) => {
                this.$vaToast.init({
                  message: "Converted Successfully",
                  color: "success",
                });
                this.$router.push({
                  name: "Customer's Details",
                  params: { id: id },
                });
              })
              .catch((error) => console.log("error", error));
          }
        });
    },
  },
};
</script>
