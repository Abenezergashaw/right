<script setup>
import { LanguageIcon } from "@heroicons/vue/24/outline";

defineProps({
  isLoggedIn: Boolean,
});
</script>

<template>
  <div
    class="p-2 flex items-center justify-around md:flex-col gap-2 w-full relative"
    style="background-color: #eaeaea; color: red"
  >
    <div
      class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-28 h-14 rounded-t-full"
      style="background-color: #eaeaea; color: var(--text_white)"
    ></div>
    <div
      @click="$emit('goToLive')"
      class="flex flex-col gap-1 justify-center items-center"
    >
      <img
        src="https://arada.bet/files/webexIconsMobile/image/header/darkblue/live.svg"
        class="w-6 h-6 changeIconColor"
        alt=""
      />
      <span class="uppercase text-[11px] font-bold tracking-wide">Live</span>
    </div>
    <div class="flex flex-col gap-1 justify-center items-center">
      <img
        src="https://arada.bet/files/webexIconsMobile/image/header/darkblue/casino.svg"
        class="w-6 h-6 changeIconColor"
        alt=""
      />
      <span class="uppercase text-[11px] font-bold tracking-wide">Games</span>
    </div>
    <div
      @click="$emit('goToLogin')"
      v-if="!isLoggedIn"
      class="flex flex-col gap-1 justify-center items-center z-10 -translate-y-1.5 -translate-x-1.5"
    >
      <img
        src="https://arada.bet/files/webexIconsMobile/image/header/darkblue/habesha_LogIn_bot.svg"
        class="w-6 h-6 changeIconColor"
        alt=""
      />
      <span class="uppercase text-[11px] font-bold tracking-wide z-10"
        >Login</span
      >
    </div>
    <div
      @click="$emit('goToDeposit')"
      v-if="isLoggedIn"
      class="flex flex-col gap-1 justify-center items-center z-10 -translate-y-1.5 -translate-x-1.5"
    >
      <img
        src="https://arada.bet/files/webexIconsMobile/image/header/darkblue/deposit.svg"
        class="w-6 h-6 changeIconColor"
        alt=""
      />
      <span class="uppercase text-[11px] font-bold tracking-wide z-10"
        >Deposit</span
      >
    </div>
    <div class="flex flex-col gap-1 justify-center items-center">
      <img
        src="https://arada.bet/files/bottom-menu/language.svg"
        class="w-6 h-6 changeIconColor"
        alt=""
      />
      <span class="uppercase text-[11px] font-bold tracking-wide">EN</span>
    </div>
    <div class="flex flex-col gap-1 justify-center items-center">
      <img
        src="https://arada.bet/files/webexIconsMobile/image/header/darkblue/chat.svg"
        class="w-6 h-6 changeIconColor"
        alt=""
      />
      <span class="uppercase text-[11px] font-bold tracking-wide">Chat</span>
    </div>
  </div>
</template>

<style scoped>
.changeIconColor {
  filter: invert(14%) sepia(100%) saturate(7268%) hue-rotate(349deg)
    brightness(96%) contrast(117%);
}
</style>
