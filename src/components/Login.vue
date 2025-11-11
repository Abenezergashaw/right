<script setup>
import { ref, reactive, watch } from "vue";

// v-model props from parent
const props = defineProps({
  loginError: String,
  authLoader: Boolean,

  phone: String,
  password: String,
});

const emit = defineEmits(["update:phone", "update:password", "submit"]);

// Options
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);

// Simple v-model binding helpers
const phone = ref(props.phone);
const password = ref(props.password);

// Watch to emit changes
watch(phone, (val) => emit("update:phone", val));
watch(password, (val) => emit("update:password", val));

function handleSubmit() {
  if (!props.authLoader) {
    emit("submit");
  }
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-full mx-auto p-6 bg-white space-y-4"
  >
    <div class="bg-white">
      <div
        class="pb-5 mx-auto flex items-center text-xl uppercase font-bold text-[#C8102E] bg-white border-b border-black"
      >
        Login
      </div>
    </div>
    <!-- Phone Number -->
    <div>
      <label class="block text-xs mb-3 opacity-90 font-light">
        Phone number, username or ID
      </label>
      <div class="flex items-center">
        <input
          type="text"
          value="+251"
          disabled
          class="hidden bg-[#ededed] text-gray-500 px-3 py-2 w-16 text-center cursor-not-allowed"
        />
        <input
          v-model="phone"
          type="text"
          placeholder="Phone number, username or ID"
          class="border border-gray-300 -r px-3 py-2 flex-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
        />
      </div>
    </div>

    <!-- Password -->
    <div>
      <label class="block text-xs mb-3 opacity-90 font-light">
        Password <span class="">*</span>
      </label>
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        class="border border-gray-300 placeholder-black px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
      />
    </div>

    <div class="flex items-center">
      <input v-model="agreed" type="checkbox" id="agree" class="mr-2" />
      <label for="agree" class="font-medium">Remember me </label>
    </div>

    <div v-if="loginError" class="text-red-500 text-sm mt-2">
      {{ loginError }}
    </div>

    <button
      type="submit"
      class="w-full flex justify-center items-center bg-[#C8102E] text-gray-100 uppercase font-bold h-10 disabled:bg-blue-100"
    >
      <div
        v-if="authLoader"
        class="w-6 h-6 border-2 border-[#9dabd1] rounded-full border-t-transparent animate-spin"
      ></div>
      <span v-if="!authLoader">Login</span>
    </button>
    <div class="bg-white text-center py-2">
      <label class="text-[13px] mb-3 opacity-90 font-light text-[#C8102E]">
        Restore password
      </label>
    </div>

    <div class="bg-white text-center py-0 border-t border-black">
      <label class="text-[13px] mb-3 opacity-90 font-light">
        Dont't have an account?
      </label>
    </div>
    <button
      @click="$emit('goToRegister')"
      class="w-full bg-[#C8102E] text-gray-100 font-bold py-2 disabled:bg-blue-100 uppercase"
    >
      Register
    </button>
  </form>
</template>

<style scoped>
input[disabled] {
  opacity: 0.6;
}
</style>
