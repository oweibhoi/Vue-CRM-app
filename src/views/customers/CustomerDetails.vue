<template>
  <div>
    <DetailsTab></DetailsTab>
  </div>
</template>

<script>
import DetailsTab from "../prospects/DetailsTab.vue";

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
};
</script>
