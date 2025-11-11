<script setup>
import { ref } from "vue";
import { MinusIcon, PlusIcon } from "@heroicons/vue/24/solid";

const modelValue = defineModel({ type: Number, default: 0 });

const increment = () => {
  modelValue.value++;
};

const decrement = () => {
  if (modelValue.value > 0) modelValue.value--;
};
</script>

<template>
  <div class="flex items-center">
    <button
      @click="decrement"
      class="bg-[#C8102E] h-8 text-white px-2 rounded-l"
    >
      <MinusIcon class="w-4 h-4" />
    </button>

    <input
      v-model.number="modelValue"
      type="number"
      class="w-40 h-8 text-center text-xs bg-white rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      @click="increment"
      class="bg-[#C8102E] h-8 text-white px-2 rounded-r"
    >
      <PlusIcon class="w-4 h-4" />
    </button>
  </div>
</template>

<style scoped>
/* Optional: prevent number input arrows */
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
