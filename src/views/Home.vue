<script setup>
import { compile, computed, onMounted, ref, reactive, watch } from "vue";
import { useTheme } from "../composables/useTheme";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import TopGameInfo from "@/components/TopGameInfo.vue";
import Banner from "@/components/Banner.vue";
import MiddleGameInfo from "@/components/MiddleGameInfo.vue";
import GameTimeButton from "@/components/GameTimeButton.vue";
import SingleGameBanner from "@/components/SingleGameBanner.vue";
import SingleGame from "@/components/SingleGame.vue";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import TicketDataFooter from "@/components/TicketDataFooter.vue";
import TicketDataHeader from "@/components/TicketDataHeader.vue";
import SingleBet from "@/components/SingleBet.vue";
import TicketData from "@/components/TicketData.vue";
import Register from "@/components/Register.vue";
import CountriesList from "@/components/CountriesList.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import axios from "axios";
import FooterInfo from "@/components/FooterInfo.vue";
import Login from "@/components/Login.vue";
import CheckTicketData from "@/components/CheckTicketData.vue";
import Rules from "@/components/Rules.vue";
import { useAuthStore } from "@/stores/auth";
import BetHistory from "@/components/BetHistory.vue";
import Promo from "@/components/Promo.vue";
import PromoDetail from "@/components/PromoDetail.vue";

const auth = useAuthStore();
const isLoggedIn = ref(false);

const { theme, setTheme } = useTheme();

const url = "https://right.gondarmenu.com";
// const url = "http://localhost:3000";

const gameData = ref(null);
const singleGame = ref(null);
const countriesList = ref(null);
const leaguesData = ref(null);

const currentDateFrame = ref("All");
const currentUIState = ref("Game-List");
const showBalanceModal = ref(false);
const majorScreenUIState = ref("Home");
const middleGameInfoState = ref("Upcoming");

const ticketData = ref([
  // {
  //   amount: 1,
  //   errors: [],
  //   price_rate: 3.07,
  //   price_name: "1",
  //   event_name: "FC Fredericia V Viborg FF",
  //   isLive: false,
  //   market_name: "Match Result",
  //   price_hcap: 0,
  //   reference_id: "23683632-1-6992-0.00",
  // },
  // {
  //   amount: 1,
  //   errors: [],
  //   price_rate: 5.14,
  //   price_name: "1",
  //   event_name: "Vejle Boldklub FC V FC Kopenhagen",
  //   isLive: false,
  //   market_name: "Match Result",
  //   price_hcap: 0,
  //   reference_id: "23675784-1-6992-0.00",
  // },
]);
const isTicketPanelVisible = ref(false);
const stake = ref(10);
const gameListFilterByTime = ref("Filter by Time");
const filteredSport = ref("Football");

const checkTicketId = ref(null);
const checkTicketData = ref(null);
const checkTicketError = ref(null);

const balance = ref(0);
const bBalance = ref(0);
const rBalance = ref(0);
const withPoints = ref(true);

watch(gameListFilterByTime, async (newVa) => {
  currentUIState.value = "Loading";

  const res = await axios.post(`${url}/api/countriesList`, {
    filter: newVa,
  });

  if (!res.data.error) {
    countriesList.value = res.data[0].data.sportList;
    currentUIState.value = "Country-List";
  }
});

const register = ref(false);
const registerError = ref(null);
const login = ref(false);
const loginError = ref(null);
const form = reactive({
  phone: "",
  password: "",
  confirmPassword: "",
  dobDay: "",
  dobMonth: "",
  dobYear: "",
  promoCode: "",
  agreed: true,
});

const transaction = ref(false);
const transactionState = ref("deposit");
const depositOptionsOpenedState = ref(["t"]);
const withdrawOptionsOpenedState = ref([]);
const telebirrDepositPhone = ref(null);
const telebirrDepositAmount = ref(null);
const cbebirrDepositPhone = ref(null);
const cbebirrDepositAmount = ref(null);
const telebirrWithdrawAmount = ref(null);
const cbebirrWithdrawAmount = ref(null);
const withdrawTelebirrError = ref(null);
const withdrawTelebirrSuccess = ref(false);
const withdrawTransactionId = ref(null);
const withdrawCbebirrError = ref(null);
const withdrawCbebirrSuccess = ref(false);

const live = ref(false);

const handleOpenCloseDepositOptions = (v) => {
  const i = depositOptionsOpenedState.value.findIndex((d) => d === v);
  if (i === -1) {
    depositOptionsOpenedState.value.push(v);
  } else {
    depositOptionsOpenedState.value.splice(i, 1);
  }
};

const handleOpenCloseWithdrawOptions = (v) => {
  const i = withdrawOptionsOpenedState.value.findIndex((d) => d === v);
  if (i === -1) {
    withdrawOptionsOpenedState.value.push(v);
  } else {
    withdrawOptionsOpenedState.value.splice(i, 1);
  }
};

async function performDepositViaTelebirr() {
  if (telebirrDepositPhone.value === null) {
    alert("Invalid phone");
    return;
  }
  if (telebirrDepositAmount.value === null) {
    alert("Invalid amount");
    return;
  }
  if (
    !/^\d+$/.test(telebirrDepositAmount.value) ||
    telebirrDepositAmount.value < 10
  ) {
    alert("Minimum amount: 10 ETB");
    return;
  }
  if (
    !/^\d{9}$/.test(telebirrDepositPhone.value) ||
    telebirrDepositPhone.value[0] !== "9"
  ) {
    alert("Invalid phone");
    return;
  }

  const res = await axios.post(
    `${url}/api/deposit`,
    {
      phone: telebirrDepositPhone.value,
      amount: telebirrDepositAmount.value,
      method: 1,
    },
    {
      withCredentials: true,
    }
  );
}

async function performDepositViaCbebirr() {
  if (cbebirrDepositPhone.value === null) {
    alert("Invalid phone");
    return;
  }
  if (cbebirrDepositAmount.value === null) {
    alert("Invalid amount");
    return;
  }
  if (
    !/^\d+$/.test(cbebirrDepositAmount.value) ||
    cbebirrDepositAmount.value < 10
  ) {
    alert("Minimum amount: 10 ETB");
    return;
  }
  if (
    !/^\d{9}$/.test(cbebirrDepositPhone.value) ||
    cbebirrDepositPhone.value[0] !== "9"
  ) {
    alert("Invalid phone");
    return;
  }

  const res = await axios.post(
    `${url}/api/deposit`,
    {
      phone: cbebirrDepositPhone.value,
      amount: cbebirrDepositAmount.value,
      method: 2,
    },
    {
      withCredentials: true,
    }
  );
}

async function performWithdrawViaTelebirr() {
  withdrawTelebirrError.value = null;
  withdrawTelebirrSuccess.value = false;
  if (telebirrWithdrawAmount.value === null) {
    alert("Invalid amount");
    return;
  }
  if (
    !/^\d+$/.test(telebirrWithdrawAmount.value) ||
    telebirrWithdrawAmount.value < 10
  ) {
    alert("Minimum amount: 10 ETB");
    return;
  }

  const res = await axios.post(
    `${url}/api/withdraw`,
    {
      amount: telebirrWithdrawAmount.value,
      method: 1,
    },
    {
      withCredentials: true,
    }
  );

  if (res.data.error) {
    withdrawTelebirrError.value = res.data.message;
    return;
  }
  withdrawTelebirrSuccess.value = true;
  withdrawTransactionId.value = res.data.txn_id;
  rBalance.value = res.data.rBalance;
  bBalance.value = res.data.bBalance;
  balance.value = res.data.rBalance + res.data.bBalance;
}

