<script setup>
import { ChevronUpIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";

defineProps({
  tickets: Number,
  totalOdds: Number,
  point: Number,
});
</script>

<template>
  <div
    @click="$emit('makeTicketPanelVisible')"
    class="flex justify-around items-center gap-6 text-[16px] py-2 tracking-wide relative"
  >
    <div class="text-white flex gap-1 font-bold">
      <span>{{ tickets > 1 ? "Ako" : "Single" }}</span>
      <span>({{ tickets }})</span>
      <span class="text-amber-400">{{ totalOdds }}</span>
    </div>
    <div
      v-if="tickets > 1"
      class="text-white text-[16px] font-bold -translate-x-4"
    >
      <span> Point </span>
      <span class="text-amber-400"> {{ point }} % </span>
    </div>
    <ChevronUpIcon class="absolute top-[8.5px] right-6 w-6 h-6 text-white" />
  </div>
</template>
