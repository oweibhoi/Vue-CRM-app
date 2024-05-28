<template>
  <VaTabs v-model="tabVal">
    <template #tabs>
      <VaTab v-for="tab in ['Details', 'Todos', 'Notes']" :key="tab">
        {{ tab }}
      </VaTab>
    </template>
  </VaTabs>
  <Details v-if="tabVal == 0"></Details>
  <Todos v-if="tabVal == 1"></Todos>
  <Notes v-if="tabVal == 2"></Notes>
</template>

<script>
import Details from "./Details.vue";
import Todos from "./Todos.vue";
import Notes from "./Notes.vue";

export default {
  components: {
    Details,
    Todos,
    Notes,
  },
  data() {
    const id = null;
    var tabVal = 0;
    return { id, tabVal };
  },
  mounted() {
    this.id = this.$route.params.id;
    document
      .getElementById("sbProspects")
      .querySelector("a")
      .classList.add("router-link-active");
    document
      .getElementById("sbProspects")
      .querySelector("a")
      .classList.add("router-link-exact-active");
  },
};
</script>
