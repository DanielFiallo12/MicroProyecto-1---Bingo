let bingoInstance;
let scoresInstance;
class Bingo {
  constructor() {
    scoresInstance = new Scores();

    bingoInstance = this;
    this.intervalID = null;
    this.drawnNumber = [];
    this.drawAttempts = 25;
    this.showHome();

    const players = document.querySelectorAll(
      "#player1, #player2, #player3, #player4"
    );
    const startButton = document.querySelector(".start-button");

    document.querySelector("#tamaño").addEventListener("input", (event) => {
      document.querySelector(".continue-button").disabled =
        event.target.value.trim() == "";
    });
    document.querySelector("#tamaño").addEventListener("keypress", (event) => {
      if (event.code === "Enter") {
        this.validateNumber();
      }
    });

    document.querySelector(".continue-button").addEventListener("click", () => {
      this.validateNumber();
    });

    document.querySelector(".info-button").addEventListener("click", () => {
      this.showInfo();
    });

    document.querySelector(".score-button").addEventListener("click", () => {
      scoresInstance.scoreTable();
      this.showScores();
    });

    document.querySelector(".delete-button").addEventListener("click", () => {
      scoresInstance.deleteTable();
      scoresInstance.scoreTable();
      this.showScores();
    });

    document.querySelectorAll(".back-button").forEach((button) => {
      button.addEventListener("click", () => {
        this.showHome();
      });
    });

    document.querySelectorAll(".back-button1").forEach((button) => {
      button.addEventListener("click", () => {
        this.showPlayers();
      });
    });

    players.forEach((player) => {
      player.addEventListener("input", () => {
        // Verificar que todos los campos estén llenos
        const todosLosCamposLlenos = Array.from(players).every(
          (player) => player.value.trim() !== ""
        );

        // Deshabilitar o habilitar el botón según la condición
        startButton.disabled = !todosLosCamposLlenos;
      });
    });

    document.querySelector(".start-button").addEventListener("click", () => {
      this.takeNames();
      this.showPlayers();
      this.buildGrids(4);
    });

    document.querySelector(".homb").addEventListener("click", () => {
      this.backHome();
    });

    document.querySelector(".ball").addEventListener("click", () => {
      this.startDraw();
    });

    document.getElementById("player-logo-1").addEventListener("click", () => {
      this.showPlayer1();
    });
    document.getElementById("player-logo-2").addEventListener("click", () => {
      this.showPlayer2();
    });
    document.getElementById("player-logo-3").addEventListener("click", () => {
      this.showPlayer3();
    });
    document.getElementById("player-logo-4").addEventListener("click", () => {
      this.showPlayer4();
    });
  }

  show(id) {
    document.querySelectorAll(".container").forEach((container) => {
      container.classList.remove("container--visible");
    });
    document.getElementById(id)?.classList.add("container--visible");
  }

  validateNumber() {
    var inputTamaño = document.getElementById("tamaño").value;

    // Verificar si el valor es numérico
    if (!isNaN(inputTamaño)) {
      // Convertir el valor a número
      var numero = parseFloat(inputTamaño);

      // Verificar si está en el rango deseado (3, 4 o 5)
      if (numero === 3 || numero === 4 || numero === 5) {
        this.showName();
      } else {
        alert("El tamaño de los cartones no es el correcto (3, 4 ó 5).");
      }
    } else {
      alert("Por favor, ingrese un valor numérico válido.");
    }
  }

  takeNames() {
    for (let i = 1; i <= 4; i++) {
      const playerText = document.getElementById(`player-name-${i}`);
      const newText = document.getElementById(`player${i}`).value;
      // Actualiza el texto del jugador
      playerText.textContent = newText;
    }
  }

  startDraw() {
    this.intervalID = null;
    this.drawnNumber = [];
    this.drawAttempts = 25;
    document.getElementById("startDraw").disabled = true;
    this.intervalID = setInterval(() => this.drawBall(), 5000);
  }

