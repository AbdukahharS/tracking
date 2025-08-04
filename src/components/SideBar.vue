<script lang="ts" setup>
import { useRoute } from "vue-router";
import Logo from "@/assets/logo.svg";
import DashBoard from "@/assets/dashboard.svg";
import Routing from "@/assets/routing.svg";
import Calendar from "@/assets/calendar.svg";
import Chat from "@/assets/chat.svg";
import Clipboard from "@/assets/clipboard.svg";
import Premium from "@/assets/premium.svg";
import Settings from "@/assets/settings.svg";
import User from "@/assets/user-circle.svg";
import Wallet from "@/assets/wallet.svg";

const mainLinks = [
  {
    Icon: DashBoard,
    page: "Home",
  },
  {
    Icon: Routing,
    page: "Routing",
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
