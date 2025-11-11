<script setup>
import { ref } from "vue";
import { ChevronUpIcon as ChevronUpSolid } from "@heroicons/vue/24/solid";
import { ChevronDownIcon as ChevronDownSolid } from "@heroicons/vue/24/solid";

defineProps({
  gameDetail: Object,
  opendMarkets: Array,
  activeSelection: String,
  teams: String,
  eventId: String,
  ticketData: Array,
});
</script>

<template>
  <div class="bg-white pb-4">
    <div v-for="(m, index) in gameDetail.markets" class="px-4 py-2 text-sm">
      <div
        @click="$emit('openCloseMarket', index)"
        class="flex justify-between py-1 border-b-[1.5px]"
      >
        <span class="font-semibold">
          {{ m.marketName }}
        </span>
        <ChevronUpSolid v-if="opendMarkets.includes(index)" class="w-4 h-4" />
        <ChevronDownSolid v-else class="w-4 h-4" />
      </div>

      <div
        v-if="
          opendMarkets.includes(index) &&
          (m.orderColumnsCount === 2 || activeSelection === 'Double Bets')
        "
        class="grid grid-cols-2 gap-2 mt-2"
      >
        <div
          v-for="p in m.prices"
          class="flex-1 flex justify-between items-center px-2 py-1 rounded-sm"
          :style="{
            backgroundColor: ticketData.some(
              (t) => t.reference_id === p.referenceId
            )
              ? 'var(--general_blue)'
              : 'var(--light_gray)',
          }"
          @click="
            if (p.rate !== 0) {
              $emit(
                'betSelected',
                {
                  amount: 1,
                  errors: [],
                  price_rate: p.rate,
                  price_name: p.priceName,
                  event_name: teams,
                  isLive: false,
                  market_name: m.marketName,
                  price_hcap: p?.handicapValue,
                  reference_id: p.referenceId,
                },
                eventId
              );
            }
          "
        >
          <div>
            <span
              class="text-xs"
              :class="
                ticketData.some((t) => t.reference_id === p.referenceId)
                  ? 'text-white font-semibold'
                  : 'text-[#666]'
              "
              >{{ p.priceName }}</span
            >
            <span
              v-if="p?.handicapValue !== 0"
              class="text-xs"
              :class="
                ticketData.some((t) => t.reference_id === p.referenceId)
                  ? 'text-white font-semibold'
                  : 'text-[#666]'
              "
            >
              [{{ p?.handicapValue }}]</span
            >
          </div>
          <span
            class="text-xs"
            :class="
              ticketData.some((t) => t.reference_id === p.referenceId)
                ? 'text-white font-semibold'
                : 'text-[#333]'
            "
            >{{ p.rate === 0 ? "-" : p.rate }}</span
          >
        </div>
      </div>

      <div
        v-if="
          opendMarkets.includes(index) &&
          m.orderColumnsCount === 3 &&
          activeSelection !== 'Double Bets'
        "
        class="grid grid-cols-3 gap-2 mt-2"
      >
        <div
          v-for="p in m.prices"
          class="flex-1 flex justify-between items-center px-2 py-1 rounded-sm"
          :style="{
            backgroundColor: ticketData.some(
              (t) => t.reference_id === p.referenceId
            )
              ? 'var(--general_blue)'
              : 'var(--light_gray)',
          }"
          @click="
            if (p.rate !== 0) {
              $emit(
                'betSelected',
                {
                  amount: 1,
                  errors: [],
                  price_rate: p.rate,
                  price_name: p.priceName,
                  event_name: teams,
                  isLive: false,
                  market_name: m.marketName,
                  price_hcap: p?.handicapValue,
                  reference_id: p.referenceId,
                },
                eventId
              );
            }
          "
        >
          <div>
            <span
              class="text-xs"
              :class="
                ticketData.some((t) => t.reference_id === p.referenceId)
                  ? 'text-white font-semibold'
                  : 'text-[#666]'
              "
              >{{ p.priceName }}</span
            >
            <span
              v-if="p?.handicapValue !== 0"
              class="text-xs"
              :class="
                ticketData.some((t) => t.reference_id === p.referenceId)
                  ? 'text-white font-semibold'
                  : 'text-[#666]'
              "
            >
              [{{ p?.handicapValue }}]</span
            >
          </div>
          <span
            class="text-xs"
            :class="
              ticketData.some((t) => t.reference_id === p.referenceId)
                ? 'text-white font-semibold'
                : 'text-[#333]'
            "
            >{{ p.rate === 0 ? "-" : p.rate }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
