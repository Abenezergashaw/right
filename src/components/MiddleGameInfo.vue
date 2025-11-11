<script setup>
defineProps({
  middleGameInfoState: String,
});
</script>
<template>
  <div class="h-12 flex" style="background-color: var(--light_gray)">
    <div
      @click="$emit('getUpcomingGames')"
      class="uppercase w-full h-full text-xs flex justify-center items-center flex-1"
      :class="`${middleGameInfoState === 'Upcoming' ? 'bg-white' : ''}`"
    >
      upcoming
    </div>
    <div
      v-show="false"
      class="uppercase w-full h-full text-xs flex justify-center items-center flex-1"
    >
      express
    </div>
    <div
      @click="$emit('getTopSports')"
      class="uppercase w-full h-full text-xs flex justify-center items-center flex-1"
      :class="`${middleGameInfoState === 'topSports' ? 'bg-white' : ''}`"
    >
      top sports
    </div>
  </div>
</template>
