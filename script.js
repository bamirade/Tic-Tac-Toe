let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let containers = document.querySelectorAll(".container");
let currentPlayer = "X";
let gameHistory = [];
let winHistory = [];

containers.forEach(container => {
    container.addEventListener("click", () => {
        let containerIndex = Array.from(containers).indexOf(container);
        let rowIndex = Math.floor(containerIndex / 3);
        let columnIndex = containerIndex % 3;
        let checkbox = document.querySelector("#my-cpu")

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

        moveHistory.push(JSON.parse(JSON.stringify(board)));
        console.log(moveHistory);
        if (checkbox.checked === true) {
            makeAIMove();
        }
    });
});

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] === currentPlayer &&
            board[i][1] === currentPlayer &&
            board[i][2] === currentPlayer
        ) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (
            board[0][j] === currentPlayer &&
            board[1][j] === currentPlayer &&
            board[2][j] === currentPlayer
        ) {
            return true;
        }
    }

    if (
        board[0][0] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][2] === currentPlayer
    ) {
        return true;
    }

    if (
        board[0][2] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][0] === currentPlayer
    ) {
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
    containers.forEach(container => {
        container.classList.remove("x", "o");
    });

    let result = document.querySelector(".condition");
    let reresult = document.querySelector(".reresult");

    if (checkWin()) {
        result.textContent = currentPlayer + " wins!";
        reresult.textContent = currentPlayer + " wins!";
    } else {
        result.textContent = "Draw!";
        reresult.textContent = "Draw!";
    }

    gameHistory.push(JSON.parse(JSON.stringify(board)));
    winHistory.push(JSON.parse(JSON.stringify(result.textContent)));
    moveHistory.push(JSON.parse(JSON.stringify(board)));

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
    const visib = document.querySelector(".cpu-image");
    const nocont = document.querySelector(".hbutton .ghistory");

    if (intro.textContent.trim() === "") {
        intro.textContent = "Press any key to play";
        visib.style.visibility = "visible"
        nocont.style.visibility = "visible"

        for (let i = 0; i < buttx.length; i++) {
            buttx[i].textContent = "Play X";
            butto[i].textContent = "Play O";
        }
    } else if (intro.textContent.trim() === "Press any key to play") {
        intro.textContent = "\u00A0";
        visib.style.visibility = "hidden"
        nocont.style.visibility = "hidden"

        for (let i = 0; i < buttx.length; i++) {
            buttx[i].textContent = "\u00A0";
            butto[i].textContent = "\u00A0";
        }
    }
}

setInterval(introText,500)

document.addEventListener("keydown", event => {
    let screenOne = document.querySelector(".screen.one");
    let screenTwo = document.querySelector(".screen.two");

    if (screenOne.style.display === "none") {
        return;
    }

    screenOne.style.display = "none";
    screenTwo.style.display = "flex";
});

let playXButton = document.querySelector(".x");
let playOButton = document.querySelector(".o");

playXButton.addEventListener("click", () => {
    currentPlayer = "X";
    let screenTwo = document.querySelector(".screen.two");
    let screenThree = document.querySelector(".screen.three");

    screenTwo.style.display = "none";
    screenThree.style.display = "flex";
});

playOButton.addEventListener("click", () => {
    currentPlayer = "O";
    let screenTwo = document.querySelector(".screen.two");
    let screenThree = document.querySelector(".screen.three");

    screenTwo.style.display = "none";
    screenThree.style.display = "flex";
});

let playAgainButton = document.querySelector(".again");

playAgainButton.addEventListener("click", () => {
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

    moveHistory = [];
    containers.forEach(container => {
        container.classList.remove("x", "o");
    });

    let screenTwo = document.querySelector(".screen.two");
    screenTwo.style.display = "flex";
});

function showHistoryScreen() {
    let historyScreen = document.querySelector(".screen.ghistory");
    let screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        if (screen !== historyScreen) {
            screen.style.display = "none";
        }
    });

    currentIndex = 0;
    historyScreen.style.display = "flex";
    console.log(gameHistory);
    updateHistory();
}

