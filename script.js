let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let currentPlayer = "X";

let containers = document.querySelectorAll(".container");

containers.forEach(function (container) {
    container.addEventListener("click", function () {
        let containerIndex = Array.from(containers).indexOf(container);

        let rowIndex = Math.floor(containerIndex / 3);
        let columnIndex = containerIndex % 3;

        if (board[rowIndex][columnIndex] !== "") {
            return;
        }

        board[rowIndex][columnIndex] = currentPlayer;
        container.classList.add(currentPlayer.toLowerCase());

        if (checkWin() || checkDraw()) {
            endGame();
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
});

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer &&
            board[i][1] === currentPlayer &&
            board[i][2] === currentPlayer) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (board[0][j] === currentPlayer &&
            board[1][j] === currentPlayer &&
            board[2][j] === currentPlayer) {
            return true;
        }
    }

    if (board[0][0] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][2] === currentPlayer) {
        return true;
    }

    if (board[0][2] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][0] === currentPlayer) {
        return true;
    }

    return false;
}

function checkDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                return false;
            }
        }
    }

    return true;
}

function endGame() {
    containers.forEach(function (container) {
        container.classList.remove("x", "o");
    });

    let result = document.querySelector(".condition");

    if (checkWin()) {
        result.textContent = currentPlayer + " wins!";
    } else {
        result.textContent = "Draw!";
    }

    let screenTwo = document.querySelector(".screen.two");
    let screenThree = document.querySelector(".screen.three");
    let screenFour = document.querySelector(".screen.four");

    screenTwo.style.display = "none";
    screenThree.style.display = "none";
    screenFour.style.display = "flex";
}

function introText() {
    const intro = document.querySelector(".introtxt");
    const buttx = document.querySelectorAll(".screen.two .x");
    const butto = document.querySelectorAll(".screen.two .o");
    if (intro.textContent.trim() === "") {
      intro.textContent = "Press any key to play";
      for (let i = 0; i < buttx.length; i++) {
        buttx[i].textContent = "Play X";
        butto[i].textContent = "Play O";
      }
    } else if (intro.textContent.trim() === "Press any key to play") {
      intro.textContent = "\u00A0";
      for (let i = 0; i < buttx.length; i++) {
        buttx[i].textContent = "\u00A0";
        butto[i].textContent = "\u00A0";
      }
    }
  }

document.addEventListener("keydown", function (event) {
      let screenOne = document.querySelector(".screen.one");
      let screenTwo = document.querySelector(".screen.two");

      if (screenOne.style.display === "none") {
        return
      }
  
      screenOne.style.display = "none";
      screenTwo.style.display = "flex";
    
  });

let playXButton = document.querySelector(".x");
let playOButton = document.querySelector(".o");

playXButton.addEventListener("click", function () {
    currentPlayer = "X";
    let screenTwo = document.querySelector(".screen.two");
    let screenThree = document.querySelector(".screen.three");

    screenTwo.style.display = "none";
    screenThree.style.display = "flex";
});

playOButton.addEventListener("click", function () {
    currentPlayer = "O";
    let screenTwo = document.querySelector(".screen.two");
    let screenThree = document.querySelector(".screen.three");

    screenTwo.style.display = "none";
    screenThree.style.display = "flex";
});

let playAgainButton = document.querySelector(".again");

playAgainButton.addEventListener("click", function () {
    let screenOne = document.querySelector(".screen.one");
    let screenFour = document.querySelector(".screen.four");

    screenOne.style.display = "none";
    screenFour.style.display = "none";
    currentPlayer = "X";
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    containers.forEach(function (container) {
        container.classList.remove("x", "o");
    });
    let intro = document.querySelector(".introtxt");
    intro.textContent = "Press any key to play";
    let screenTwo = document.querySelector(".screen.two");
    screenTwo.style.display = "flex";
});

setInterval(introText, 500);