<template>
  <div>
    <va-sidebar>
      <va-sidebar-item>
        <router-link
          :to="{ name: 'Dashboard' }"
          @click="getActiveSidebar('dashboard')"
        >
          <va-sidebar-item-content>
            <va-icon name="dashboard" />
            <va-sidebar-item-title>Dashboard</va-sidebar-item-title>
          </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>

      <va-sidebar-item>
        <router-link
          :to="{ name: 'Prospects' }"
          @click="getActiveSidebar('prospects')"
        >
          <va-sidebar-item-content>
            <va-icon name="people" />
            <va-sidebar-item-title>Prospects</va-sidebar-item-title>
          </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>

      <va-sidebar-item>
        <router-link
          :to="{ name: 'Customers' }"
          @click="getActiveSidebar('customers')"
        >
          <va-sidebar-item-content>
            <va-icon name="people" />
            <va-sidebar-item-title>Customers</va-sidebar-item-title>
          </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "Sidebar",
  data() {
    return {
      activeBar: "/",
    };
  },
  methods: {
    getActiveSidebar(url) {
      this.activeBar = url;
    },
   
  },
};
</script>
