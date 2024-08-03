<template>
  <VaTabs v-model="tabVal">
    <template #tabs>
      <VaTab v-for="tab in tabs" :key="tab">
        {{ tab }}
      </VaTab>
    </template>
  </VaTabs>
  <Details v-if="tabVal == 0" :prospectID="id"></Details>
  <Todos v-if="tabVal == 1" :prospectID="id"></Todos>
  <Notes v-if="tabVal == 2" :prospectID="id"></Notes>
  <Invoice v-if="tabVal == 3" :customerID="id"></Invoice>
</template>

<script>
import Details from "./Details.vue";
import Todos from "./Todos.vue";
import Notes from "./Notes.vue";
import Invoice from "../customers/Invoice.vue";

export default {
  components: {
    Details,
    Todos,
    Notes,
    Invoice,
  },
  data() {
    var tabVal = 0;
    var id = 0;
    var tabs = ["Details", "Todos", "Notes"];
    return { id, tabVal, tabs };
  },
  beforeMount() {
    this.id = this.$route.params.id;
    if (this.$route.name == "Customer's Details") this.tabs.push("Invoices");
  },
};
</script>
