<script setup>
import { ref, reactive, watch } from "vue";

// v-model props from parent
const props = defineProps({
  registerError: String,
  authLoader: Boolean,
  phone: String,
  password: String,
  confirmPassword: String,
  dobDay: [String, Number],
  dobMonth: [String, Number],
  dobYear: [String, Number],
  promoCode: String,
  agreed: Boolean,
});

const emit = defineEmits([
  "update:phone",
  "update:password",
  "update:confirmPassword",
  "update:dobDay",
  "update:dobMonth",
  "update:dobYear",
  "update:promoCode",
  "update:agreed",
  "submit",
]);

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
const confirmPassword = ref(props.confirmPassword);
const dobDay = ref(props.dobDay);
const dobMonth = ref(props.dobMonth);
const dobYear = ref(props.dobYear);
const promoCode = ref(props.promoCode);
const agreed = ref(props.agreed);

// Watch to emit changes
watch(phone, (val) => emit("update:phone", val));
watch(password, (val) => emit("update:password", val));
watch(confirmPassword, (val) => emit("update:confirmPassword", val));
watch(dobDay, (val) => emit("update:dobDay", val));
watch(dobMonth, (val) => emit("update:dobMonth", val));
watch(dobYear, (val) => emit("update:dobYear", val));
watch(promoCode, (val) => emit("update:promoCode", val));
watch(agreed, (val) => emit("update:agreed", val));

function handleSubmit() {
  if (!props.authLoader) {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }
    if (!dobDay.value || !dobMonth.value || !dobYear.value) {
      alert("Please select your full date of birth!");
      return;
    }
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
        class="mx-auto flex items-center text-xl uppercase font-bold text-[#C8102E] bg-white border-b pb-4 border-black"
      >
        Create your account
      </div>
    </div>
    <!-- Phone Number -->
    <div>
      <label class="block text-xs mb-3 opacity-90 font-light">
        Phone Number<span class="">*</span>
      </label>
      <div class="flex items-center">
        <input
          type="text"
          value="+251"
          disabled
          class="bg-[#ededed] text-gray-500 px-3 py-2 w-16 text-center cursor-not-allowed"
        />
        <input
          v-model="phone"
          type="text"
          placeholder="Phone Number"
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
        placeholder="Enter Password"
        class="border border-gray-300 placeholder-black px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
      />
    </div>

    <!-- Confirm Password -->
    <div>
      <label class="block text-xs mb-3 opacity-90 font-light">
        Confirm Password <span class="">*</span>
      </label>
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        class="border border-gray-300 placeholder-black px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
      />
    </div>

    <!-- Date of Birth -->
    <div>
      <label class="block text-xs mb-3 opacity-90 font-light">
        Date of Birth <span class="">*</span>
      </label>
      <div class="flex space-x-2">
        <select
          v-model="dobDay"
          class="border border-gray-300 px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
        >
          <option value="" disabled>Day</option>
          <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
        </select>
        <select
          v-model="dobMonth"
          class="border border-gray-300 px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
        >
          <option value="" disabled>Month</option>
          <option v-for="(m, i) in months" :key="i" :value="i + 1">
            {{ m }}
          </option>
        </select>
        <select
          v-model="dobYear"
          class="border border-gray-300 px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
        >
          <option value="" disabled>Year</option>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
    </div>

    <!-- Promo Code -->
    <div>
      <label class="block text-xs mb-3 opacity-90 font-light">
        Promo Code
      </label>
      <input
        v-model="promoCode"
        type="text"
        placeholder="Enter promo code"
        class="border border-gray-300 placeholder-black px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <!-- Agree Checkbox -->
    <div class="flex items-center">
      <input v-model="agreed" type="checkbox" id="agree" class="mr-2" />
      <label for="agree" class="font-medium"
        >I agree to the terms and conditions <span class="">*</span></label
      >
    </div>

    <div v-if="registerError" class="text-red-500 text-sm mt-2">
      {{ registerError }}
    </div>

    <!-- Confirm Button -->
    <button
      type="submit"
      :disabled="
        !agreed || password === '' || confirmPassword === '' || phone === ''
      "
      class="w-full bg-[#C8102E] text-white py-2 disabled:bg-[#91404e] uppercase disabled:opacity-50"
    >
      <div
        v-if="authLoader"
        class="w-4 h-4 border-2 border-[#647EC3] rounded-full border-t-transparent animate-spin"
      ></div>
      <span v-if="!authLoader">Confirm</span>
    </button>
  </form>
</template>

<style scoped>
input[disabled] {
  opacity: 0.6;
}
</style>
