<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <button
    class="py-2.5 px-5 font-semibold text-xs rounded-sm uppercase"
    :style="{
      backgroundColor: title === 'Login' ? '#C8102E' : 'white',
      color: title === 'Login' ? 'white' : '#C8102E',
    }"
  >
    {{ title }}
  </button>
</template>
