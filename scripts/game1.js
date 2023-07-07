let balance = document.querySelector(".balance");

let slotOrder = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6];

let betPrice = [10, 30, 50, 60, 70, 80, 90];
let totalBet = 0;

document.querySelector(".balance").innerHTML =
  localStorage.getItem("balance_g193");

setPics();
setBets();

document.querySelector(".spin").onclick = () => {
  if (!totalBet || Number(balance.innerHTML) < totalBet) {
    return;
  }

  let current = 0;
  let max = randInt(25, 32);

  changeBalance(-totalBet);

  let interval = setInterval(() => {
    document
      .querySelectorAll(".cell")
      .forEach((cell) => cell.classList.remove("focus"));

    document
      .querySelector(`[data-num="${(current % 20) + 1}"]`)
      .classList.add("focus");

    if (current == max) {
      clearInterval(interval);
      gameOver(slotOrder[current % 20]);
    }

    current++;
  }, 200);
};

document.querySelectorAll(".cell").forEach((cell, ind) => {
  cell.onclick = () => {
    let slotNum = slotOrder[Number(cell.dataset.num) - 1];
    let betBlock = document.querySelectorAll(".bet-block")[slotNum - 1];

    let price = Number(betBlock.querySelector(".bet-price").innerHTML);
    let amount = Number(betBlock.querySelector(".bet-amount").innerHTML);

    if (Number(balance.innerHTML) < totalBet + price) {
      return;
    }

    betBlock.querySelector(".bet-amount").innerHTML = amount + 1;
    totalBet += price;
  };
});

document.querySelectorAll(".bet-block").forEach((betBlock, ind) => {
  betBlock.onclick = () => {
    let price = Number(betBlock.querySelector(".bet-price").innerHTML);
    let amount = Number(betBlock.querySelector(".bet-amount").innerHTML);

    if (Number(balance.innerHTML) < totalBet + price) {
      return;
    }

    betBlock.querySelector(".bet-amount").innerHTML = amount + 1;
    totalBet += price;
  };
});

window.onload = () => {
  document.querySelector(".wrapper").classList.remove("hidden");
};

function setPics() {
  for (i = 0; i < 9; i++) {
    let staticPic = `
    <div class="static_cell block">
        <img src="../png/s${(i % 7) + 1}.png" alt="" />
    </div>
    `;

    document.querySelector(".static").innerHTML += staticPic;
  }

  slotOrder.forEach((slotNum, ind) => {
    let pic = document.createElement("img");
    pic.src = `../png/s${slotNum}.png`;
    document.querySelector(`[data-num="${ind + 1}"]`).appendChild(pic);
  });
}

function setBets() {
  for (i = 0; i < 7; i++) {
    let betBlock = `
    <div class="bet-block">
        <img src="../png/s${i + 1}.png" alt="" />
        <div class="bet-amount block">0</div>
        <div class="bet-price">${betPrice[i]}</div>
    </div>
    `;

    document.querySelector(".side").innerHTML += betBlock;
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeBalance(amount) {
  let balance = document.querySelector(".balance");
  localStorage.setItem(
    "balance_g193",
    Number(localStorage.getItem("balance_g193")) + amount
  );
  balance.innerHTML = localStorage.getItem("balance_g193");
}

function gameOver(slot) {
  let betBlock = document.querySelectorAll(".bet-block")[slot - 1];
  let price = Number(betBlock.querySelector(".bet-price").innerHTML);
  let amount = Number(betBlock.querySelector(".bet-amount").innerHTML);

  changeBalance(price * amount * 3);
}
