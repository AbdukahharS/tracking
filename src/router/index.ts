import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/HomePage.vue";
import DeliveryPage from "@/pages/DeliveryPage.vue";
import ListPage from "@/pages/ListPage.vue";
import FinancePage from "@/pages/FinancePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/delivery",
    name: "Delivery",
    component: DeliveryPage,
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => {},
  },
  {
    path: "/list",
    name: "List",
    component: ListPage,
  },
  {
    path: "/finance",
    name: "Finance",
    component: FinancePage,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () => {},
  },
  {
    path: "/premium",
    name: "Premium",
    component: () => {},
  },
  {
    path: "/user",
    name: "User",
    component: () => {},
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => {},
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => {},
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
