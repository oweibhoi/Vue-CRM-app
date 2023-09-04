<template>
  <div>
    <va-sidebar>
      <va-sidebar-item
        v-for="item in sidebarItems"
        :active="isActive(item.route)"
        class="bg-slate-100"
      >
        <router-link :key="item.route" :to="{ name: item.label }">
          <va-sidebar-item-content>
            <va-icon :name="item.icon" />
            <va-sidebar-item-title>{{ item.label }}</va-sidebar-item-title>
          </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const sidebarItems = ref([
  { label: "Dashboard", route: "/", icon: "dashboard" },
  { label: "Prospects", route: "/prospects", icon: "people" },
  { label: "Customers", route: "/customers", icon: "people" },
]);

const route = useRoute();

const isActive = (routePath) => {
  return route.path === routePath;
};

</script>
