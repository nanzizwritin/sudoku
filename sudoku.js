//sewd
let seed = Number(
  new Date().toISOString().slice(0,10).replaceAll("-", "")
);

function seededRandom() {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(seededRandom() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
// start to create grid
let selectedCell = null;
let inparr = [[],[],[],[],[],[],[],[],[]];
for (let i = 0; i < 9; i++) {
  for (let u = 0; u < 9; u++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.row = i;
  cell.dataset.col = u;
  grid.appendChild(cell);
  //myItems.splice(2, 0, newDiv); 
  inparr[i][u] = cell;
  cell.className = "cell";
  if (i % 3 === 0) {
    cell.style.borderTop = "3px solid black";
}

if (u % 3 === 0) {
    cell.style.borderLeft = "3px solid black";
}

if (i === 8) {
    cell.style.borderBottom = "3px solid black";
}

if (u === 8) {
    cell.style.borderRight = "3px solid black";
}
  cell.addEventListener("click", function () {
  selectedCell = cell;
}

);
}
}
// stort of putting values in grid
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(seededRandom() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

let solutions = 0;

function countSolutions(board) {

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {

      if (board[y][x] === 0) {

        let nums = [1,2,3,4,5,6,7,8,9];

        for (let num of nums) {

          if (checker(num, board, y, x)) {

            board[y][x] = num;

            countSolutions(board);

            board[y][x] = 0;
          }
        }

        return;
      }
    }
  }

  solutions++;
}

function generateSudoku(removeAmount) {

  let board = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ];

  solveSudoku(board);

  let solvedBoard = board.map(row => [...row]);

  while (removeAmount > 0) {

    let row = Math.floor(seededRandom() * 9);
    let col = Math.floor(seededRandom() * 9);

    if (board[row][col] === 0) continue;

    let backup = board[row][col];

    board[row][col] = 0;

    let testBoard = board.map(r => [...r]);

    solutions = 0;

    countSolutions(testBoard);

    if (solutions !== 1) {
      board[row][col] = backup;
    } else {
      removeAmount--;
    }
  }

  return {
    puzzle: board,
    solution: solvedBoard
  };
}


// example
let game = generateSudoku(50);

let sudoku = game.puzzle;




let changingsudo = sudoku.map(row => [...row]);
for (let i = 0; i < 9; i++) {
    for (let u = 0; u < 9; u++) {
        if (sudoku[i][u]>0){
            inparr[i][u].textContent = sudoku[i][u];
            inparr[i][u].style.backgroundColor = "#D3D3D3";
            inparr[i][u].dataset.locked = "true";
            changingsudo[i][u] = sudoku[i][u];
}
}}
//buttons
let butto = [];
const buttons = document.getElementById("buttons");

for (let i = 0; i < 10; i++){
    const bu = document.createElement("button");
    bu.className = "buttonqualities";
    buttons.appendChild(bu);
    butto[i] = bu;

    if (i == 0){
        bu.textContent = ""
        bu.dataset.value = 0;
    } else {
        bu.textContent = i
        bu.dataset.value = i;
    }
    bu.addEventListener("click", function () {
  if (selectedCell) {
    const row = Number(selectedCell.dataset.row);
    const col = Number(selectedCell.dataset.col);
    // check if original value was 0
    if (sudoku[row][col] == 0) {
      inparr[row][col].dataset.locked = "false";
      if (this.textContent==0){
        selectedCell.textContent = ""
        changingsudo[row][col] = 0;
      } else {
      selectedCell.textContent = this.dataset.value;
      changingsudo[row][col] = Number(this.dataset.value);
      inparr[row][col].style.backgroundColor = "#ffffffff";
      }
    }

  }

}
)};

const check = document.createElement("button");
check.className = "buttonqualities";
check.textContent = "Check"
check.style.width = "100px";
buttons.appendChild(check);


// selecting the box
// solving the sudoku
function checker(num, sudoku, y, x) {
    for (let i = 0; i < 9; i++) {
        if (sudoku[y][i] === num) return false;
        if (sudoku[i][x] === num) return false;
    }

    const r = Math.floor(y / 3) * 3;
    const c = Math.floor(x / 3) * 3;

    for (let i = r; i < r + 3; i++) {
        for (let j = c; j < c + 3; j++) {
            if (sudoku[i][j] === num) return false;
        }
    }

    return true;
}

function solveSudoku(sudoku) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {

            if (sudoku[y][x] === 0) {

                for (let num = 1; num <= 9; num++) {

                    if (checker(num, sudoku, y, x)) {
                        sudoku[y][x] = num;

                        if (solveSudoku(sudoku)) {
                            return true;
                        }

                        // backtrack
                        sudoku[y][x] = 0;
                    }
                }

                return false; // only after trying all numbers
            }
        }
    }

    return true;
};
let ss = sudoku.map(row => [...row]);
solveSudoku(ss);
console.log(ss)

check.addEventListener("click", function () {
  for (let y = 0; y<9; y++){
    for (let x = 0; x<9; x++){
      if (inparr[y][x].dataset.locked=="false"){
        if (changingsudo[y][x] != 0){
          if (changingsudo[y][x] == ss[y][x]){
            inparr[y][x].dataset.locked=="true"
            sudoku[y][x]=ss[y][x]
            inparr[y][x].style.backgroundColor = "#b8eba0ff";
          }
          else{
            inparr[y][x].style.backgroundColor = "#ebb2a0ff";
          }
        }
      }
    }
  }
 

});