<template>
  <VaBreadcrumbs>
    <VaBreadcrumbsItem v-for="(crumb, index) in breadcrumbs" :key="index" :label="crumb.name" />
  </VaBreadcrumbs>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'BreadCrumbs',
  setup() {
    const route = useRoute();

    const breadcrumbs = computed(() => {
      const matchedRoutes = route.matched.filter(route => route.name);
      return matchedRoutes.map((routeRecord, index) => {
        const pathArray = matchedRoutes.slice(0, index + 1).map(m => m.path);
        return {
          name: routeRecord.name,
          path: pathArray.join('/')
        };
      });
    });

    return {
      breadcrumbs
    };
  }
};
</script>
