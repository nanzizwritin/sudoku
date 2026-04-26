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
  cell.addEventListener("click", function () {
  selectedCell = cell;
});
}
}
// stort of putting values in grid
let sudoku = [
 [5,3,0,0,7,0,0,0,0],
 [6,0,0,1,9,5,0,0,0],
 [0,9,8,0,0,0,0,6,0],
 [8,0,0,0,6,0,0,0,3],
 [4,0,0,8,0,3,0,0,1],
 [7,0,0,0,2,0,0,0,6],
 [0,6,0,0,0,0,2,8,0],
 [0,0,0,4,1,9,0,0,5],
 [0,0,0,0,8,0,0,7,9]
];
for (let i = 0; i < 9; i++) {
    for (let u = 0; u < 9; u++) {
        if (sudoku[i][u]>0){
            inparr[i][u].textContent = sudoku[i][u];
            inparr[i][u].style.backgroundColor = "#D3D3D3";
        }
}
}
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
      if (this.textContent==0){
        selectedCell.textContent = ""
        inparr[row][col] = 0;
      } else {
      selectedCell.textContent = this.dataset.value;
      inparr[row][col] = Number(this.dataset.value);
      }
    }

  }
  if (selectedCell) {

    if (selectedCell.dataset.locked === "true") return;

    const row = Number(selectedCell.dataset.row);
    const col = Number(selectedCell.dataset.col);

    if (sudoku[row][col] == 0) {
      if (this.dataset.value == 0) {
        selectedCell.textContent = "";
      } else {
        selectedCell.textContent = this.dataset.value;
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
solvesudo(ss);
check.addEventListener("click", function () {

  for (let i = 0; i < 9; i++) {
    for (let u = 0; u < 9; u++) {

      const cell = inparr[i][u];

      // skip original fixed cells
      if (sudoku[i][u] !== 0) continue;

      const userVal = Number(cell.textContent);

      if (userVal === ss[i][u]) {
        cell.style.backgroundColor = "lightgreen";
        cell.dataset.locked = "true";
      } else {
        cell.style.backgroundColor = "#ffcccc"; // light red (optional)
      }
    }
  }

});