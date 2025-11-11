<script setup>
import { ref } from "vue";

const props = defineProps({
  images: Array,
});

const currentIndex = ref(0);
const currentImage = ref(props.images[currentIndex.value]);

setInterval(() => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
  currentImage.value = props.images[currentIndex.value];
}, 5000);
</script>

<template>
  <div class="text-white w-full h-28 mt-0.5 overflow-hidden relative bg-white">
    <!-- Transition wrapper -->
    <transition name="slide-left" mode="out-in">
      <img
        :key="currentImage"
        :src="currentImage"
        class="w-full h-[100%] object-cover absolute top-0 left-0"
        alt="banner"
      />
    </transition>
  </div>
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.15s ease, opacity 0.1s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-enter-to {
  transform: translateX(0);
}
.slide-left-leave-from {
  transform: translateX(0);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