async function performWithdrawViaCbebirr() {
  withdrawCbebirrError.value = null;
  withdrawCbebirrSuccess.value = false;
  if (cbebirrWithdrawAmount.value === null) {
    alert("Invalid amount");
    return;
  }
  if (
    !/^\d+$/.test(cbebirrWithdrawAmount.value) ||
    cbebirrWithdrawAmount.value < 10
  ) {
    alert("Minimum amount: 10 ETB");
    return;
  }

  const res = await axios.post(
    `${url}/api/withdraw`,
    {
      amount: cbebirrWithdrawAmount.value,
      method: 2,
    },
    {
      withCredentials: true,
    }
  );

  if (res.data.error) {
    withdrawCbebirrError.value = res.data.message;
    return;
  }
  withdrawCbebirrSuccess.value = true;
  withdrawTransactionId.value = res.data.txn_id;
  rBalance.value = res.data.rBalance;
  bBalance.value = res.data.bBalance;
  balance.value = res.data.rBalance + res.data.bBalance;
}

const authLoader = ref(false);

const betTimeFilter = ref("24 hours");
const betHistoryData = ref(null);
watch(betTimeFilter, (newval) => {
  let filter = 1;
  if (newval === "3 days") {
    filter = 3;
  } else if (newval === "7 days") {
    filter = 3;
  } else if (newval === "24 hours") {
    filter = 1;
  } else if (newval === "30 days") {
    filter = 30;
  }

  goToBetHistory(filter);
});

const loginForm = reactive({
  phone: "",
  password: "",
});

async function submitForm() {
  registerError.value = null;
  authLoader.value = true;
  const phoneRegex = /^[79]\d{8}$/;
  if (!phoneRegex.test(form.phone)) {
    alert(
      "❌ Invalid phone number. It must start with 7 or 9 and be exactly 9 digits."
    );
    return;
  }

  const passwordRegex = /^[A-Za-z0-9]{8,}$/;
  if (!passwordRegex.test(form.password)) {
    alert(
      "❌ Invalid password. Must be at least 8 characters long and contain only letters or numbers."
    );
    return;
  }
  if (form.password !== form.confirmPassword) {
    console.log("❌ Passwords do not match.");
    return;
  }

  if (!form.agreed) {
    alert("❌ You must agree to the terms.");
    return;
  }

  const res = await axios.post(
    `${url}/api/register`,
    {
      phone: form.phone,
      password: form.password,
      confirmPassword: form.confirmPassword,
    },
    {
      withCredentials: true,
    }
  );

  if (!res.data.success) {
    registerError.value = res.data.message;
    return;
  } else {
    setTimeout(() => {
      window.location.reload();
    }, 1500);

    const ok = await auth.checkSession();
    if (ok) {
      majorScreenUIState.value = "Home";
      authLoader.value = false;
    }
  }
}

async function submitLogin() {
  authLoader.value = true;

  loginError.value = null;
  const res = await axios.post(
    `${url}/api/login`,
    {
      phone: loginForm.phone,
      password: loginForm.password,
    },
    {
      withCredentials: true,
    }
  );

  if (!res.data.success) {
    loginError.value = res.data.message;
    authLoader.value = false;

    return;
  } else {
    const ok = await auth.checkSession();
    if (ok) {
      isLoggedIn.value = true;
      majorScreenUIState.value = "Home";

      authLoader.value = false;
      balance.value = (auth.user.rBalance + auth.user.bBalance).toFixed(2);
      bBalance.value = auth.user.bBalance;
      rBalance.value = auth.user.rBalance;
    }
  }
}

const fastBetPlaced = ref(false);
const fastBetCode = ref(null);
const placingBet = ref(false);
const betSuccessful = ref(false);
const placingBetError = ref(null);

const currentSport = ref("Football");

