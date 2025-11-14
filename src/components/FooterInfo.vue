<script setup>
import { PhoneIcon } from "@heroicons/vue/24/outline";
import { EnvelopeIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="bg-[#A50D26]">
    <div class="text-center font-bold text-sm py-2 mb-2 text-white">
      Bet Right Sport & Entertainment PLC
    </div>
    <div class="text-[#ededed] text-xs text-center underline">Contacts</div>
    <div
      class="text-white text-xs text-center my-2 flex gap-2 items-center justify-center"
    >
      <PhoneIcon class="h-4 w-4" />
      <span>Customer Support: </span>
      <span class="text-[#ededed] underline font-bold">+251956457051</span>
    </div>
    <div
      class="text-white text-xs text-center my-2 flex gap-2 items-center justify-center"
    >
      <EnvelopeIcon class="h-4 w-4" />
      <span>Mail </span>
      <span class="text-[#ededed] underline font-bold">info@rightbet.bet</span>
    </div>

    <div
      class="text-center text-[#ededed] text-[11px] font-light tracking-wide flex flex-col opacity-60"
    >
      <span>Betting is addictive and can be physiologically harmful</span>
      <span
        >Bet Arada Sport & Entretainment Plc is licensed and regulated by the
        National Lottery Administration of Ethiopia, license No.: 021/2016</span
      >
    </div>
    <div class="px-2 py-4 flex justify-between text-white">
      <div class="flex items-center gap-2">
        <img src="../../public/icons/21.svg" alt="" class="w-6 h-6" />
        <span class="text-[11px] font-semibold">Security & Responsibility</span>
      </div>
      <button
        @click="$emit('goToRules')"
        class="uppercase bg-[white] text-[#C8102E] text-[11px] px-3 py-1 rounded-md"
      >
        click for rules
      </button>
    </div>
  </div>
</template>
