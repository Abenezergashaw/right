<script setup>
import { computed } from "vue";
import { useCountryFlag } from "@/composables/useFlags";

const { getFlag } = useCountryFlag();

const props = defineProps({
  game: Object,
  ticketData: Array,
});

const formattedDate = computed(() => {
  const date = new Date(props.game.events[0].eventStartTime);
  const options = {
    timeZone: "Africa/Addis_Ababa",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return new Intl.DateTimeFormat("en-GB", options)
    .format(date)
    .replace(",", "");
});
</script>

<template>
  <div
    class="w-full p-2 border-b-2 border-gray-500"
    style="background-color: var(--bg_white)"
  >
    <div
      class="flex justify-between"
      @click="
        $emit(
          'goIntoGameDetails',
          game.sportId ?? game.events[0].sportId,
          game.country,
          game.competitionName,
          game.events[0].eventId
        )
      "
    >
      <div class="flex gap-1 items-center">
        <img
          :src="`../flags/${getFlag(game.country)}`"
          alt=""
          class="w-[18px] h-[12px]"
        />
        <span class="text-[11px]"
          >{{ game.country }} - {{ game.competitionName }}</span
        >
      </div>
      <div class="text-[11px]">{{ formattedDate }}</div>
    </div>

    <div
      class="flex justify-between items-center mt-0.5"
      @click="
        $emit(
          'goIntoGameDetails',
          game.sportId ?? game.events[0].sportId,
          game.country,
          game.competitionName,
          game.events[0].eventId
        )
      "
    >
      <span class="font-medium uppercase">{{ game.events[0].eventName }}</span>
      <div class="box text-[10px] px-1 font-semibold -translate-x-2">
        +{{ game.events[0].pricesCount }}
        <div class="triangle"></div>
      </div>
    </div>

    <div class="flex gap-1 text-xs mt-0.5">
      <div
        class="flex-1 flex justify-between px-2 py-1 rounded-sm"
        :style="{
          backgroundColor: ticketData.some(
            (t) =>
              t.reference_id ===
              game.events[0].collections[0].markets[0].prices[0].referenceId
          )
            ? '#C8102E'
            : 'var(--light_gray)',
        }"
        @click="
          if (game.events[0].collections[0].markets[0].prices[0].rate !== 0) {
            $emit(
              'betSelected',
              {
                amount: 1,
                errors: [],
                price_rate:
                  game.events[0].collections[0].markets[0].prices[0].rate,
                price_name:
                  game.events[0].collections[0].markets[0].prices[0].priceName,
                event_name: game.events[0].eventName,
                isLive: false,
                market_name:
                  game.events[0].collections[0].markets[0].marketName,
                price_hcap:
                  game.events[0].collections[0].markets[0].prices[0]
                    .handicapValue,
                reference_id:
                  game.events[0].collections[0].markets[0].prices[0]
                    .referenceId,
              },
              '0'
            );
          }
        "
      >
        <span
          class="opacity-85"
          :class="
            ticketData.some(
              (t) =>
                t.reference_id ===
                game.events[0].collections[0].markets[0].prices[0].referenceId
            )
              ? 'text-white font-semibold text-[13px]'
              : 'text-[#666] text-[13px]'
          "
          >1</span
        >
        <span
          :class="
            ticketData.some(
              (t) =>
                t.reference_id ===
                game.events[0].collections[0].markets[0].prices[0].referenceId
            )
              ? 'text-white font-semibold text-[14px]'
              : 'text-[#000] text-[14px]'
          "
          >{{
            game.events[0].collections[0].markets[0].prices[0].rate === 0
              ? "-"
              : game.events[0].collections[0].markets[0].prices[0].rate
          }}</span
        >
      </div>
      <div
        class="flex-1 flex justify-between px-2 py-1 rounded-sm"
        :style="{
          backgroundColor: ticketData.some(
            (t) =>
              t.reference_id ===
              game.events[0].collections[0].markets[0].prices[1].referenceId
          )
            ? '#C8102E'
            : 'var(--light_gray)',
        }"
        @click="
          if (game.events[0].collections[0].markets[0].prices[1].rate !== 0) {
            $emit(
              'betSelected',
              {
                amount: 1,
                errors: [],
                price_rate:
                  game.events[0].collections[0].markets[0].prices[1].rate,
                price_name:
                  game.events[0].collections[0].markets[0].prices[1].priceName,
                event_name: game.events[0].eventName,
                isLive: false,
                market_name:
                  game.events[0].collections[0].markets[0].marketName,
                price_hcap:
                  game.events[0].collections[0].markets[0].prices[1]
                    .handicapValue,
                reference_id:
                  game.events[0].collections[0].markets[0].prices[1]
                    .referenceId,
              },
              '0'
            );
          }
        "
      >
        <span
          class="opacity-85"
          :class="
            ticketData.some(
              (t) =>
                t.reference_id ===
                game.events[0].collections[0].markets[0].prices[1].referenceId
            )
              ? 'text-white font-semibold text-[13px]'
              : 'text-[#666] text-[13px]'
          "
          >X</span
        >
        <span
          :class="
            ticketData.some(
              (t) =>
                t.reference_id ===
                game.events[0].collections[0].markets[0].prices[1].referenceId
            )
              ? 'text-white font-semibold text-[14px]'
              : 'text-[#000] text-[14px]'
          "
          >{{
            game.events[0].collections[0].markets[0].prices[1].rate === 0
              ? "-"
              : game.events[0].collections[0].markets[0].prices[1].rate
          }}</span
        >
      </div>
      <div
        class="flex-1 flex justify-between px-2 py-1 rounded-sm"
        :style="{
          backgroundColor: ticketData.some(
            (t) =>
              t.reference_id ===
              game.events[0].collections[0].markets[0].prices[2].referenceId
          )
            ? '#C8102E'
            : 'var(--light_gray)',
        }"
        @click="
          if (game.events[0].collections[0].markets[0].prices[2].rate !== 0) {
            $emit(
              'betSelected',
              {
                amount: 1,
                errors: [],
                price_rate:
                  game.events[0].collections[0].markets[0].prices[2].rate,
                price_name:
                  game.events[0].collections[0].markets[0].prices[2].priceName,
                event_name: game.events[0].eventName,
                isLive: false,
                market_name:
                  game.events[0].collections[0].markets[0].marketName,
                price_hcap:
                  game.events[0].collections[0].markets[0].prices[2]
                    .handicapValue,
                reference_id:
                  game.events[0].collections[0].markets[0].prices[2]
                    .referenceId,
              },
              '0'
            );
          }
        "
      >
        <span
          class="opacity-85"
          :class="
            ticketData.some(
              (t) =>
                t.reference_id ===
                game.events[0].collections[0].markets[0].prices[2].referenceId
            )
              ? 'text-white font-semibold text-[13px]'
              : 'text-[#666] text-[13px]'
          "
          >2</span
        >
        <span
          :class="
            ticketData.some(
              (t) =>
                t.reference_id ===
                game.events[0].collections[0].markets[0].prices[2].referenceId
            )
              ? 'text-white font-semibold text-[14px]'
              : 'text-[#000] text-[14px]'
          "
          >{{
            game.events[0].collections[0].markets[0].prices[2].rate === 0
              ? "-"
              : game.events[0].collections[0].markets[0].prices[2].rate
          }}</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: relative; /* needed for absolute positioning of triangle */
  display: inline-block;
  /* padding: 10px 20px; */
  background-color: #c8102e; /* blue box */
  color: white;
  /* border-radius: 2px; */
  font-family: sans-serif;
}

/* Right-pointing triangle */
.triangle {
  position: absolute;
  top: 50%; /* vertical center */
  right: -8px; /* push outside the box */
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 8.2px solid transparent;
  border-bottom: 8.2px solid transparent;
  border-left: 8.2px solid #c8102e;
}
</style>
