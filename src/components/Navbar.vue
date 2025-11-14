<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import AuthButtons from "./AuthButtons.vue";
import { ref } from "vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

defineProps({
  isLoggedIn: Boolean,
  balance: Number,
});

const emit = defineEmits();

const handleLogout = () => {
  emit("logout");
  isAccountMenuOpen.value = false;
};

const isOpen = ref(false);
const isSportOpened = ref(false);

const isAccountMenuOpen = ref(false);

const toggleAccountMenu = () => {
  isAccountMenuOpen.value = !isAccountMenuOpen.value;
};

const isMyBetsOpened = ref(true);

const toggleMyBets = () => {
  isMyBetsOpened.value = !isMyBetsOpened.value;
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const togleSportMenu = () => {
  isSportOpened.value = !isSportOpened.value;
};
const isBalanceOpened = ref(true);

const toggleBalance = () => {
  isBalanceOpened.value = !isBalanceOpened.value;
};
</script>

<template>
  <div
    class="p-2 flex items-center md:flex-col gap-2 w-full text-xs"
    style="background-color: var(--nav_blue); color: var(--text_white)"
  >
    <button @click="toggleMenu" class="focus:outline-none">
      <!-- simple hamburger icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7 text-gray-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    <div class="border-r border-gray-300 ml-2 py-5 w-1"></div>
    <!-- <img
      @click="$emit('goToHome')"
      src="/logo/logo.svg"
      class="w-10 bg-green-500"
      alt=""
    /> -->
    <div
      @click="$emit('goToHome')"
      class="flex flex-col items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#C8102E"
        class="w-8 h-8"
      >
        <circle cx="12" cy="12" r="10" fill="white" />
        <path
          fill="#C8102E"
          d="M10 13.5l-2.5-2.5-1.5 1.5L10 16.5l8-8-1.5-1.5z"
        />
      </svg>
    </div>

    <div class="border-r border-gray-300 mr-2 py-5 w-1"></div>
    <MagnifyingGlassIcon class="w-6 h-6" style="color: var(--text_white)" />
    <div class="flex gap-2 justify-end flex-1 items-center">
      <AuthButtons v-if="!isLoggedIn" @click="$emit('login')" title="Login" />
      <AuthButtons
        v-if="!isLoggedIn"
        @click="$emit('register')"
        title="Register"
      />
      <div
        v-if="isLoggedIn"
        @click="$emit('openShowModal')"
        class="flex flex-col items-end justify-center font-medium gap-1"
      >
        <span>{{ balance }} ETB</span>
        <span>ID: {{ auth.user.id }}</span>
      </div>
      <button
        @click="$emit('transaction')"
        v-if="isLoggedIn"
        class="uppercase text-[#C8102E] bg-[#fff] py-2.5 px-3 font-bold"
      >
        deposit
      </button>
      <img
        v-if="isLoggedIn"
        src="/icons/user.svg"
        class="h-6 w-6 cursor-pointer"
        alt="User"
        @click="toggleAccountMenu"
      />
    </div>
  </div>

  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-90 z-40"
      @click="toggleMenu"
    ></div>
  </transition>

  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 h-full w-[85%] bg-[#ededed] shadow-lg z-50"
    >
      <div
        class="flex justify-start gap-6 px-2 items-center bg-[#C8102E] py-4 border-b-2 border-red-500"
      >
        <button @click="toggleMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#C8102E"
            class="w-8 h-8"
          >
            <circle cx="12" cy="12" r="10" fill="white" />
            <path
              fill="#C8102E"
              d="M10 13.5l-2.5-2.5-1.5 1.5L10 16.5l8-8-1.5-1.5z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 100"
            class="w-20 h-auto rounded-2xl"
          >
            <rect width="200" height="100" fill="#C8102E" rx="15" />
            <text
              x="10"
              y="70"
              fill="white"
              font-size="60"
              font-weight="700"
              font-family="Poppins, sans-serif"
            >
              rightbet
            </text>
          </svg>
        </div>
      </div>

      <div
        @click="$emit('goToPromotions')"
        class="flex justify-start gap-3 px-4 items-center bg-gradient-to-r from-[#8d0c21] to-[#C8102E] py-5 border-b-2"
      >
        <img src="/icons/promo.svg" class="changeIconColor" />
        <span class="uppercase text-white">promotions</span>
      </div>

      <div
        @click="togleSportMenu"
        class="flex justify-start gap-2 items-center px-4 border-b py-2 border-black relative"
      >
        <img src="/icons/sport.svg" class="h-6 w-6 changeIconColor" alt="" />
        <span class="uppercase font-semibold text-sm">Sports</span>
        <ChevronDownIcon
          v-if="!isSportOpened"
          class="h-4 w-4 absolute top-2 right-2"
        />
        <ChevronUpIcon v-else class="h-4 w-4 absolute top-2 right-2" />
      </div>

      <div v-if="isSportOpened" class="bg-white">
        <div
          @click="
            toggleMenu();
            $emit('goToTopSports');
          "
          class="flex justify-start gap-2 items-center px-4 border-b py-3 border-black"
        >
          <span class="uppercase text-sm">Top</span>
        </div>
        <div
          @click="
            toggleMenu();
            $emit('goToUpcomingGames');
          "
          class="flex justify-start gap-2 items-center px-4 border-b py-3 border-black"
        >
          <span class="uppercase text-sm">Upcoming</span>
        </div>
        <div
          @click="
            toggleMenu();
            $emit('goToCountryList');
          "
          class="flex justify-start gap-2 items-center px-4 border-b py-3 border-black"
        >
          <span class="uppercase text-sm">sport</span>
        </div>
      </div>

      <div
        @click="$emit('goToLive')"
        class="flex justify-start gap-2 items-center px-4 border-b py-2 border-black"
      >
        <img src="/icons/live.svg" class="h-6 w-6 changeIconColor" alt="" />
        <span class="uppercase font-semibold text-sm">Live</span>
      </div>
      <div
        class="flex justify-start gap-2 items-center px-4 border-b py-2 border-black"
      >
        <img src="/icons/casino.svg" class="h-6 w-6 changeIconColor" alt="" />
        <span class="uppercase font-semibold text-sm">Games</span>
      </div>
      <div
        class="flex justify-start gap-2 items-center px-4 border-b py-2 border-black"
      >
        <img
          src="/icons/virtual_sport.svg"
          class="h-6 w-6 changeIconColor"
          alt=""
        />
        <span class="uppercase font-semibold text-sm">Virtual sport</span>
      </div>
      <div
        class="hidden justify-start gap-2 items-center px-4 border-b py-2 border-black"
      >
        <img src="/icons/result.svg" class="h-6 w-6 changeIconColor" alt="" />
        <span class="uppercase font-semibold text-sm">results</span>
      </div>
      <div
        @click="
          $emit('goToCheckTicket');
          toggleMenu();
        "
        class="flex justify-start gap-2 items-center px-4 border-b py-2 border-black"
      >
        <img
          src="/icons/coupon_check.svg"
          class="h-6 w-6 changeIconColor"
          alt=""
        />
        <span class="uppercase font-semibold text-sm">check ticket</span>
      </div>
      <div
        @click="
          $emit('goToRules');
          toggleMenu();
        "
        class="flex justify-start gap-2 items-center px-4 border-b py-2 border-black"
      >
        <img src="/icons/rules.svg" class="h-6 w-6 changeIconColor" alt="" />
        <span class="uppercase font-semibold text-sm">rules</span>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div
      v-if="isAccountMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-90 z-40"
      @click="toggleAccountMenu"
    ></div>
  </transition>
  <transition name="slide-right">
    <div
      v-if="isAccountMenuOpen"
      class="fixed top-0 right-0 h-full w-[70%] bg-[#ededed] shadow-lg z-50"
    >
      <div
        class="flex justify-between items-center px-4 py-4 bg-[#C8102E] border-b border-gray-500"
      >
        <button @click="toggleAccountMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        @click="toggleMyBets"
        class="flex justify-start gap-2 items-center px-4 border-b py-2 border-black relative"
      >
        <span class="uppercase font-semibold text-sm">My bets</span>
        <ChevronDownIcon
          v-if="!isMyBetsOpened"
          class="h-4 w-4 absolute top-2 right-2"
        />
        <ChevronUpIcon v-else class="h-4 w-4 absolute top-2 right-2" />
      </div>

      <div v-if="isMyBetsOpened" class="bg-[white]">
        <div
          @click="
            toggleAccountMenu();
            $emit('goToBetHistory');
          "
          class="flex justify-start gap-2 items-center px-16 border-b py-3 border-black"
        >
          <span class="uppercase text-sm">bet history</span>
        </div>
      </div>

      <div
        @click="toggleBalance"
        class="flex justify-start gap-2 items-center px-4 border-b py-2 border-black relative"
      >
        <span class="uppercase font-semibold text-sm">balance</span>
        <ChevronDownIcon
          v-if="!isBalanceOpened"
          class="h-4 w-4 absolute top-2 right-2"
        />
        <ChevronUpIcon v-else class="h-4 w-4 absolute top-2 right-2" />
      </div>

      <div v-if="isBalanceOpened" class="bg-white">
        <div
          @click="
            toggleAccountMenu();
            $emit('transaction');
          "
          class="flex justify-start gap-2 items-center px-16 border-b py-3 border-black"
        >
          <span class="uppercase text-sm">deposit</span>
        </div>
        <div
          @click="
            toggleAccountMenu();
            $emit('transactionWithdraw');
          "
          class="flex justify-start gap-2 items-center px-16 border-b py-3 border-black"
        >
          <span class="uppercase text-sm">withdraw</span>
        </div>
        <div
          @click="
            toggleAccountMenu();
            $emit('transaction');
          "
          class="flex justify-start gap-2 items-center px-16 border-b py-3 border-black"
        >
          <span class="uppercase text-sm">transaction</span>
        </div>
      </div>

      <div
        @click="handleLogout"
        class="w-[70%] mx-auto bg-[#bb606f] text-white font-semibold uppercase text-xs py-2 text-center my-4"
      >
        sign out
      </div>
    </div>
  </transition>
</template>
<style scoped>
/* Slide animation */
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

/* Fade overlay animation */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
/* Slide from right */
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-enter-to {
  transform: translateX(0);
}
.slide-right-leave-from {
  transform: translateX(0);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.changeIconColor {
  filter: invert(14%) sepia(100%) saturate(7268%) hue-rotate(349deg)
    brightness(96%) contrast(117%);
}
</style>
