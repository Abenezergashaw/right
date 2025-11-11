<script setup>
import { ref, watch } from "vue";
import SelectInput from "./SelectInput.vue";

defineProps({
  betHistoryData: Array,
});

const betTimeFilter = defineModel({ type: String, default: "24 hours" });
const betSportFilter = ref("Sports");

const tickets = ref([
  {
    bets: [
      {
        ststatus: 0,
      },
    ],
    date: "2025-11-05T20:43:11.000Z",
    id: "990-SA3131140734",
    meta: {
      acc_id: 40705,
      dt: "2025-11-05T20:43:11.000Z",
      exParam: "",
      expid: 0,
      meta: {},
      package_id: "990-SA3131140734",
      package_sum: "1.00",
      payout_sum: null,
      ststatus: 0,
      total_rate: "136.770",
      type: 1,
    },
    payout: null,
    status: 0,
    sum: "1.00",
    total_odds: "136.770",
    type: 1,
  },
  {
    bets: [
      {
        ststatus: 0,
      },
    ],
    date: "2025-11-05T19:56:43.000Z",
    id: "990-SA2131134144",
    meta: {
      acc_id: 40705,
      dt: "2025-11-05T19:56:43.000Z",
      exParam: "",
      expid: 0,
      meta: {},
      package_id: "990-SA2131134144",
      package_sum: "1.00",
      payout_sum: null,
      ststatus: 0,
      total_rate: "100000.000",
      type: 1,
    },
    payout: null,
    status: 0,
    sum: "1.00",
    total_odds: "100000.000",
    type: 1,
  },
]);

const formattedDate = (d) => {
  const date = new Date(d);
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
};
</script>

<template>
  <div class="relative">
    <div
      class="text-xs font-light underline absolute top-1 right-2 text-white opacity-80 tracking-wide"
    >
      Clear history
    </div>

    <div class="flex gap-2 px-3 py-4">
      <div class="flex flex-col gap-2 flex-1">
        <span class="text-white text-xs font-light tracking-wide">Period</span>
        <SelectInput
          v-model="betTimeFilter"
          :options="['24 hours', '3 days', '7 days', '30 days']"
        />
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <span class="text-white text-xs font-light tracking-wide">Period</span>
        <SelectInput v-model="betSportFilter" :options="['Sports']" />
      </div>
    </div>

    <div class="text-black text-[13px] bg-white grid grid-cols-4">
      <div class="text-center py-4">Type/Date</div>
      <div class="text-center py-4">Amount/Odd</div>
      <div class="text-center py-4">Payout</div>
      <div class="text-center py-4">Status</div>
    </div>

    <div
      v-if="betHistoryData.length > 0"
      v-for="ticket in betHistoryData"
      :key="ticket.id"
      @click="$emit('gotoBetBetDetails', ticket.id)"
      class="bg-[#eaeaea] grid grid-cols-4 border-b-2 border-black"
    >
      <div class="py-2 flex flex-col items-start px-2 whitespace-nowrap">
        <span class="font-semibold text-sm">{{
          ticket.type === 0 ? "Single" : "AKO"
        }}</span>
        <span class="text-[11px] font-light whitespace-nowrap">
          {{ formattedDate(ticket.date) }}
        </span>
      </div>

      <div class="py-2 flex flex-col items-start px-2">
        <span class="text-sm">{{ ticket.sum }}</span>
        <span class="text-sm font-semibold text-[#375AB6] whitespace-nowrap"
          >x {{ ticket.total_odds }}</span
        >
      </div>

      <div
        class="text-center py-2 flex items-center justify-center font-semibold"
        :class="`${
          ticket.payout === '0.00' ? 'text-red-500' : 'text-green-500'
        }`"
      >
        {{ ticket.payout ? ticket.payout : "" }}
      </div>

      <div class="text-center py-2 flex justify-center items-center">
        <img
          v-if="ticket.meta.ststatus === 0"
          src="/icons/pending.svg"
          class="h-4 w-4"
          alt=""
        />
        <img
          v-else-if="ticket.meta.ststatus === 2"
          src="/icons/win.svg"
          class="h-4 w-4"
          alt=""
        />
        <img v-else src="/icons/lose.svg" class="h-4 w-4" alt="" />
      </div>
    </div>
  </div>
</template>
