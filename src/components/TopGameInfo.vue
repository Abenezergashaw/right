<script setup>
defineProps({
  topGameInfos: Array,
});
</script>

<template>
  <div
    class="flex overflow-x-auto whitespace-nowrap gap-1"
    style="background-color: var(--gray-bg)"
  >
    <div
      v-for="t in topGameInfos"
      :key="t.id"
      @click="$emit('topGameInfosClicked', t.title)"
      class="flex flex-col justify-center gap-1 items-center bg-white w-24 h-16 shrink-0 p-1"
    >
      <div class="w-7 h-7 flex items-center justify-center">
        <img :src="t.src" class="max-w-full max-h-full object-contain" alt="" />
      </div>
      <span class="text-[12px] font-bold text-center truncate">{{
        t.title
      }}</span>
    </div>
  </div>
</template>
