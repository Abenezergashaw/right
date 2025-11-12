<script setup>
const sports = ["Football", "Basketball", "Tennis", "Volleyball", "Ice hockey"];
</script>

<template>
  <div class="h-full w-full flex flex-col pt-6 items-center">
    <div class="flex overflow-x-auto whitespace-nowrap gap-1">
      <div
        v-for="s in sports"
        class="bg-gradient-to-b from-[#C8102E] to-[#ff002b] py-4 px-4 text-white font-bold whitespace-nowrap border-r-2 border-black flex flex-col justify-center items-center gap-4 uppercase text-lg w-32"
      >
        <img
          src="https://arada.bet/files/new-live-design/sportIcons/501.svg"
          alt=""
        />
        {{ s }}
      </div>
    </div>
    <div class="loader"></div>
    <div class="text-lg mt-8 text-[#C8102E] tracking-wide">Connecting</div>
  </div>
</template>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  margin-top: 180px;
  height: 15px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(farthest-side, #c8102e 90%, #0000);
  background: var(--_g) left, var(--_g) right;
  background-size: 25% 100%;
  display: flex;
}
.loader:before {
  content: "";
  flex: 1;
  background: inherit;
  animation: l50 2s infinite;
}
@keyframes l50 {
  0% {
    transform: translate(37.5%) rotate(0);
  }
  16.67% {
    transform: translate(37.5%) rotate(90deg);
  }
  33.33% {
    transform: translate(-37.5%) rotate(90deg);
  }
  50% {
    transform: translate(-37.5%) rotate(180deg);
  }
  66.67% {
    transform: translate(-37.5%) rotate(270deg);
  }
  83.33% {
    transform: translate(37.5%) rotate(270deg);
  }
  100% {
    transform: translate(37.5%) rotate(360deg);
  }
}
</style>

<!-- <template>
  <div class="p-6">
    <div class="flex space-x-3 mb-6">
      <button
        v-for="sport in sportsList"
        :key="sport.i"
        @click="selectedSport = sport"
        :class="[
          'px-4 py-2 rounded-md font-medium transition',
          selectedSport?.i === sport.i
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800',
        ]"
      >
        {{ sport.n }}
      </button>
    </div>

    <div v-if="selectedSport">
      <h2 class="text-xl font-semibold mb-4">{{ selectedSport.n }} Leagues</h2>

      <div v-for="(country, cid) in selectedSport.c" :key="cid" class="mb-4">
        <h3 class="font-medium text-lg">
          {{ country.n }} ({{ country.q }} leagues)
        </h3>
        <ul class="ml-4 mt-2">
          <li
            v-for="(league, lid) in country.c"
            :key="lid"
            class="flex justify-between py-1 border-b border-gray-200"
          >
            <span>{{ league.n }}</span>
            <span class="text-gray-500"
              >Matches: {{ league.q }} | P: {{ league.p }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template> -->
<!-- 
<script setup>
import { ref } from "vue";

const response = {
  result: {
    data: {
      501: {
        i: 501,
        n: "Football",
        q: 28,
        c: {
          11: {
            i: 11,
            n: "Argentina",
            q: 2,
            c: {
              28015: {
                i: 28015,
                n: "Argentina - Reserve League",
                q: 2,
                p: 1290,
              },
            },
            p: 240,
          },
          31: {
            i: 31,
            n: "Brazil",
            q: 1,
            c: { 35653: { i: 35653, n: "Brazil - Cup U20", q: 1, p: 4100 } },
            p: 420,
          },
          58: {
            i: 58,
            n: "England",
            q: 6,
            c: {
              26388: {
                i: 26388,
                n: "England - Southern League Division One",
                q: 1,
                p: 280,
              },
              26389: {
                i: 26389,
                n: "England - Northern League Division One",
                q: 1,
                p: 300,
              },
              27253: {
                i: 27253,
                n: "England - Women's League Cup",
                q: 2,
                p: 440,
              },
              28782: {
                i: 28782,
                n: "England - Isthmian Division One North",
                q: 2,
                p: 273,
              },
            },
            p: 70,
          },
          61: {
            i: 61,
            n: "Europe",
            q: 7,
            c: {
              31608: {
                i: 31608,
                n: "Europe - UEFA Champions league Women",
                q: 3,
                p: 1200,
              },
              31809: {
                i: 31809,
                n: "Europe - Premier League International Cup",
                q: 2,
                p: 1050,
              },
              36034: { i: 36034, n: "Europe - UEFA Cup Women", q: 2, p: 1450 },
            },
            p: 40,
          },
        },
        p: 100,
      },
      504: {
        i: 504,
        n: "Basketball",
        q: 38,
        c: {
          2: {
            i: 2,
            n: "Africa",
            q: 1,
            c: { 28842: { i: 28842, n: "Africa - BAL", q: 1, p: 100 } },
            p: 130,
          },
          14: {
            i: 14,
            n: "Asia",
            q: 1,
            c: {
              31777: {
                i: 31777,
                n: "Asia - West Asia Super League",
                q: 1,
                p: 300,
              },
            },
            p: 250,
          },
          61: {
            i: 61,
            n: "Europe",
            q: 9,
            c: {
              80: { i: 80, n: "Europe - Eurocup - Men", q: 1, p: 300 },
              4110: { i: 4110, n: "Europe - FIBA Europe Cup", q: 3, p: 700 },
              32394: { i: 32394, n: "Europe - Euroleague", q: 3, p: 100 },
              32567: {
                i: 32567,
                n: "Europe - EuroBasket Women",
                q: 2,
                p: 1950,
              },
            },
            p: 30,
          },
        },
        p: 110,
      },
    },
  },
};

const sportsList = Object.values(response.result.data);
const selectedSport = ref(sportsList[0]);
</script> -->
