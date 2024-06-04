import { Component } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Authentication from "../views/Auth/Authentication.vue";
import PViewManager from "../views/Profile/PViewManager.vue";
import ProductView from "../views/Products/ProductView.vue";
import Sell from "../views/Sell/Sell.vue";
interface Route {
  path: string;
  name: string;
  component: Component;
}
const routes: Array<Route> = [
  { path: "/about", component: About, name: "About" },
  { path: "/", component: Home, name: "Home" },
  { path: "/auth/:type", component: Authentication, name: "Authentication" },
  { path: "/profile/:id", component: PViewManager, name: "Profile" },
  { path: "/products/:id", component: ProductView, name: "Product" },
  { path: "/products/sell", component: Sell, name: "Sell" },
];
const router = createRouter({
  history: createWebHistory("/Testing-Ecommerce/"),
  routes,
});
export default router;
