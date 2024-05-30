import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import { isAuthenticated } from "../services/authService";

import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Books from "../views/books/Books.vue";
import NotFound from "../views/NotFound.vue";
import Prospects from "../views/prospects/Prospects.vue";
import ProspectDetails from "../views/prospects/ProspectDetails.vue";
import Customers from "../views/customers/Customers.vue";
import CustomerDetails from "../views/customers/CustomerDetails.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next("/"); // Redirect to dashboard if already logged in
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/prospects",
    name: "Prospects",
    component: Prospects,
    meta: { title: "Prospects"},
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/prospects/details/:id",
    name: "Prospect's Details",
    component: ProspectDetails,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customers,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/customers/details/:id",
    name: "Customer's Details",
    component: CustomerDetails,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next("/login");
      } else {
        next();
      }
    },
  },
  { path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
  //   {
  //     path: "/books/:id",
  //     name: "BookDetails",
  //     component: BookDetails,
  //     props: true,
  //   },
  {
    path: "/books",
    name: "Books",
    component: Books,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next("/login");
      } else {
        next();
      }
    },
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
