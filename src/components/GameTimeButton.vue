<script setup>
defineProps({
  title: String,
  current: String,
});
</script>

<template>
  <div
    @click="$emit('filterGamesByDate', title)"
    class="text-[11px] font-semibold py-0.5 rounded-sm px-5"
    :style="{
      backgroundColor: title !== current ? 'var(--light_gray)' : '#C8102E',
      color: title !== current ? 'var(--text_black)' : 'var(--text_white)',
    }"
  >
    {{ title }}
  </div>
</template>