function getDateByOffset(offset) {
  const today = new Date();
  today.setDate(today.getDate() - offset);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getFutureDateByOffset(offset) {
  const date = new Date();
  // add `offset` days to today
  date.setDate(date.getDate() + offset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function getUpcomingEvents(time = "All") {
  let start = null;
  let end = null;
  majorScreenUIState.value = "Home";

  if (time === "All") {
    start = getDateByOffset(1);
    end = getDateByOffset(0);
  } else if (time === "Today") {
    start = getDateByOffset(1);
    end = getDateByOffset(0);
  } else if (time === "Tomorrow") {
    start = getDateByOffset(0);
    end = getFutureDateByOffset(1);
  } else if (time === "After") {
    start = getFutureDateByOffset(1);
    end = getFutureDateByOffset(2);
  }

  currentUIState.value = "Loading";
  middleGameInfoState.value = "Upcoming";

  const res = await axios.post(`${url}/api/upcomingEvents`, {
    start,
    end,
  });

  if (!res.data.error) {
    gameData.value = res.data[0].data.mainEventList[0].competitions;
    currentUIState.value = "Game-List";
  }
}

getUpcomingEvents();

const totalOdds = computed(() => {
  return ticketData.value.reduce(
    (acc, b) => (acc * b.price_rate).toFixed(2),
    1
  );
});

const possibleWin = computed(() => {
  return ticketData.value.length
    ? (stake.value * totalOdds.value).toFixed(2)
    : 0;
});

const currentBonus = computed(() => {
  const tickets = ticketData.value.length;
  if (tickets === 2) {
    return 2;
  }
  if (tickets === 3) {
    return 3;
  }
  if (tickets === 4) {
    return 4;
  }
  if (tickets === 5) {
    return 8;
  }
  if (tickets === 6) {
    return 12;
  }
  if (tickets === 7) {
    return 20;
  }
  if (tickets === 8) {
    return 25;
  }
  if (tickets === 9) {
    return 30;
  }
  if (tickets === 10) {
    return 40;
  }
  if (tickets === 11) {
    return 50;
  }
  if (tickets === 12) {
    return 60;
  }
  if (tickets === 13) {
    return 75;
  }
  if (tickets === 14) {
    return 85;
  }
  if (tickets === 15) {
    return 95;
  }
  if (tickets === 16) {
    return 105;
  }
  if (tickets === 17) {
    return 115;
  }
  if (tickets === 18) {
    return 120;
  }
  if (tickets === 19) {
    return 130;
  }
  if (tickets === 20) {
    return 140;
  }
  if (tickets === 21) {
    return 150;
  }
  if (tickets === 22) {
    return 160;
  }
  if (tickets === 23) {
    return 170;
  }
  if (tickets === 24) {
    return 180;
  }
  if (tickets === 25) {
    return 190;
  }
  if (tickets === 26) {
    return 200;
  }
  if (tickets === 27) {
    return 210;
  }
  if (tickets === 28) {
    return 220;
  }
  if (tickets === 29) {
    return 235;
  }
  if (tickets === 30) {
    return 245;
  }
  if (tickets === 3) {
    return 255;
  }
  if (tickets === 32) {
    return 265;
  }
  if (tickets === 33) {
    return 275;
  }
  if (tickets === 34) {
    return 285;
  }
  if (tickets === 35) {
    return 300;
  }
  if (tickets === 36) {
    return 320;
  }
  if (tickets === 37) {
    return 340;
  }
  if (tickets === 38) {
    return 360;
  }
  if (tickets === 39) {
    return 360;
  }
  if (tickets === 40) {
    return 400;
  }
  if (tickets === 41) {
    return 450;
  }
  if (tickets === 42) {
    return 500;
  }
  if (tickets === 43) {
    return 550;
  }
  if (tickets === 44) {
    return 600;
  }
  if (tickets === 45) {
    return 650;
  }
  if (tickets === 46) {
    return 700;
  }
  if (tickets === 47) {
    return 750;
  }
  if (tickets === 48) {
    return 800;
  }
  if (tickets === 49) {
    return 850;
  }
  if (tickets === 50) {
    return 900;
  }
  if (tickets >= 51) {
    return 1001;
  } else {
    return 1;
  }
});

const nextBonus = computed(() => {
  const tickets = ticketData.value.length + 1;
  if (tickets === 2) {
    return 2;
  }
  if (tickets === 3) {
    return 3;
  }
  if (tickets === 4) {
    return 4;
  }
  if (tickets === 5) {
    return 8;
  }
  if (tickets === 6) {
    return 12;
  }
  if (tickets === 7) {
    return 20;
  }
  if (tickets === 8) {
    return 25;
  }
  if (tickets === 9) {
    return 30;
  }
  if (tickets === 10) {
    return 40;
  }
  if (tickets === 11) {
    return 50;
  }
  if (tickets === 12) {
    return 60;
  }
  if (tickets === 13) {
    return 75;
  }
  if (tickets === 14) {
    return 85;
  }
  if (tickets === 15) {
    return 95;
  }
  if (tickets === 16) {
    return 105;
  }
  if (tickets === 17) {
    return 115;
  }
  if (tickets === 18) {
    return 120;
  }
  if (tickets === 19) {
    return 130;
  }
  if (tickets === 20) {
    return 140;
  }
  if (tickets === 21) {
    return 150;
  }
  if (tickets === 22) {
    return 160;
  }
  if (tickets === 23) {
    return 170;
  }
  if (tickets === 24) {
    return 180;
  }
  if (tickets === 25) {
    return 190;
  }
  if (tickets === 26) {
    return 200;
  }
  if (tickets === 27) {
    return 210;
  }
  if (tickets === 28) {
    return 220;
  }
  if (tickets === 29) {
    return 235;
  }
  if (tickets === 30) {
    return 245;
  }
  if (tickets === 3) {
    return 255;
  }
  if (tickets === 32) {
    return 265;
  }
  if (tickets === 33) {
    return 275;
  }
  if (tickets === 34) {
    return 285;
  }
  if (tickets === 35) {
    return 300;
  }
  if (tickets === 36) {
    return 320;
  }
  if (tickets === 37) {
    return 340;
  }
  if (tickets === 38) {
    return 360;
  }
  if (tickets === 39) {
    return 360;
  }
  if (tickets === 40) {
    return 400;
  }
  if (tickets === 41) {
    return 450;
  }
  if (tickets === 42) {
    return 500;
  }
  if (tickets === 43) {
    return 550;
  }
  if (tickets === 44) {
    return 600;
  }
  if (tickets === 45) {
    return 650;
  }
  if (tickets === 46) {
    return 700;
  }
  if (tickets === 47) {
    return 750;
  }
  if (tickets === 48) {
    return 800;
  }
  if (tickets === 49) {
    return 850;
  }
  if (tickets === 50) {
    return 900;
  }
  if (tickets >= 51) {
    return 1001;
  } else {
    return 1;
  }
});

const topGameInfos = [
  {
    title: "Sport",
    src: "https://arada.bet/files/webexIconsMobile/image/sportBar/ball.svg",
  },
  {
    title: "Live",
    src: "https://arada.bet/files/webexIconsMobile/image/sportBar/liveNew.svg",
  },
  {
    title: "Games",
    src: "https://arada.bet/files/webexIconsMobile/image/sportBar/casino.svg",
  },
  {
    title: "Virtual Sport",
    src: "https://arada.bet/files/webexIconsMobile/image/header/gray/virtual_sport-dark.svg",
  },
  {
    title: "Tennis",
    src: "	https://arada.bet/files/webexIconsMobile/image/sportBar/tennis.svg",
  },
  {
    title: "Basketball",
    src: "	https://arada.bet/files/webexIconsMobile/image/sportBar/basketball.svg",
  },
  {
    title: "Rugby",
    src: "https://arada.bet/files/webexIconsMobile/image/sportBar/rugby.svg",
  },
  {
    title: "Volleyball",
    src: "	https://arada.bet/files/webexIconsMobile/image/sportBar/volleyball.svg",
  },
];

const images = ["promo/1up.png", "promo/1001.png", "promo/firstdeposit.png"];

async function handleUIStateChange() {
  if (currentUIState.value === "Single-Game-List") {
    currentUIState.value = "Loading";
    setTimeout(() => {
      currentUIState.value = "Game-List";
    }, 1000);
  } else {
    currentUIState.value = "Loading";
    setTimeout(() => {
      currentUIState.value = "Single-Game-List";
    }, 1000);
  }
}

async function handleBetSelection(bet, id) {
  const exists = ticketData.value.findIndex(
    (b) => b.reference_id === bet.reference_id
  );

  if (exists !== -1) {
    ticketData.value.splice(exists, 1);
    return;
  }

  const prefix = bet.reference_id.split("-")[0];
  const index = ticketData.value.findIndex((b) =>
    b.reference_id.startsWith(prefix)
  );

  if (index !== -1) {
    ticketData.value[index] = bet;
  } else {
    ticketData.value.push(bet);
  }
  console.log(ticketData.value);
}

function handleRemoveGame(index) {
  ticketData.value.splice(index, 1);
  if (ticketData.value.length === 0) {
    isTicketPanelVisible.value = false;
    stake.value = 10;
  }
}

function handleClearingBets() {
  ticketData.value = [];
  if (ticketData.value.length === 0) {
    isTicketPanelVisible.value = false;
    stake.value = 10;
  }
}

async function handleGoningToLeagueGames(country, competition, sportId, sport) {
  currentUIState.value = "Loading";

  const res = await axios.post(`${url}/api/gamesByLeagues`, {
    country,
    competition,
    sportId,
  });

  if (!res.data.error) {
    leaguesData.value = res.data[0].data.eventList[0].competitions;
    currentUIState.value = "League-List";
  }

  currentSport.value = sport;
}

async function topGameInfosClicked(title) {
  majorScreenUIState.value = "Home";

  if (title === "Sport") {
    currentUIState.value = "Loading";

    const res = await axios.post(`${url}/api/countriesList`, {});

    if (!res.data.error) {
      countriesList.value = res.data[0].data.sportList;
      currentUIState.value = "Country-List";
      filteredSport.value = "Football";
    }
  } else if (title === "Live") {
    majorScreenUIState.value = "Live";
  } else if (title === "Tennis") {
    currentUIState.value = "Loading";

    const res = await axios.post(`${url}/api/countriesList`, {});

    if (!res.data.error) {
      countriesList.value = res.data[0].data.sportList;
      currentUIState.value = "Country-List";
      filteredSport.value = "Tennis";
    }
  } else if (title === "Basketball") {
    currentUIState.value = "Loading";

    const res = await axios.post(`${url}/api/countriesList`, {});

    if (!res.data.error) {
      countriesList.value = res.data[0].data.sportList;
      currentUIState.value = "Country-List";
      filteredSport.value = "Basketball";
    }
  } else if (title === "Rugby") {
    currentUIState.value = "Loading";

    const res = await axios.post(`${url}/api/countriesList`, {});

    if (!res.data.error) {
      countriesList.value = res.data[0].data.sportList;
      currentUIState.value = "Country-List";
      filteredSport.value = "Rugby";
    }
  } else if (title === "Volleyball") {
    currentUIState.value = "Loading";

    const res = await axios.post(`${url}/api/countriesList`, {});

    if (!res.data.error) {
      countriesList.value = res.data[0].data.sportList;
      currentUIState.value = "Country-List";
      filteredSport.value = "Volleyball";
    }
  }
}

function goToHome() {
  majorScreenUIState.value = "Home";
  if (currentUIState.value !== "Game-List") {
    middleGameInfoState.value = "Upcoming";

    getUpcomingEvents();
  }
}

async function goIntoGameDetails(sportId, country, competition, eventId) {
  console.log(sportId, country, competition, eventId);
  currentUIState.value = "Loading";

  const res = await axios.post(`${url}/api/gameDetails`, {
    sportId,
    country,
    competition,
    eventId,
  });

  if (!res.data.error) {
    singleGame.value = res.data[0].data.eventList[0].competitions[0];
    currentUIState.value = "Single-Game-List";
  }
}

async function getTopSports() {
  currentUIState.value = "Loading";
  middleGameInfoState.value = "topSports";
  majorScreenUIState.value = "Home";

  const res = await axios.post(`${url}/api/topSports`, {});

  if (!res.data.error) {
    gameData.value = res.data[0].data.mainEventList[0].competitions;
    currentUIState.value = "Game-List";
  }
}

async function handleTimeFrameChange(timeFrame) {
  await getUpcomingEvents(timeFrame);
  currentDateFrame.value = timeFrame;
}

async function handlePlaceBetsOnline() {
  placingBet.value = true;
  placingBetError.value = null;
  // if(withPoints.value){
  //     const bonusPercentage = currentBonus.value;
  //     const bonusAmount = (stake.value * bonusPercentage) / 100;
  //     stake.value = parseFloat((stake.value + bonusAmount).toFixed(2));
  // }

  const res = await axios.post(
    `${url}/api/placeBets`,
    {
      tickets: ticketData.value,
      stake: stake.value,
      withPoints: withPoints.value,
    },
    {
      withCredentials: true,
    }
  );
  if (res.data.error) {
    placingBetError.value = res.data.message;
    placingBet.value = false;
    const errorBets = res.data.data[0].data.bets;
    errorBets.forEach((s) => {
      const t = ticketData.value.find((x) => x.reference_id === s.reference_id);
      if (t) t.errors = s.errors;
    });

    return;
  }

  if (!res.data.error) {
    ticketData.value = [];
    if (ticketData.value.length === 0) {
      majorScreenUIState.value = "Home";
      stake.value = 10;
      placingBet.value = false;
      betSuccessful.value = true;
      const ok = await auth.checkSession();
      if (ok) {
        balance.value = (auth.user.rBalance + auth.user.bBalance).toFixed(2);
        bBalance.value = auth.user.bBalance;
        rBalance.value = auth.user.rBalance;
      }
      setTimeout(() => {
        betSuccessful.value = false;
      }, 3000);
    }
  } else {
    const errorBets = res.data[0].data.bets;
    console.log(res.data[0].data);
    console.log(errorBets);
  }
}

async function handleFastBetting() {
  placingBet.value = true;
  const res = await axios.post(`${url}/api/placeFastBet`, {
    tickets: ticketData.value,
    stake: stake.value,
  });
  if (!res.data.error) {
    fastBetCode.value = res.data[0].data.packageId;
    fastBetPlaced.value = true;
    placingBet.value = false;
  }
}

async function handleCheckTicket() {
  checkTicketData.value = null;
  checkTicketError.value = null;
  if (checkTicketId.value !== null) {
    const res = await axios.post(`${url}/api/checkTicket`, {
      id: checkTicketId.value,
    });
    console.log(res.data);
    if (res.data[0].error) {
      checkTicketError.value = res.data[0].message;
      return;
    }
    checkTicketData.value = res.data[0].data;
  }
}

function handleGoToCheckTicket() {
  majorScreenUIState.value = "Home";
  currentUIState.value = "Ticket-Check";
}

async function handleLogout() {
  await auth.logout();
  const ok = await auth.checkSession();
  currentUIState.value = "Game-List";
  window.location.reload();

  if (ok) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
}

async function goToBetHistory(filter = 1) {
  majorScreenUIState.value = "Home";
  currentUIState.value = "Loading";
  const res = await axios.post(
    `${url}/api/betHistory`,
    {
      timeFrame: filter,
    },
    {
      withCredentials: true,
    }
  );
  betHistoryData.value = res.data;
  currentUIState.value = "Bet-History";
}

async function handleGotoBetBetDetails(id) {
  console.log(id);
  checkTicketId.value = id;
  handleCheckTicket();
  currentUIState.value = "Ticket-Check";
}

async function refreshBalance() {
  const ok = await auth.checkSession();
  if (ok) {
    balance.value = (auth.user.rBalance + auth.user.bBalance).toFixed(2);
    bBalance.value = auth.user.bBalance;
    rBalance.value = auth.user.rBalance;
    if (bBalance.value >= 10) {
      withPoints.value = true;
    } else {
      withPoints.value = false;
    }
  }
}

const promoDetail = ref(null);

function handleGoToPromoDetails(data) {
  promoDetail.value = data;
  majorScreenUIState.value = "Promo-Details";
}

onMounted(async () => {
  setTheme("arada-theme");
  const ok = await auth.checkSession();
  if (ok) {
    isLoggedIn.value = true;
    balance.value = (auth.user.rBalance + auth.user.bBalance).toFixed(2);
    bBalance.value = auth.user.bBalance;
    rBalance.value = auth.user.rBalance;
    if (bBalance.value >= 10) {
      withPoints.value = true;
    } else {
      withPoints.value = false;
    }
  }
});
</script>

<template>
  <div v-if="majorScreenUIState === 'Ticket'" class="flex flex-col h-[100dvh]">
    <TicketDataHeader @makeTicketPanelHidden="majorScreenUIState = 'Home'" />
    <main class="flex-1 overflow-y-auto bg-white">
      <div class="flex gap-1 items-center p-2">
        <InformationCircleIcon class="w-10 h-10" style="color: #c8102e" />
        <span class="text-xs font-bold" style="color: #c8102e"
          >Current bonus is {{ currentBonus }}%, one more selection will give
          you {{ nextBonus }}%</span
        >
      </div>
      <SingleBet
        :tickets="ticketData"
        @removeGameFromTicket="handleRemoveGame"
      />
    </main>
    <TicketData
      :totalOdds="totalOdds"
      :possibleWin="possibleWin"
      :point="currentBonus"
      :placingBet="placingBet"
      :placingBetError="placingBetError"
      :bBalance="bBalance"
      :withPoints="withPoints"
      v-model="stake"
      @emptyBets="handleClearingBets"
      @placeBetsOnline="handlePlaceBetsOnline"
      @fastBet="handleFastBetting"
      @toggleWithPoints="withPoints = !withPoints"
    />
  </div>

  <div
    v-if="majorScreenUIState === 'Transaction'"
    class="flex flex-col h-[100dvh]"
  >
    <Navbar
      @register="majorScreenUIState = 'Register'"
      @login="majorScreenUIState = 'Login'"
      @transaction="majorScreenUIState = 'Transaction'"
      @goToLive="majorScreenUIState = 'Live'"
      @transactionWithdraw="
        transaction = true;
        transactionState = 'withdraw';
      "
      @goToRules="
        majorScreenUIState = 'Home';
        currentUIState = 'Rules';
      "
      @goToPromotions="majorScreenUIState = 'Promo'"
      @logout="handleLogout"
      :isLoggedIn="isLoggedIn"
      :balance="balance"
      @goToCheckTicket="handleGoToCheckTicket"
      @goToTopSports="getTopSports"
      @goToUpcomingGames="getUpcomingEvents"
      @goToCountryList="topGameInfosClicked('Sport')"
      @goToHome="goToHome"
      @goToBetHistory="
        goToBetHistory();
        transaction = false;
      "
      @openShowModal="showBalanceModal = true"
    />

    <main class="flex-1 overflow-y-auto flex flex-col">
      <div class="text-white flex-1 px-2">
        <div
          class="uppercase text-xl tracking-wide py-5 font-semibold border-b-2 text-white border-white"
        >
          {{
            transactionState === "deposit"
              ? "deposit methods"
              : transactionState === "withdraw"
              ? "withdraw"
              : "histroy"
          }}
        </div>

        <div class="flex gap-10 my-4 justify-center font-semibold">
          <div
            @click="
              transactionState = 'deposit';
              withdrawTelebirrSuccess = false;
              withdrawCbebirrSuccess = false;
            "
            class="pb-1"
            :class="
              transactionState === 'deposit'
                ? 'border-b border-white text-white'
                : ''
            "
          >
            Deposit
          </div>
          <div
            @click="transactionState = 'withdraw'"
            class="pb-1"
            :class="
              transactionState === 'withdraw'
                ? 'border-b border-white text-white'
                : ''
            "
          >
            Withdraw
          </div>
          <div
            @click="transactionState = 'history'"
            class="pb-1"
            :class="
              transactionState === 'history'
                ? 'border-b border-white text-white'
                : ''
            "
          >
            History
          </div>
        </div>

        <div v-if="transactionState === 'deposit'" class="flex flex-col gap-2">
          <div
            class="bg-white rounded-sm flex flex-col justify-between px-2 pt-2"
          >
            <div
              @click="handleOpenCloseDepositOptions('t')"
              class="flex justify-between items-center gap-2 pb-2"
            >
              <img src="/icons/teleBirr.svg" class="h-8 w-24" alt="" />
              <ChevronDownIcon
                v-if="!depositOptionsOpenedState.includes('t')"
                class="h-4 w-4 text-black"
              />
              <ChevronUpIcon v-else class="h-4 w-4 text-black" />
            </div>
            <div
              v-if="depositOptionsOpenedState.includes('t')"
              class="text-black pb-4"
            >
              <span class="font-semibold mt-2 mb-4">SantimPay</span>
              <div class="mt-4">
                <label class="block text-xs mb-3 opacity-90 font-light">
                  Phone number
                </label>
                <div class="flex items-center my-2">
                  <input
                    type="text"
                    value="+251"
                    disabled
                    class="bg-[#ededed] text-gray-500 px-3 py-2 w-16 text-center cursor-not-allowed"
                  />
                  <input
                    v-model="telebirrDepositPhone"
                    type="text"
                    placeholder="Phone Number"
                    class="border border-gray-300 -r px-3 py-2 flex-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-xs mb-3 opacity-90 font-light">
                  Amount
                </label>
                <div class="flex items-center my-2">
                  <input
                    v-model="telebirrDepositAmount"
                    type="number"
                    placeholder="Amount"
                    class="border border-gray-300 -r px-3 py-2 flex-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
                  />
                </div>

                <div
                  @click="performDepositViaTelebirr"
                  class="w-full bg-[#C8102E] text-white py-2 disabled:bg-gray-300 uppercase font-semibold text-center mt-4"
                >
                  continue
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-sm flex flex-col justify-between px-2 pt-2"
          >
            <div
              @click="handleOpenCloseDepositOptions('c')"
              class="flex justify-between items-center gap-2 pb-2"
            >
              <img src="/icons/cbeBirr.svg" class="h-8 w-24" alt="" />
              <ChevronDownIcon
                v-if="!depositOptionsOpenedState.includes('c')"
                class="h-4 w-4 text-black"
              />
              <ChevronUpIcon v-else class="h-4 w-4 text-black" />
            </div>
            <div
              v-if="depositOptionsOpenedState.includes('c')"
              class="text-black pb-4"
            >
              <span class="font-semibold mt-2 mb-4">SantimPay</span>
              <div class="mt-4">
                <label class="block text-xs mb-3 opacity-90 font-light">
                  Phone number
                </label>
                <div class="flex items-center my-2">
                  <input
                    type="text"
                    value="+251"
                    disabled
                    class="bg-[#ededed] text-gray-500 px-3 py-2 w-16 text-center cursor-not-allowed"
                  />
                  <input
                    v-model="cbebirrDepositPhone"
                    type="text"
                    placeholder="Phone Number"
                    class="border border-gray-300 -r px-3 py-2 flex-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-xs mb-3 opacity-90 font-light">
                  Amount
                </label>
                <div class="flex items-center my-2">
                  <input
                    v-model="cbebirrDepositAmount"
                    type="number"
                    placeholder="Amount"
                    class="border border-gray-300 -r px-3 py-2 flex-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
                  />
                </div>

                <div
                  @click="performDepositViaCbebirr"
                  class="w-full bg-[#C8102E] text-white py-2 0 disabled:bg-gray-300 uppercase font-semibold text-center mt-4"
                >
                  continue
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="transactionState === 'withdraw'" class="flex flex-col gap-2">
          <div
            class="bg-white rounded-sm flex flex-col justify-between px-2 pt-2"
          >
            <div
              @click="handleOpenCloseWithdrawOptions('t')"
              class="flex justify-between items-center gap-2 pb-2"
            >
              <img src="/icons/teleBirr.svg" class="h-8 w-24" alt="" />
              <ChevronDownIcon
                v-if="!withdrawOptionsOpenedState.includes('t')"
                class="h-4 w-4 text-black"
              />
              <ChevronUpIcon v-else class="h-4 w-4 text-black" />
            </div>
            <div
              v-if="
                withdrawOptionsOpenedState.includes('t') &&
                !withdrawTelebirrSuccess
              "
              class="text-black pb-4"
            >
              <div class="font-light mt-2 mb-4 text-end text-xs">
                Your Accessible Withdraw Amount (AWA) is {{ rBalance }} ETB
              </div>

              <div class="mt-4">
                <label class="block text-xs mb-3 opacity-90 font-light">
                  Amount
                </label>
                <div class="flex items-center my-2">
                  <input
                    v-model="telebirrWithdrawAmount"
                    type="number"
                    placeholder="Amount"
                    class="border border-gray-300 -r px-3 py-2 flex-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
                  />
                </div>

                <div
                  @click="performWithdrawViaTelebirr"
                  class="w-full bg-[#C8102E] text-white py-2 hover:bg-blue-600 disabled:bg-gray-300 uppercase font-semibold text-center mt-4"
                >
                  withdraw
                </div>
                <span class="text-xs font-light text-red-500">{{
                  withdrawTelebirrError
                }}</span>
              </div>
            </div>
            <div
              v-if="
                withdrawOptionsOpenedState.includes('t') &&
                withdrawTelebirrSuccess
              "
              class="text-black pb-4 flex flex-col gap-1 mt-4"
            >
              <span class="font-bold text-sm"
                >We will transfer {{ telebirrWithdrawAmount }} ETB to your
                wallet as :</span
              >
              <span class="font-bold text-sm"
                >1x{{ telebirrWithdrawAmount }} ETB </span
              ><span class="font-bold text-sm"
                >Total: {{ telebirrWithdrawAmount }} ETB
              </span>
              <span class="text-xs font-light">Order Accepted</span>
              <span class="text-xs font-light"
                >Our managers will review your order soon.</span
              >
              <span class="text-xs font-light"
                >You can track the status of your order with a transaction code:
                {{ withdrawTransactionId }}.</span
              >
            </div>
          </div>

          <div
            class="bg-white rounded-sm flex flex-col justify-between px-2 pt-2"
          >
            <div
              @click="handleOpenCloseWithdrawOptions('c')"
              class="flex justify-between items-center gap-2 pb-2"
            >
              <img src="/icons/cbeBirr.svg" class="h-8 w-24" alt="" />
              <ChevronDownIcon
                v-if="!withdrawOptionsOpenedState.includes('c')"
                class="h-4 w-4 text-black"
              />
              <ChevronUpIcon v-else class="h-4 w-4 text-black" />
            </div>
            <div
              v-if="
                withdrawOptionsOpenedState.includes('c') &&
                !withdrawCbebirrSuccess
              "
              class="text-black pb-4"
            >
              <div class="font-light mt-2 mb-4 text-end text-xs">
                Your Accessible Withdraw Amount (AWA) is {{ rBalance }} ETB
              </div>

              <div class="mt-4">
                <label class="block text-xs mb-3 opacity-90 font-light">
                  Amount
                </label>
                <div class="flex items-center my-2">
                  <input
                    v-model="cbebirrWithdrawAmount"
                    type="number"
                    placeholder="Amount"
                    class="border border-gray-300 -r px-3 py-2 flex-1 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#ededed]"
                  />
                </div>

                <div
                  @click="performWithdrawViaCbebirr"
                  class="w-full bg-[#C8102E] text-white py-2 hover:bg-blue-600 disabled:bg-gray-300 uppercase font-semibold text-center mt-4"
                >
                  withdraw
                </div>
              </div>
            </div>
            <div
              v-if="
                withdrawOptionsOpenedState.includes('c') &&
                withdrawCbebirrSuccess
              "
              class="text-black pb-4 flex flex-col gap-1 mt-4"
            >
              <span class="font-bold text-sm"
                >We will transfer {{ cbebirrWithdrawAmount }} ETB to your wallet
                as :</span
              >
              <span class="font-bold text-sm"
                >1x{{ cbebirrWithdrawAmount }} ETB </span
              ><span class="font-bold text-sm"
                >Total: {{ cbebirrWithdrawAmount }} ETB
              </span>
              <span class="text-xs font-light">Order Accepted</span>
              <span class="text-xs font-light"
                >Our managers will review your order soon.</span
              >
              <span class="text-xs font-light"
                >You can track the status of your order with a transaction code:
                {{ withdrawTransactionId }}.</span
              >
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer
      v-if="ticketData.length === 0 && !betSuccessful"
      :isLoggedIn="isLoggedIn"
      @goToLogin="majorScreenUIState = 'Login'"
      @goToLive="majorScreenUIState = 'Live'"
      @goToDeposit="majorScreenUIState = 'Transaction'"
    />
  </div>

  <div v-if="majorScreenUIState === 'Promo'" class="flex flex-col h-[100dvh]">
    <Navbar
      @register="majorScreenUIState = 'Register'"
      @login="majorScreenUIState = 'Login'"
      @transaction="majorScreenUIState = 'Transaction'"
      @goToLive="majorScreenUIState = 'Live'"
      @transactionWithdraw="
        transaction = true;
        transactionState = 'withdraw';
      "
      @goToPromotions="majorScreenUIState = 'Promo'"
      @logout="handleLogout"
      :isLoggedIn="isLoggedIn"
      :balance="balance"
      @goToRules="
        majorScreenUIState = 'Home';
        currentUIState = 'Rules';
      "
      @goToCheckTicket="handleGoToCheckTicket"
      @goToTopSports="getTopSports"
      @goToUpcomingGames="getUpcomingEvents"
      @goToCountryList="topGameInfosClicked('Sport')"
      @goToHome="goToHome"
      @goToBetHistory="
        goToBetHistory();
        transaction = false;
      "
      @openShowModal="showBalanceModal = true"
    />

    <main class="flex-1 overflow-y-auto flex flex-col bg-[#fff]">
      <Promo @goToPromoDetails="handleGoToPromoDetails" />
      <FooterInfo />
    </main>
    <Footer
      v-if="ticketData.length === 0 && !betSuccessful"
      :isLoggedIn="isLoggedIn"
      @goToLogin="majorScreenUIState = 'Login'"
      @goToLive="majorScreenUIState = 'Live'"
      @goToDeposit="majorScreenUIState = 'Transaction'"
    />
  </div>

  <div
    v-if="majorScreenUIState === 'Promo-Details'"
    class="flex flex-col h-[100dvh]"
  >
    <Navbar
      @register="majorScreenUIState = 'Register'"
      @login="majorScreenUIState = 'Login'"
      @transaction="majorScreenUIState = 'Transaction'"
      @goToLive="majorScreenUIState = 'Live'"
      @transactionWithdraw="
        transaction = true;
        transactionState = 'withdraw';
      "
      @goToRules="
        majorScreenUIState = 'Home';
        currentUIState = 'Rules';
      "
      @goToPromotions="majorScreenUIState = 'Promo'"
      @logout="handleLogout"
      :isLoggedIn="isLoggedIn"
      :balance="balance"
      @goToCheckTicket="handleGoToCheckTicket"
      @goToTopSports="getTopSports"
      @goToUpcomingGames="getUpcomingEvents"
      @goToCountryList="topGameInfosClicked('Sport')"
      @goToHome="goToHome"
      @goToBetHistory="
        goToBetHistory();
        transaction = false;
      "
      @openShowModal="showBalanceModal = true"
    />

    <main class="flex-1 overflow-y-auto flex flex-col bg-[#fff]">
      <PromoDetail :promo="promoDetail" />
      <FooterInfo />
    </main>
    <Footer
      v-if="ticketData.length === 0 && !betSuccessful"
      :isLoggedIn="isLoggedIn"
      @goToLogin="majorScreenUIState = 'Login'"
      @goToLive="majorScreenUIState = 'Live'"
      @goToDeposit="majorScreenUIState = 'Transaction'"
    />
  </div>

  <div v-if="majorScreenUIState === 'Live'" class="flex flex-col h-[100dvh]">
    <Navbar
      @register="majorScreenUIState = 'Register'"
      @login="majorScreenUIState = 'Login'"
      @transaction="majorScreenUIState = 'Transaction'"
      @goToLive="majorScreenUIState = 'Live'"
      @transactionWithdraw="
        transaction = true;
        transactionState = 'withdraw';
      "
      @goToPromotions="majorScreenUIState = 'Promo'"
      @logout="handleLogout"
      :isLoggedIn="isLoggedIn"
      :balance="balance"
      @goToRules="
        majorScreenUIState = 'Home';
        currentUIState = 'Rules';
      "
      @goToCheckTicket="handleGoToCheckTicket"
      @goToTopSports="getTopSports"
      @goToUpcomingGames="getUpcomingEvents"
      @goToCountryList="topGameInfosClicked('Sport')"
      @goToHome="goToHome"
      @goToBetHistory="
        goToBetHistory();
        transaction = false;
      "
      @openShowModal="showBalanceModal = true"
    />

    <main class="flex-1 overflow-y-auto flex flex-col bg-[#fff]">
      <div class="w-full h-full flex flex-col gap-4 pt-48 items-center">
        <div
          class="w-20 h-20 border-[6px] rounded-full border-[#C8102E] border-t-transparent animate-spin"
        ></div>
        <span class="text-lg tracking-wider font-bold text-[#C8102E]"
          >Connecting...</span
        >
      </div>
    </main>
    <Footer
      v-if="ticketData.length === 0 && !betSuccessful"
      :isLoggedIn="isLoggedIn"
      @goToLogin="majorScreenUIState = 'Login'"
      @goToLive="majorScreenUIState = 'Live'"
      @goToDeposit="majorScreenUIState = 'Transaction'"
    />
  </div>

  <div
    v-if="majorScreenUIState === 'Register'"
    class="flex flex-col h-[100dvh]"
  >
    <Navbar
      @register="majorScreenUIState = 'Register'"
      @login="majorScreenUIState = 'Login'"
      @transaction="majorScreenUIState = 'Transaction'"
      @goToLive="majorScreenUIState = 'Live'"
      @transactionWithdraw="
        transaction = true;
        transactionState = 'withdraw';
      "
      @goToRules="
        majorScreenUIState = 'Home';
        currentUIState = 'Rules';
      "
      @goToPromotions="majorScreenUIState = 'Promo'"
      @logout="handleLogout"
      :isLoggedIn="isLoggedIn"
      :balance="balance"
      @goToCheckTicket="handleGoToCheckTicket"
      @goToTopSports="getTopSports"
      @goToUpcomingGames="getUpcomingEvents"
      @goToCountryList="topGameInfosClicked('Sport')"
      @goToHome="goToHome"
      @goToBetHistory="
        goToBetHistory();
        transaction = false;
      "
      @openShowModal="showBalanceModal = true"
    />

    <main class="flex-1 overflow-y-auto">
      <div class="">
        <Register
          :authLoader="authLoader"
          :registerError="registerError"
          v-model:phone="form.phone"
          v-model:password="form.password"
          v-model:confirmPassword="form.confirmPassword"
          v-model:dobDay="form.dobDay"
          v-model:dobMonth="form.dobMonth"
          v-model:dobYear="form.dobYear"
          v-model:promoCode="form.promoCode"
          v-model:agreed="form.agreed"
          @submit="submitForm"
        />
      </div>
      <FooterInfo />
    </main>
    <Footer
      v-if="ticketData.length === 0 && !betSuccessful"
      :isLoggedIn="isLoggedIn"
      @goToLogin="majorScreenUIState = 'Login'"
      @goToLive="majorScreenUIState = 'Live'"
      @goToDeposit="majorScreenUIState = 'Transaction'"
    />
  </div>

  <div v-if="majorScreenUIState === 'Login'" class="flex flex-col h-[100dvh]">
    <Navbar
      @register="majorScreenUIState = 'Register'"
      @login="majorScreenUIState = 'Login'"
      @transaction="majorScreenUIState = 'Transaction'"
      @goToLive="majorScreenUIState = 'Live'"
      @transactionWithdraw="
        transaction = true;
        transactionState = 'withdraw';
      "
      @goToPromotions="majorScreenUIState = 'Promo'"
      @logout="handleLogout"
      :isLoggedIn="isLoggedIn"
      @goToRules="
        majorScreenUIState = 'Home';
        currentUIState = 'Rules';
      "
      :balance="balance"
      @goToCheckTicket="handleGoToCheckTicket"
      @goToTopSports="getTopSports"
      @goToUpcomingGames="getUpcomingEvents"
      @goToCountryList="topGameInfosClicked('Sport')"
      @goToHome="goToHome"
      @goToBetHistory="
        goToBetHistory();
        transaction = false;
      "
      @openShowModal="showBalanceModal = true"
    />

    <main class="flex-1 overflow-y-auto">
      <div class="">
        <Login
          :loginError="loginError"
          :authLoader="authLoader"
          v-model:phone="loginForm.phone"
          v-model:password="loginForm.password"
          @goToRegister="
            register = true;
            login = false;
          "
          @submit="submitLogin"
        />
      </div>
      <FooterInfo />
    </main>
    <Footer
      v-if="ticketData.length === 0"
      :isLoggedIn="isLoggedIn"
      @goToLogin="majorScreenUIState = 'Login'"
      @goToLive="majorScreenUIState = 'Live'"
      @goToDeposit="majorScreenUIState = 'Transaction'"
    />
  </div>

  <div v-if="majorScreenUIState === 'Home'" class="flex flex-col h-[100dvh]">
    <Navbar
      @register="majorScreenUIState = 'Register'"
      @login="majorScreenUIState = 'Login'"
      @transaction="majorScreenUIState = 'Transaction'"
      @goToLive="majorScreenUIState = 'Live'"
      @transactionWithdraw="
        transaction = true;
        transactionState = 'withdraw';
      "
      @goToPromotions="majorScreenUIState = 'Promo'"
      @logout="handleLogout"
      :isLoggedIn="isLoggedIn"
      :balance="balance"
      @goToCheckTicket="handleGoToCheckTicket"
      @goToRules="
        majorScreenUIState = 'Home';
        currentUIState = 'Rules';
      "
      @goToTopSports="getTopSports"
      @goToUpcomingGames="getUpcomingEvents"
      @goToCountryList="topGameInfosClicked('Sport')"
      @goToHome="goToHome"
      @goToBetHistory="
        goToBetHistory();
        transaction = false;
      "
      @openShowModal="showBalanceModal = true"
    />
    <TopGameInfo
      :topGameInfos="topGameInfos"
      @topGameInfosClicked="topGameInfosClicked"
    />

    <main class="flex-1 overflow-y-auto">
      <div v-if="currentUIState === 'Game-List'">
        <Banner @click="majorScreenUIState = 'Promo'" :images="images" />
        <MiddleGameInfo
          @getTopSports="getTopSports"
          @getUpcomingGames="getUpcomingEvents"
          :middleGameInfoState="middleGameInfoState"
        />
        <div
          v-if="middleGameInfoState === 'Upcoming'"
          class="flex justify-end items-center gap-2 py-1 px-2"
          style="background-color: var(--bg_white)"
        >
          <GameTimeButton
            @filterGamesByDate="handleTimeFrameChange"
            title="All"
            :current="currentDateFrame"
          />
          <GameTimeButton
            @filterGamesByDate="handleTimeFrameChange"
            title="Today"
            :current="currentDateFrame"
          />
          <GameTimeButton
            @filterGamesByDate="handleTimeFrameChange"
            title="Tomorrow"
            :current="currentDateFrame"
          />
          <GameTimeButton
            @filterGamesByDate="handleTimeFrameChange"
            title="After"
            :current="currentDateFrame"
          />
        </div>
        <div v-for="g in gameData">
          <SingleGameBanner
            @handleUIStateChange="handleUIStateChange"
            @goIntoGameDetails="goIntoGameDetails"
            @betSelected="handleBetSelection"
            :game="g"
            :ticketData="ticketData"
          />
        </div>
        <FooterInfo />
      </div>

      <div v-else-if="currentUIState === 'Single-Game-List'">
        <SingleGame
          :game="singleGame"
          :ticketData="ticketData"
          @goBackToGameList="handleUIStateChange"
          @betSelected="handleBetSelection"
        />
        <FooterInfo />
      </div>

      <div v-else-if="currentUIState === 'Country-List'">
        <CountriesList
          :countriesList="countriesList"
          v-model:filteredSport="filteredSport"
          v-model:currentTime="gameListFilterByTime"
          @goToLeagueGames="handleGoningToLeagueGames"
        />
        <FooterInfo />
      </div>

      <div v-else-if="currentUIState === 'League-List'">
        <div
          class="py-6 uppercase text-[#C8102E] font-bold flex gap-1 items-center px-4 text-lg bg-white"
        >
          <ChevronLeftIcon
            @click="
              // currentUIState = 'Loading';
              // setTimeout(() => {
              currentUIState = 'Country-List'
              // }, 1000);
            "
            class="w-8 h-8 text-white rounded-full p-1.5 font-semibold bg-[#C8102E]"
          />
          <span
            >{{ currentSport }} - {{ leaguesData[0].country }} -
            {{ leaguesData[0].competitionName }}</span
          >
        </div>
        <hr class="w-[90%] mx-auto h-2 mb-2" />
        <div v-for="g in leaguesData">
          <SingleGameBanner
            @handleUIStateChange="handleUIStateChange"
            @goIntoGameDetails="goIntoGameDetails"
            @betSelected="handleBetSelection"
            :game="g"
            :ticketData="ticketData"
          />
        </div>
        <FooterInfo />
      </div>

      <div v-else-if="currentUIState === 'Loading'" class="h-full bg-[#010101]">
        <div class="w-full h-full flex justify-center items-center">
          <div
            class="w-16 h-16 border-[6px] rounded-full border-[#C8102E] border-t-transparent animate-spin"
          ></div>
        </div>
      </div>

      <div v-else-if="currentUIState === 'Ticket-Check'" class="">
        <div class="py-3 px-2 uppercase font-semibold bg-[#C8102E] text-white">
          bet details
        </div>
        <div class="bg-[#ededed] pt-3 pb-1 px-2 border-0">
          <span class="text-xs font-semibold text-black">Ticket Number</span>
          <div class="py-2 flex gap-1.5">
            <input
              type="text"
              v-model="checkTicketId"
              class="py-3 px-2 border border-gray-700 text-xs flex-1 outline-orange-500"
            />
            <button
              @click="handleCheckTicket"
              class="uppercase text-white font-bold bg-[#C8102E] py-3 text-xs px-3 rounded"
            >
              check
            </button>
          </div>
          <div class="text-xs font-light text-red-500 text-center mb-2">
            {{ checkTicketError }}
          </div>
        </div>
        <CheckTicketData
          v-if="checkTicketData"
          :checkTicketData="checkTicketData ? checkTicketData : {}"
        />
        <FooterInfo v-if="checkTicketData" />
      </div>

      <div v-else-if="currentUIState === 'Bet-History'" class="">
        <BetHistory
          v-model="betTimeFilter"
          :betHistoryData="betHistoryData"
          @gotoBetBetDetails="handleGotoBetBetDetails"
        />
      </div>

      <div v-else-if="currentUIState === 'Rules'">
        <Rules />
      </div>
    </main>
    <Footer
      v-if="ticketData.length === 0 && !betSuccessful"
      :isLoggedIn="isLoggedIn"
      @goToLogin="majorScreenUIState = 'Login'"
      @goToLive="majorScreenUIState = 'Live'"
      @goToDeposit="majorScreenUIState = 'Transaction'"
    />
    <TicketDataFooter
      v-if="ticketData.length > 0"
      :tickets="ticketData.length"
      :totalOdds="totalOdds"
      :point="currentBonus"
      @makeTicketPanelVisible="majorScreenUIState = 'Ticket'"
    />
    <div
      v-if="ticketData.length === 0 && betSuccessful"
      class="h-10 text-center font-bold text-white flex items-center justify-center relative"
    >
      Bet Accepted
      <span
        @click="goToBetHistory(1)"
        class="absolute right-2 text-[10px] opacity-80 whitespace-pre-line w-10"
        >Bet History</span
      >
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="fastBetPlaced"
      class="fixed inset-0 bg-black bg-opacity-90 flex pt-10 justify-center z-20"
    >
      <div class="bg-[#476136] shadow-lg w-11/12 h-80 max-w-md p-6 relative">
        <button
          class="absolute top-0 right-1 text-gray-100 text-lg"
          v-on:click="
            fastBetPlaced = false;
            fastBetCode = null;
          "
        >
          ✕
        </button>
        <div class="flex flex-col gap-2 justify-center items-center text-white">
          <img
            src="https://arada.bet/files/webexIconsDesktop/assets/image/logo/logo-VAMOSETH.svg"
            class="w-20"
            alt=""
          />
          <span>Fast Bet Code</span>
          <span class="text-2xl tracking-wide">{{ fastBetCode }}</span>
          <span class="text-center">
            This is Temporary Ticket, and you can use this ticket for placing
            bet in any Right Shop.
          </span>
        </div>
      </div>
    </div>
  </Teleport>

  <Teleport to="body">
    <div
      v-if="showBalanceModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex mt-14 items-start justify-center z-20"
    >
      <div class="bg-white shadow-lg w-full px-3 pt-2 relative">
        <div
          class="flex gap-2 justify-between items-center text-black text-lg py-2 border-b-2 border-gray-300"
        >
          <span>Balance</span>
          <span
            ><strong class="text-[#C8102E]">{{ rBalance }}</strong> ETB</span
          >
        </div>
        <div
          class="flex gap-2 justify-between items-center text-black text-lg py-2 border-b-2 border-gray-300"
        >
          <span>Point</span>
          <span class="font-semibold">{{ bBalance }}</span>
        </div>
        <div
          class="flex gap-2 justify-center items-center text-black py-2 border-b-2 border-gray-300 text-sm"
        >
          <span>1 POINT = 1 ETB</span>
        </div>
        <div
          @click="refreshBalance"
          class="flex gap-2 justify-center items-center bg-[#C8102E] text-white py-2 border-b-2 border-gray-300 mt-2 font-semibold"
        >
          <span>REFRESH</span>
        </div>
        <div
          @click="showBalanceModal = false"
          class="flex gap-2 justify-center items-center text-black pb-0 font-semibold mt-2 mb-4"
        >
          <span>CLOSE</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
