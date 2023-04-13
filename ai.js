function makeComputerMove() {
    if (gameOver) {
        return false;
    }

    const corners = [0, 2, 6, 8];
    let cell = -1;
    let myArr = [];

    function getRandomCell(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function chooseRandomCorner() {
        return getRandomCell(corners);
    }

    function chooseRandomFreeCell() {
        myArr = myGrid.getFreeCellIndices();
        return getRandomCell(myArr);
    }

    if (moves >= 3) {
        cell = myGrid.getFirstWithTwoInARow(computer) || myGrid.getFirstWithTwoInARow(player);

        if (cell === false) {
            cell = (myGrid.cells[4] === 0 && difficulty === 1) ? 4 : chooseRandomFreeCell();
        }

        // additional conditions to avoid a catch-22 situation
        if (moves === 3 && myGrid.cells[4] === computer && player === x && difficulty === 1) {
            const edgePairs = [
                {playerCell: 7, enemyCells: [0, 2], availableCells: [6, 8]},
                {playerCell: 5, enemyCells: [0, 6], availableCells: [2, 8]},
                {playerCell: 3, enemyCells: [2, 8], availableCells: [0, 6]},
                {playerCell: 1, enemyCells: [6, 8], availableCells: [0, 2]}
            ];

            const foundPair = edgePairs.find(pair => {
                return myGrid.cells[pair.playerCell] === player &&
                    pair.enemyCells.every(cell => myGrid.cells[cell] === player);
            });

            if (foundPair) {
                cell = getRandomCell(foundPair.availableCells);
            }
        }
    } else if (moves === 1 && myGrid.cells[4] === player && difficulty === 1) {
        cell = chooseRandomCorner();
    } else if (moves === 0 && Math.random() < 0.8) {
        cell = chooseRandomCorner();
    } else {
        cell = (myGrid.cells[4] === 0 && difficulty === 1) ? 4 : chooseRandomFreeCell();
    }

    const id = `cell${cell}`;
    document.getElementById(id).innerHTML = computerText;
    document.getElementById(id).style.cursor = "default";

    const rotation = ["rotate(180deg)", "rotate(90deg)", ""];
    document.getElementById(id).style.transform = getRandomCell(rotation);

    myGrid.cells[cell] = computer;
    moves += 1;

    if (moves >= 5) {
        winner = checkWin();
    }

    if (winner === 0 && !gameOver) {
        whoseTurn = player;
    }
}