  genBall() {
    var number;
    do {
      number = Math.floor(Math.random() * 50) + 1;
    } while (this.drawnNumber.includes(number));
    return number;
  }

  drawBall() {
    const drawnNumberContainer1 = document.getElementById("drawnNumbers1");
    const drawnNumberContainer2 = document.getElementById("drawnNumbers2");
    const drawnNumberContainer3 = document.getElementById("drawnNumbers3");
    const drawnNumberContainer4 = document.getElementById("drawnNumbers4");

    let diagonalsData1 = 0;
    let diagonalsData2 = 0;
    let diagonalsData3 = 0;
    let diagonalsData4 = 0;

    const numberDrawn = document.getElementById("numero");
    const attemps = document.getElementById("lack");

    if (this.drawnNumber.length === 25) {
      clearInterval(this.intervalID);
      const confirmacion = window.alert(
        "Sorteo completo. Se han sorteado 25 números."
      );
      findWinner();
      document.getElementById("startDraw").disabled = false;
    } else {
      var newNumber = this.genBall();
      this.drawnNumber.push(newNumber);
      this.drawAttempts--;
      numberDrawn.textContent = newNumber;
      console.log(newNumber);

      const cell1 = document.createElement("div");
      cell1.className = "drawn-numbers";
      cell1.textContent = newNumber;
      drawnNumberContainer1.appendChild(cell1);
      const cell2 = document.createElement("div");
      cell2.className = "drawn-numbers";
      cell2.textContent = newNumber;
      drawnNumberContainer2.appendChild(cell2);
      const cell3 = document.createElement("div");
      cell3.className = "drawn-numbers";
      cell3.textContent = newNumber;
      drawnNumberContainer3.appendChild(cell3);
      const cell4 = document.createElement("div");
      cell4.className = "drawn-numbers";
      cell4.textContent = newNumber;
      drawnNumberContainer4.appendChild(cell4);

      attemps.textContent = this.drawAttempts;
      highlightCells(newNumber);
      checkHighlighted();

      const rows1 = document.getElementById("rows1");
      const rowsData1 = lines.grid1.fila.length;
      rows1.textContent = rowsData1;
      const columns1 = document.getElementById("columns1");
      const columnsData1 = lines.grid1.columna.length;
      columns1.textContent = columnsData1;
      const diagonals1 = document.getElementById("diagonals1");

      const diagonalPrincipalData1 = lines.grid1.diagonalPrincipal;
      const diagonalSecundariaData1 = lines.grid1.diagonalSecundaria;

      if (diagonalPrincipalData1 && diagonalSecundariaData1) {
        diagonalsData1 = 2;
      } else if (diagonalPrincipalData1 || diagonalSecundariaData1) {
        diagonalsData1 = 1;
      } else {
        diagonalsData1 = 0;
      }
      diagonals1.textContent = diagonalsData1;

      const score1 = document.getElementById("score1");
      const points1 = points.grid1;
      score1.textContent = points1;

      const rows2 = document.getElementById("rows2");
      const rowsData2 = lines.grid2.fila.length;
      rows2.textContent = rowsData2;
      const columns2 = document.getElementById("columns2");
      const columnsData2 = lines.grid2.columna.length;
      columns2.textContent = columnsData2;
      const diagonals2 = document.getElementById("diagonals2");

      const diagonalPrincipalData2 = lines.grid2.diagonalPrincipal;
      const diagonalSecundariaData2 = lines.grid2.diagonalSecundaria;

      if (diagonalPrincipalData2 && diagonalSecundariaData2) {
        diagonalsData2 = 2;
      } else if (diagonalPrincipalData2 || diagonalSecundariaData2) {
        diagonalsData2 = 1;
      } else {
        diagonalsData2 = 0;
      }
      diagonals2.textContent = diagonalsData2;

      const score2 = document.getElementById("score2");
      const points2 = points.grid2;
      score2.textContent = points2;

      const rows3 = document.getElementById("rows3");
      const rowsData3 = lines.grid3.fila.length;
      rows3.textContent = rowsData3;
      const columns3 = document.getElementById("columns3");
      const columnsData3 = lines.grid3.columna.length;
      columns3.textContent = columnsData3;
      const diagonals3 = document.getElementById("diagonals3");

      const diagonalPrincipalData3 = lines.grid3.diagonalPrincipal;
      const diagonalSecundariaData3 = lines.grid3.diagonalSecundaria;

      if (diagonalPrincipalData3 && diagonalSecundariaData3) {
        diagonalsData3 = 2;
      } else if (diagonalPrincipalData3 || diagonalSecundariaData3) {
        diagonalsData3 = 1;
      } else {
        diagonalsData3 = 0;
      }
      diagonals3.textContent = diagonalsData3;

      const score3 = document.getElementById("score3");
      const points3 = points.grid3;
      score3.textContent = points3;

      const rows4 = document.getElementById("rows4");
      const rowsData4 = lines.grid4.fila.length;
      rows4.textContent = rowsData4;
      const columns4 = document.getElementById("columns4");
      const columnsData4 = lines.grid4.columna.length;
      columns4.textContent = columnsData4;
      const diagonals4 = document.getElementById("diagonals4");

      const diagonalPrincipalData4 = lines.grid4.diagonalPrincipal;
      const diagonalSecundariaData4 = lines.grid4.diagonalSecundaria;

      if (diagonalPrincipalData4 && diagonalSecundariaData4) {
        diagonalsData4 = 2;
      } else if (diagonalPrincipalData4 || diagonalSecundariaData4) {
        diagonalsData4 = 1;
      } else {
        diagonalsData4 = 0;
      }
      diagonals4.textContent = diagonalsData4;

      const score4 = document.getElementById("score4");
      const points4 = points.grid4;
      score4.textContent = points4;
    }
  }

