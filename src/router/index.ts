import Home from "@/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
// import SearchPage from '../pages/search/SearchPage.vue';
// import Login from "@/pages/log-in/login.vue";
// import RoadmapPage from '../pages/roudmap/RoadmapPage.vue';
// import GidPage from '../pages/gid/GidPage.vue';
// import LandmarkDetails from '../pages/gid/LandmarkDetails.vue';
// import LandmarkMoreDetails from '../pages/gid/LandmarkMoreDetails.vue';
// import SearchOut from "@/pages/search/search-out/SearchOut.vue";
// // import SearchOutMore from "@/pages/search/search-out-more/SearchOutMore.vue";
// import ProfilePage from "/src/pages/profile/profile.vue";
// import FriendsPage from '@/pages/friends/Friends.vue'
// import FriendDetails from '@/pages/friends/FriendDetails.vue';
// import  RegistrationPage from '@/pages/log-in/registration.vue'
// import PoiComponent from "@/pages/poi/PoiComponent.vue";
// import PoiBusStop from '@/pages/poi/PoiBusStop.vue';
// import NotFound from '@/pages/not-found/not-found.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