function showScreenOne() {
    let screenOne = document.querySelector(".screen.one");
    let screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        if (screen !== screenOne) {
            screen.style.display = "none";
        }
    });

    screenOne.style.display = "flex";
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    moveHistory = [];
    moveIndex = 0;
    containers.forEach(container => {
        container.classList.remove("x", "o");
    });
}


let hcontainers = document.querySelectorAll(".histories");
let currentIndex = 0;

function updateHistory() {
    let prevButton = document.querySelector(".prev");
    let nextButton = document.querySelector(".next");
    let desc = document.querySelector(".hbutton .ghistory");

    if (gameHistory.length === 0) {
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        return;
    }

    let hcontainerIndex = 0;

    hcontainers.forEach(hcontainer => {
        let history = gameHistory[currentIndex];
        hcontainer.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let value = history[i][j] ? history[i][j] : "";
                hcontainer.innerHTML += `<div class="cell d${i}${j}">${value}</div>`;
            }
        }

        desc.textContent = `${winHistory[currentIndex]}`;
        hcontainerIndex++;
    });

    if (currentIndex === 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "block";
    }

    if (currentIndex === gameHistory.length - 1) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "block";
    }
}

document.querySelector(".prev").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateHistory();
    }
});

document.querySelector(".next").addEventListener("click", () => {
    if (currentIndex < gameHistory.length - 1) {
        currentIndex++;
        updateHistory();
    }
});

let moveHistory = [];
let moveContainers = document.querySelectorAll(".moves");
let moveIndex = 0;

function updateMoves() {
    let prevButton = document.querySelector(".prevv");
    let nextButton = document.querySelector(".nextt");

    if (moveHistory.length === 0) {
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        return;
    }

    let moveContainerIndex = 0;

    moveContainers.forEach(moveContainer => {
        let moves = moveHistory[moveIndex];
        moveContainer.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let value = moves[i][j] ? moves[i][j] : "";
                moveContainer.innerHTML += `<div class="cell f${i}${j}">${value}</div>`;
            }
        }

        moveContainerIndex++;
    });

    if (moveIndex === 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "block";
    }

    if (moveIndex === moveHistory.length - 1) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "block";
    }
}

document.querySelector(".prevv").addEventListener("click", () => {
    if (moveIndex > 0) {
        moveIndex--;
        updateMoves();
    }
});

document.querySelector(".nextt").addEventListener("click", () => {
    if (moveIndex < moveHistory.length - 1) {
        moveIndex++;
        updateMoves();
    }
});

function showMovesScreen() {
    console.log("showMovesScreen() called");
    let movesScreen = document.querySelector(".screen.gmoves");
    let screens = document.querySelector(".screen.four");

    screens.style.display = "none";
    movesScreen.style.display = "flex";
    console.log(moveHistory);
    updateMoves();
}

function getBestMove() {
    let availableSquares = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (moveHistory[moveHistory.length - 1][row][col] === "") {
          availableSquares.push({ row, col });
        }
      }
    }
    return availableSquares[Math.floor(Math.random() * availableSquares.length)];
  }

function makeAIMove() {
    let move = getBestMove();
    console.log(move);
    if (currentPlayer === "O") {
        board[move.row][move.col] = "O";
        let containerIndex = move.row * 3 + move.col;
        containers[containerIndex].classList.add("o");
        if (checkWin() || checkDraw()) {
            endGame();
            return;
        }

    } else if (currentPlayer === "X") {
        board[move.row][move.col] = "X";
        let containerIndex = move.row * 3 + move.col;
        containers[containerIndex].classList.add("x");
        if (checkWin() || checkDraw()) {
            endGame();
            return;
        }
    }
    gameHistory.push(JSON.parse(JSON.stringify(board)));
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    moveHistory.push(JSON.parse(JSON.stringify(board)));
    console.log(moveHistory);
}

const audioFile = './media/retro.mp3';

const preload = new Audio();
preload.src = audioFile;