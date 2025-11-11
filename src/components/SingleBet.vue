<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

defineProps({
  tickets: Array,
});
</script>
<template>
  <div v-for="(t, index) in tickets" class="p-0.5 flex">
    <div class="rounded px-2 py-1 flex-1" style="background-color: #ededed">
      <span class="font-bold uppercase text-xs">{{ t.event_name }}</span>
      <div
        class="flex justify-start items-center gap-2 text-red-500 font-bold text-[13px]"
        v-if="t.errors.length > 0"
      >
        <img src="/icons/error.svg" class="h-4 w-4" alt="" />
        <span class="">{{ t.errors[0].message }}</span>
      </div>
      <div class="flex justify-between text-[11px] font-semibold">
        <span>{{ t.market_name }}: {{ t.price_name }}</span>

        <span class="" style="color: var(--general_blue)">{{
          t.price_rate
        }}</span>
      </div>
    </div>
    <div
      class="w-6 bg-[#C8102E] text-white flex justify-center items-center rounded-r"
      @click="$emit('removeGameFromTicket', index)"
    >
      <XMarkIcon class="w-4 h-4" />
    </div>
  </div>
</template>