  backHome() {
    // Muestra la caja de confirmación
    const confirmacion = window.confirm(
      "¿Está seguro que desea volver al inicio?"
    );

    // Si el usuario hace clic en "Aceptar", redirige al inicio
    if (confirmacion) {
      const numberDrawn = document.getElementById("numero");
      const attemps = document.getElementById("lack");

      document.getElementById("tamaño").value = "";

      clearInterval(this.intervalID);
      numberDrawn.textContent = "";
      attemps.textContent = "";

      document.getElementById("startDraw").disabled = false;

      /* 
      document.getElementById("player1").value = "";
      document.getElementById("player2").value = "";
      document.getElementById("player3").value = "";
      document.getElementById("player4").value = "";
      const drawnNumberContainer1 = document.getElementById("drawnNumbers1");
      const drawnNumberContainer2 = document.getElementById("drawnNumbers2");
      const drawnNumberContainer3 = document.getElementById("drawnNumbers3");
      const drawnNumberContainer4 = document.getElementById("drawnNumbers4");

      drawnNumberContainer1.innerHTML = "";
      drawnNumberContainer2.innerHTML = "";
      drawnNumberContainer3.innerHTML = "";
      drawnNumberContainer4.innerHTML = "";
      
      const rows1 = document.getElementById("rows1");
      rows1.innerHTML = 0;
      const columns1 = document.getElementById("columns1");
      columns1.innerHTML = 0;
      const diagonals1 = document.getElementById("diagonals1");
      diagonals1.innerHTML = 0;

      const rows2 = document.getElementById("rows2");
      rows2.innerHTML = 0;
      const columns2 = document.getElementById("columns2");
      columns2.innerHTML = 0;
      const diagonals2 = document.getElementById("diagonals2");
      diagonals2.innerHTML = 0;

      const rows3 = document.getElementById("rows3");
      rows3.innerHTML = 0;
      const columns3 = document.getElementById("columns3");
      columns3.innerHTML = 0;
      const diagonals3 = document.getElementById("diagonals3");
      diagonals3.innerHTML = 0;

      const rows4 = document.getElementById("rows4");
      rows4.innerHTML = 0;
      const columns4 = document.getElementById("columns4");
      columns4.innerHTML = 0;
      const diagonals4 = document.getElementById("diagonals4");
      diagonals4.innerHTML = 0; */

      for (let i = 1; i <= 4; i++) {
        const drawnNumberContainer = document.getElementById(
          `drawnNumbers${i}`
        );
        drawnNumberContainer.innerHTML = "";

        const playerInput = document.getElementById(`player${i}`);
        playerInput.value = "";

        const rows = document.getElementById(`rows${i}`);
        rows.innerHTML = 0;

        const columns = document.getElementById(`columns${i}`);
        columns.innerHTML = 0;

        const diagonals = document.getElementById(`diagonals${i}`);
        diagonals.innerHTML = 0;

        const score = document.getElementById(`score${i}`);
        score.innerHTML = 0;

        lines[`grid${i}`] = {
          fila: [],
          columna: [],
          diagonalPrincipal: false,
          diagonalSecundaria: false,
        };

        points[`grid${i}`] = 0;
      }
      this.showHome();
    }
  }

