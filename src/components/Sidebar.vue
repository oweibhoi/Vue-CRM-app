<template>
  <div>
    <va-sidebar>
      <va-sidebar-item
        v-for="item in sidebarItems"
        :active="isActive(item.routes)"
        :id="item.id"
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
  { label: "Dashboard", route: "/", routes: ["Dashboard"], icon: "dashboard", id: "sbDashboard" },
  { label: "Prospects", route: "/prospects", routes: ["Prospects", "Prospect's Details"], icon: "people", id: "sbProspects" },
  { label: "Customers", route: "/customers", routes:["Customers", "Customer's Details"], icon: "people", id: "sbCustomers" },
  { label: "Settings", route: "/settings", routes:["Settings"], icon: "settings", id: "sbSettings" },
]);

const route = useRoute();

const isActive = (routePath) => {
  return routePath.includes(route.name);
};

</script>
