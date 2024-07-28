<template>
  <VaTabs v-model="tabVal">
    <template #tabs>
      <VaTab v-for="tab in ['Details', 'Todos', 'Notes']" :key="tab">
        {{ tab }}
      </VaTab>
    </template>
  </VaTabs>
  <Details v-if="tabVal == 0" :prospectID=id></Details>
  <Todos v-if="tabVal == 1" :prospectID=id></Todos>
  <Notes v-if="tabVal == 2" :prospectID=id></Notes>
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
    var tabVal = 0;
    var id = 0;
    return { id, tabVal };
  },
  beforeMount() {
    this.id = this.$route.params.id;
  }
};
</script>
