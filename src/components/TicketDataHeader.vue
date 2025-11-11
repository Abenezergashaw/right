<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="flex justify-around items-center gap-6 py-3 h-10 relative">
    <ChevronDownIcon
      @click="$emit('makeTicketPanelHidden')"
      class="absolute top-2 right-6 w-6 h-6 text-white"
    />
  </div>
</template>
