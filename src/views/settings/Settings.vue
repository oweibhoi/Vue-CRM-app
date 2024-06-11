<template>
    <VaTabs v-model="tabVal">
      <template #tabs>
        <VaTab v-for="tab in ['Todos']" :key="tab">
          {{ tab }}
        </VaTab>
      </template>
    </VaTabs>
    <Todos v-if="tabVal == 0"></Todos>
  </template>

<script>
import Todos from "./Todos.vue";

export default {
  components: {
    Todos,
  },
  data() {
    var tabVal = 0;
    return { tabVal };
  },
};
</script>