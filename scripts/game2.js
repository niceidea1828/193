let bet = 10;
let betAmount = 300;
let betType = "over";
let active = false;

let auto = false;
let autoInt = null;

$(".balance").html(localStorage.balance_g193);
$(".bet").html(bet);

$(".spin").click(function () {
  play();
});

$(".up").click(function () {
  changeBet(1);
});

$(".down").click(function () {
  changeBet(-1);
});

$(".minus").click(function () {
  changeBetAmount(-100);
});

$(".plus").click(function () {
  changeBetAmount(100);
});

$(".over").click(function () {
  betType = "over";

  $(".over").addClass("act");
  $(".under").removeClass("act");
});

$(".under").click(function () {
  betType = "under";

  $(".under").addClass("act");
  $(".over").removeClass("act");
});

$(".modal_ok").click(function () {
  $(".modal").addClass("hidden");
  active = true;
});

$(".result_cont").click(async function () {
  $(".dice").css({ transform: "translate(0px, 0px)" });

  $(this).addClass("hidden");
  $(".win, .lose").removeClass("none");

  await wait(500);

  active = true;
});

$(".auto").click(function () {
  if (auto) {
    clearInterval(autoInt);
    return;
  }

  auto = true;

  autoPlay();
  autoInt = setInterval(async () => {
    await autoPlay();
  }, 6000);
});

async function play() {
  if (!active || betAmount > +localStorage.balance_g193) {
    return;
  }

  changeBalance(-betAmount);

  const diceValues = [randInt(1, 6), randInt(1, 6)];
  const diceSum = diceValues[0] + diceValues[1];

  $(".dice").eq(0).attr("src", `../png/d${diceValues[0]}.png`);

  $(".dice").eq(1).attr("src", `../png/d${diceValues[1]}.png`);

  $(".cup").css({ transform: "rotate(15deg)" });
  await wait(120);
  $(".cup").css({ transform: "rotate(-15deg)" });
  await wait(120);
  $(".cup").css({ transform: "rotate(15deg)" });
  await wait(120);
  $(".cup").css({ transform: "rotate(-15deg)" });
  await wait(120);
  $(".cup").css({ transform: "rotate(0)" });

  $(".dice").eq(0).css({
    transform: "translate(-250px, -60px)"
  });

  $(".dice").eq(1).css({
    transform: "translate(-120px, -130px)"
  });

  await wait(1100);

  const win =
    (betType === "over" && diceSum > bet) ||
    (betType === "under" && diceSum < bet);

  gameOver(win);
}

async function autoPlay() {
  $(".spin").click();

  await wait(4000);

  $(".result_cont").click();

  await wait(1500);

  return;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeBalance(amount) {
  localStorage.balance_g193 = +localStorage.balance_g193 + amount;
  $(".balance").html(localStorage.balance_g193);
}

function changeBet(amount) {
  if (bet + amount > 11 || bet + amount < 3) {
    return;
  }

  bet += amount;
  $(".bet").html(bet);
}

function changeBetAmount(amount) {
  if (
    betAmount + amount > +localStorage.balance_g193 ||
    betAmount + amount <= 0
  ) {
    return;
  }

  betAmount += amount;
  $(".modal_bet-amount").html(betAmount);
}

function gameOver(win) {
  if (win) {
    changeBalance(betAmount * 3);

    $(".lose").addClass("none");
    $(".result").html(betAmount * 3);
  } else {
    $(".win").addClass("none");
    $(".result").html(0);
  }

  $(".result_cont").removeClass("hidden");
}