  showInfo() {
    this.show("info");
  }

  showScores() {
    this.show("scoreTable-info");
  }

  showHome() {
    this.show("home");
  }

  showName() {
    this.show("name");
  }

  showPlayers() {
    this.show("players");
  }

  showPlayer1() {
    this.show("player1-card");
  }
  showPlayer2() {
    this.show("player2-card");
  }
  showPlayer3() {
    this.show("player3-card");
  }
  showPlayer4() {
    this.show("player4-card");
  }

  buildGrids(numGrids) {
    for (let gridIndex = 1; gridIndex <= numGrids; gridIndex++) {
      var gridSize = parseInt(document.getElementById("tamaño").value);

      const numbers = Array.from({ length: 50 }, (_, index) => index + 1);

      const shuffledNumbers = shuffleArray(numbers).slice(
        0,
        gridSize * gridSize
      );

      // Ordena los números para que vayan de menor a mayor por filas
      shuffledNumbers.sort((a, b) => a - b);

      const gridContainer = document.getElementById(`grid${gridIndex}`);
      gridContainer.innerHTML = "";

      gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

      const columnHeaders = ["B", "I", "N", "G", "O"].slice(0, gridSize);
      columnHeaders.forEach((headerText) => {
        const columnHeader = document.createElement("div");
        columnHeader.className = "column-header";
        columnHeader.textContent = headerText;
        gridContainer.appendChild(columnHeader);
      });

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const cell = document.createElement("div");
          cell.className = "grid-cell";
          cell.textContent = shuffledNumbers[i + j * gridSize];
          gridContainer.appendChild(cell);
        }
      }
    }
  }
}

class Scores {
  getTable() {
    return JSON.parse(localStorage.getItem("scores") ?? "[]").slice(0, 10);
  }

