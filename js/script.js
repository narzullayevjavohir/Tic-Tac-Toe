// Tic Tac Toe Game
const selectBox = document.querySelector(".select-box");
const selectXBtn = selectBox.querySelector(".playerX");
const selectOBtn = selectBox.querySelector(".playerO");
const playerBoard = document.querySelector(".play-board");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

window.addEventListener("load", () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }

  selectXBtn.addEventListener("click", () => {
    selectBox.classList.add("hide");
    playerBoard.classList.add("show");
  });
  selectOBtn.addEventListener("click", () => {
    selectBox.classList.add("hide");
    playerBoard.classList.add("show");
    players.setAttribute("class", "players active player");
  });
});

let playerXIcon = "X";
let playerOIcon = "O";
let playerSign = "X";
let runBot = true;

function clickedBox(element) {
  if (players.classList.contains("player")) {
    element.innerHTML = `<b>${playerOIcon}</b>`;
    players.classList.add("active");
    playerSign = "O";
    element.setAttribute("id", playerSign);
  } else {
    element.innerHTML = `<b>${playerXIcon}</b>`;
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  }
  selectWinner();
  playerBoard.style.pointerEvents = "none";
  element.style.pointerEvents = "none";
  let randomDelayTime = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomDelayTime);
}

function bot(runBot) {
  if (runBot) {
    playerSign = "O";
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        allBox[randomBox].innerHTML = `<b>${playerXIcon}</b>`;
        players.classList.remove("active");
        playerSign = "X";
        allBox[randomBox].setAttribute("id", playerSign);
      } else {
        allBox[randomBox].innerHTML = `<b>${playerOIcon}</b>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playerBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

function getClass(idname) {
  return document.querySelector(".box" + idname).id;
}

function checkClass(val1, val2, val3, sign) {
  if (
    getClass(val1) == sign &&
    getClass(val2) == sign &&
    getClass(val3) == sign
  ) {
    return true;
  }
}

function selectWinner() {
  if (
    checkClass(1, 2, 3, playerSign) ||
    checkClass(4, 5, 6, playerSign) ||
    checkClass(6, 7, 8, playerSign) ||
    checkClass(1, 4, 7, playerSign) ||
    checkClass(2, 5, 8, playerSign) ||
    checkClass(3, 6, 9, playerSign) ||
    checkClass(1, 5, 9, playerSign) ||
    checkClass(3, 5, 7, playerSign)
  ) {
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      playerBoard.classList.remove("show");
      resultBox.classList.add("show");
    }, 700);
    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
  } else {
    if (
      getClass(1) !== "" &&
      getClass(2) !== "" &&
      getClass(3) !== "" &&
      getClass(4) !== "" &&
      getClass(5) !== "" &&
      getClass(6) !== "" &&
      getClass(7) !== "" &&
      getClass(8) !== "" &&
      getClass(9) !== ""
    ) {
      runBot = false;
      bot(runBot);
      setTimeout(() => {
        playerBoard.classList.remove("show");
        resultBox.classList.add("show");
      }, 700);
      wonText.innerHTML = `Match has been drawn!`;
    }
  }
}

replayBtn.addEventListener("click", () => {
  window.location.reload();
});
