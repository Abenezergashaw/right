<script setup>
import { ref, computed, watch } from "vue";
import { ChevronUpIcon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import SelectInput from "./SelectInput.vue";
import { useCountryFlag } from "@/composables/useFlags";

const { getFlag } = useCountryFlag();

const props = defineProps({
  countriesList: Array,
});

const openedCountries = ref([]);
// const filteredSport = ref("Football");
// const filteredSport = defineModel({ type: String, default: "Football" });
// const currentTime = defineModel({ type: String, default: "Filter by Time" });
const filteredSport = defineModel("filteredSport", {
  type: String,
  default: "Football",
});
const currentTime = defineModel("currentTime", {
  type: String,
  default: "Filter by Time",
});
const filteredGames = computed(() => {
  return props.countriesList.filter(
    (c) => c.sportName === filteredSport.value
  )[0];
});
const filterdSportId = computed(() => {
  return filteredGames.value.sportId;
});

const f = computed(() => {
  return filteredGames.value.countries.map((c) => c.name) || [];
});

const sportList = computed(
  () => props.countriesList?.map((s) => s.sportName) || []
);

const timeFilters = [
  "Filter by Time",
  "1 hour",
  "3 hours",
  "6 hours",
  "12 hours",
  "1 day",
  "3 days",
];

function handleOpenCloseCountry(index) {
  const exists = openedCountries.value.indexOf(index);
  if (exists === -1) {
    openedCountries.value.push(index);
  } else {
    openedCountries.value.splice(exists, 1);
  }
}
</script>

<template>
  <div class="py-5 px-3 flex gap-2 justify-center items-center text-white">
    <div class="flex-1">
      <SelectInput v-model="filteredSport" :options="sportList" />
    </div>
    <div class="flex-1">
      <SelectInput v-model="currentTime" :options="timeFilters" />
    </div>
  </div>

  <div v-for="(c, index) in filteredGames?.countries" class="">
    <div
      @click="handleOpenCloseCountry(index)"
      class="bg-white my-1 py-[11px] px-4 font-bold text-sm relative"
    >
      <div class="flex gap-2 items-center">
        <img :src="`../flags/${getFlag(c.name)}`" alt="" class="w-6 h-4" />
        <span>{{ c.name }}</span>
      </div>
      <span class="absolute top-1.5 right-8 text-[#647EC3]">{{
        c?.leagues?.length ?? 0
      }}</span>
      <ChevronUpIcon
        v-if="openedCountries.includes(index)"
        @click="handleOpenCloseCountry(index)"
        class="h-4 w-4 absolute top-2 right-2"
      />
      <ChevronDownIcon
        v-else
        @click="handleOpenCloseCountry(index)"
        class="h-4 w-4 absolute top-2 right-2"
      />
    </div>

    <div
      v-if="openedCountries.includes(index)"
      v-for="l in c.leagues"
      @click="
        $emit(
          'goToLeagueGames',
          c.name,
          l.competitionName,
          filterdSportId,
          filteredSport
        )
      "
      class="w-[98%] mx-auto mt-1 mb-2 py-2.5 px-11 font-bold text-sm bg-white relative"
    >
      {{ l.competitionName }}
      <span class="absolute top-1.5 right-7 text-[#647EC3]">{{
        l.eventsCount
      }}</span>
      <ChevronRightIcon class="h-4 w-4 absolute top-2 right-1.5" />
    </div>
  </div>
</template>