  addScore(player, score) {
    const scores = [...this.getTable(), { player, score }]
      .sort((a, b) => (a.score < b.score ? 1 : a.score > b.score ? -1 : 0))
      .slice(0, 10);
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  scoreTable(winner, scoresObtained) {
    const tabla = document.querySelector("#scores");
    document.querySelector("#scoreTable-info .title").innerHTML = !winner
      ? "Puntuaciones"
      : "¡Has Ganado!";
    tabla.replaceChildren();
    [].length;
    const values = this.getTable();
    for (let i = values.length; i < 10; i++) {
      values.push({ player: "", score: 0 });
    }
    values.forEach(({ player, score }, index) => {
      const row = document.createElement("tr");
      const rankingCell = document.createElement("td");
      const playerCell = document.createElement("td");
      const scoreCell = document.createElement("td");
      row.className = "row";
      rankingCell.className = "ranking";
      playerCell.className = "player";
      scoreCell.className = "score";
      rankingCell.innerHTML = `${index + 1}.`;
      playerCell.innerHTML = player;
      scoreCell.innerHTML = `${score} pts`;
      if (player === winner && score === scoresObtained) {
        row.classList.add("row-player");
        winner = null;
      }
      row.appendChild(rankingCell);
      row.appendChild(playerCell);
      row.appendChild(scoreCell);
      tabla.appendChild(row);
    });
  }

  deleteTable() {
    localStorage.removeItem("scores");
  }
}

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function highlightCells(highlightNumber) {
  for (let gridIndex = 1; gridIndex <= 4; gridIndex++) {
    const gridContainer = document.getElementById(`grid${gridIndex}`);
    const cells = gridContainer.querySelectorAll(".grid-cell");

    cells.forEach((cell) => {
      const number = parseInt(cell.textContent);
      if (number === highlightNumber) {
        cell.classList.add("grid-marked-cell");
      } else {
        cell.classList.remove("highlighted-cell");
      }
    });
  }
}

const points = {
  grid1: 0,
  grid2: 0,
  grid3: 0,
  grid4: 0,
};

const lines = {
  grid1: {
    fila: [],
    columna: [],
    diagonalPrincipal: false,
    diagonalSecundaria: false,
  },
  grid2: {
    fila: [],
    columna: [],
    diagonalPrincipal: false,
    diagonalSecundaria: false,
  },
  grid3: {
    fila: [],
    columna: [],
    diagonalPrincipal: false,
    diagonalSecundaria: false,
  },
  grid4: {
    fila: [],
    columna: [],
    diagonalPrincipal: false,
    diagonalSecundaria: false,
  },
};

function checkHighlighted() {
  for (let gridIndex = 1; gridIndex <= 4; gridIndex++) {
    const gridContainer = document.getElementById(`grid${gridIndex}`);
    const gridSize = parseInt(document.getElementById("tamaño").value);

    const pointsEarned = {
      row: 0,
      column: 0,
      diagonal: 0,
    };

    // Verifica filas
    for (let i = 0; i < gridSize; i++) {
      if (
        isRowHighlighted(gridContainer, i) &&
        !lines[`grid${gridIndex}`].fila.includes(i)
      ) {
        pointsEarned.row++;
        lines[`grid${gridIndex}`].fila.push(i);
      }
    }

    // Verifica columnas
    for (let j = 0; j < gridSize; j++) {
      if (
        isColumnHighlighted(gridContainer, j) &&
        !lines[`grid${gridIndex}`].columna.includes(j)
      ) {
        pointsEarned.column++;
        lines[`grid${gridIndex}`].columna.push(j);
      }
    }

    // Verifica diagonales
    if (
      !lines[`grid${gridIndex}`].diagonalPrincipal &&
      isDiagonalPrincipalHighlighted(gridContainer)
    ) {
      pointsEarned.diagonal += 3;
      lines[`grid${gridIndex}`].diagonalPrincipal = true;
    }

    if (
      !lines[`grid${gridIndex}`].diagonalSecundaria &&
      isDiagonalSecundariaHighlighted(gridContainer)
    ) {
      pointsEarned.diagonal += 3;
      lines[`grid${gridIndex}`].diagonalSecundaria = true;
    }

    // Suma los puntos y mansda ujn mensaje
    const totalPoints =
      pointsEarned.row + pointsEarned.column + pointsEarned.diagonal;
    if (totalPoints > 0) {
      points[`grid${gridIndex}`] += totalPoints;
      console.log(
        `Grid ${gridIndex}: ¡Puntos ganados! Total: ${
          points[`grid${gridIndex}`]
        }`
      );
    }

    if (isGridComplete(gridIndex)) {
      // Suma 5 puntos y detiene el sorteo
      points[`grid${gridIndex}`] += 5;
      clearInterval(bingoInstance.intervalID);
      console.log(
        `Grid ${gridIndex}: ¡Grid completamente marcado! Total de puntos: ${
          points[`grid${gridIndex}`]
        }`
      );
      checkWinner(gridIndex, gridSize);
    }
  }
}

function isDiagonalPrincipalHighlighted(gridContainer) {
  const cells = gridContainer.querySelectorAll(".grid-cell");
  const gridSize = Math.sqrt(cells.length);

  for (let i = 0; i < gridSize; i++) {
    const cell = cells[i * gridSize + i];
    if (!cell || !cell.classList.contains("grid-marked-cell")) {
      return false;
    }
  }

  return true;
}

function isDiagonalSecundariaHighlighted(gridContainer) {
  const cells = gridContainer.querySelectorAll(".grid-cell");
  const gridSize = Math.sqrt(cells.length);

  for (let i = 0; i < gridSize; i++) {
    const cell = cells[(gridSize - 1 - i) * gridSize + i];
    if (!cell || !cell.classList.contains("grid-marked-cell")) {
      return false;
    }
  }

  return true;
}

function isRowHighlighted(gridContainer, row) {
  const cells = gridContainer.querySelectorAll(".grid-cell");
  const gridSize = Math.sqrt(cells.length);

  for (let i = 0; i < gridSize; i++) {
    const cell = cells[row * gridSize + i];
    if (!cell.classList.contains("grid-marked-cell")) {
      return false;
    }
  }

  return true;
}

function isColumnHighlighted(gridContainer, column) {
  const cells = gridContainer.querySelectorAll(".grid-cell");
  const gridSize = Math.sqrt(cells.length);

  for (let i = 0; i < gridSize; i++) {
    const cell = cells[i * gridSize + column];
    if (!cell.classList.contains("grid-marked-cell")) {
      return false;
    }
  }

  return true;
}

function isGridComplete(gridIndex) {
  const gridContainer = document.getElementById(`grid${gridIndex}`);
  if (!gridContainer) {
    return false; // Retornaa falso si el contendor no esta definido
  }

  const cells = gridContainer.querySelectorAll(".grid-cell");

  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].classList.contains("grid-marked-cell")) {
      return false;
    }
  }

  return true;
}

