let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newgameBtn = document.querySelector("#newgame-btn");
let msg = document.querySelector("#msg");

let turnX = true; // true -> X, false -> O

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turnX = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      box.style.color = "#f90505";
      box.classList.add("redglow");
      turnX = false;
    } else {
      box.innerText = "O";
      box.style.color = "#0aedf9";
      box.classList.add("blueglow");
      turnX = true;
    }
    box.disabled = true;

    checkWin();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerHTML = "Congratulations, " + winner + " is the winner!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWin = () => {
  for (let pattern of winningConditions) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return;
      }
    }
  }
  const showDraw = () => {
    msg.innerHTML = "It's a draw!";
    msgContainer.classList.remove("hide");
  };

  let isDraw = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    showDraw();
  }
};

newgameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
