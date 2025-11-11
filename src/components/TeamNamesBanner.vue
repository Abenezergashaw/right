<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { useCountryFlag } from "@/composables/useFlags";

const { getFlag } = useCountryFlag();

defineProps({
  teams: String,
  startTime: String,
  competition: String,
  country: String,
});
</script>

<template>
  <div
    class="flex gap-2 items-center px-4 py-3 relative"
    style="background-color: var(--bg_white)"
  >
    <ChevronLeftIcon
      @click="$emit('goBackToGameList')"
      class="w-8 h-8 text-white rounded-full p-1.5 font-semibold bg-[#C8102E]"
    />
    <div>
      <div class="flex gap-2 items-center">
        <img :src="`../flags/${getFlag(country)}`" alt="" class="w-6 h-4" />

        <span class="text-[12px] opacity-50">{{ competition }}</span>
      </div>
      <span class="font-bold uppercase text-sm">{{ teams }}</span>
    </div>
    <div class="absolute top-1 right-3 text-[12px] opacity-50">
      {{ startTime }}
    </div>
  </div>
</template>