function checkWinner(gridIndex, gridSize) {
  const playerIndex = gridIndex; // Asigna el indice del jugador al grid que le tca

  const rowsData = lines[`grid${gridIndex}`].fila.length;
  const columnsData = lines[`grid${gridIndex}`].columna.length;
  const diagonalsData =
    lines[`grid${gridIndex}`].diagonalPrincipal +
    lines[`grid${gridIndex}`].diagonalSecundaria;

  if (
    rowsData === gridSize ||
    columnsData === gridSize ||
    diagonalsData === 2
  ) {
    const playerName = document.getElementById(
      `player-name-${playerIndex}`
    ).textContent;
    const currentScore = points[`grid${playerIndex}`];
    window.alert(`¡${playerName} ha ganado en el cartón ${gridIndex}!`);
    scoresInstance.addScore(playerName, currentScore);
    scoresInstance.scoreTable(playerName, currentScore);
  }
}

function findWinner() {
  let maxScore = 0;
  let winnerIndex = -1;

  for (let i = 1; i <= 4; i++) {
    const currentScore = points[`grid${i}`];
    if (currentScore > maxScore) {
      maxScore = currentScore;
      winnerIndex = i;
    }
  }

  if (winnerIndex !== -1) {
    const playerName = document.getElementById(
      `player-name-${winnerIndex}`
    ).textContent;
    window.alert(`¡${playerName} es el ganador con un puntaje de ${maxScore}!`);
    scoresInstance.addScore(playerName, maxScore);
    scoresInstance.scoreTable(playerName, maxScore);
  } else {
    window.alert("¡Es un empate! Ningún jugador ha llenado su cartón.");
  }
}

window.addEventListener("load", () => new Bingo());
