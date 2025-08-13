<script lang="ts" setup>
import { useRoute } from "vue-router";
import Logo from "@/assets/logo.svg";
import DashBoard from "@/assets/icons/dashboard.svg";
import Routing from "@/assets/icons/routing.svg";
import Calendar from "@/assets/icons/calendar.svg";
import Chat from "@/assets/icons/chat.svg";
import Clipboard from "@/assets/icons/clipboard.svg";
import Premium from "@/assets/icons/premium.svg";
import Settings from "@/assets/icons/settings.svg";
import User from "@/assets/icons/user-circle.svg";
import Wallet from "@/assets/icons/wallet.svg";

const mainLinks = [
  {
    Icon: DashBoard,
    page: "Home",
  },
  {
    Icon: Routing,
    page: "Delivery",
  },
  {
    Icon: Chat,
    page: "Chat",
  },
  {
    Icon: Clipboard,
    page: "Clipboard",
  },
  {
    Icon: Wallet,
    page: "Wallet",
  },
  {
    Icon: Calendar,
    page: "Calendar",
  },
  {
    Icon: Premium,
    page: "Premium",
  },
];

const profileLinks = [
  {
    Icon: User,
    page: "User",
  },
  {
    Icon: Settings,
    page: "Settings",
  },
];

const route = useRoute();
</script>

<template>
  <aside>
    <Logo />
    <div>
      <RouterLink v-for="(link, i) in mainLinks" :to="{ name: link.page }" :key="i">
        <component :is="link.Icon" :class="route.name === link.page ? 'active icon' : 'icon'" />
      </RouterLink>
    </div>
    <div>
      <RouterLink v-for="(link, i) in profileLinks" :to="{ name: link.page }" :key="i">
        <component :is="link.Icon" :class="route.name === link.page ? 'active icon' : 'icon'" />
      </RouterLink>
    </div>
  </aside>
</template>

<style scoped>
aside {
  width: 160px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 42px 0;
  gap: 100px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;

    .icon {
      color: #bcbcbc;
      width: 32px;
      height: 32px;
      transition: all 0.25s ease-in-out;

      &.active {
        color: #5a32ea;
        scale: 1.2;
      }

      &:hover {
        scale: 1.1;
        color: #8b77d3;
      }
    }
  }
}
</style>
