<script setup>
import { computed, watch, ref } from "vue";
import StakeInput from "./StakeInput.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  totalOdds: Number,
  possibleWin: Number,
  point: Number,
  placingBet: Boolean,
  placingBetError: Boolean,
  withPoints: Boolean,
  bBalance: Number,
});

const model = defineModel({ type: Number, default: 0 });
</script>

<template>
  <div class="bg-[#ededed] px-4 py-3">
    <div class="flex justify-center items-center gap-2 mb-4">
      <StakeInput v-model="model" />
    </div>
    <div class="grid grid-cols-2 gap-1 my-2">
      <div class="bg-white flex justify-between rounded p-2 text-xs">
        <span>Total Odds</span>
        <span>{{ totalOdds }}</span>
      </div>
      <div class="bg-white flex justify-between rounded p-2 text-xs">
        <span>Multi Bonus</span>
        <span>{{ ((possibleWin * point) / 100).toFixed(2) }} ETB</span>
      </div>
      <div
        class="bg-white text-[#C8102E] flex justify-between rounded p-2 text-xs"
      >
        <span>Possible Win</span>
        <span
          >{{
            (Number(possibleWin) + Number((possibleWin * point) / 100)).toFixed(
              2
            )
          }}
          ETB</span
        >
      </div>
      <div v-if="bBalance >= 10" class="flex justify-center items-center gap-2">
        <span class="text-xs">Bet with points</span>
        <div
          @click="$emit('toggleWithPoints')"
          class="w-12 h-6 bg-white rounded-full"
        >
          <div
            class="h-6 w-6 bg-[#C8102E] rounded-full transition-transform duration-300"
            :class="`${withPoints ? 'translate-x-6' : 'translate-x-0'}`"
          ></div>
        </div>
      </div>
    </div>

    <div
      v-if="placingBetError"
      class="text-red-500 font-bold flex justify-start gap-2 items-center my-2"
    >
      <img src="/icons/error.svg" class="h-5 w-5" alt="" />
      <span>{{ placingBetError }}</span>
    </div>

    <div class="flex gap-1 text-sm">
      <TrashIcon @click="$emit('emptyBets')" class="w-[10%] h-7 opacity-50" />
      <div
        @click="
          if (!placingBet) {
            $emit('fastBet');
          }
        "
        class="w-[40%] bg-[#C8102E] text-white uppercase rounded text-center py-1 font-bold flex justify-center items-center"
      >
        <div
          v-if="placingBet"
          class="w-4 h-4 border-2 border-[#b8475a] rounded-full border-t-transparent animate-spin"
        ></div>
        <span v-if="!placingBet"> Place Bet </span>
      </div>
      <div
        @click="
          if (!placingBet) {
            $emit('placeBetsOnline');
          }
        "
        class="w-[50%] bg-[#C8102E] text-white uppercase rounded text-center py-1 font-bold flex justify-center items-center"
      >
        <div
          v-if="placingBet"
          class="w-4 h-4 border-2 border-[#b8475a] rounded-full border-t-transparent animate-spin"
        ></div>
        <span v-if="!placingBet"> Place Bet Online</span>
      </div>
    </div>
  </div>
</template>
