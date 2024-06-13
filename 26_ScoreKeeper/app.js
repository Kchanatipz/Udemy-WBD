const selectScore = document.querySelector("#select-score");
const resetButton = document.querySelector("#reset-button");

const p1 = {
  score: 0,
  button: document.querySelector("#p1-button"),
  display: document.querySelector("#p1-display"),
};

const p2 = {
  score: 0,
  button: document.querySelector("#p2-button"),
  display: document.querySelector("#p2-display"),
};

let winningScore = 3;
let isGameOver = false;

const updateScores = (player, opponent) => {
  if (!isGameOver) {
    player.score++;
    if (player.score === winningScore) {
      if (player.score - opponent.score >= 2) {
        isGameOver = true;
        player.display.classList.add("has-text-success");
        opponent.display.classList.add("has-text-danger");

        // bulma built-in styles
        player.button.disabled = true;
        opponent.button.disabled = true;
      } else {
        winningScore++;
      }
    }
    player.display.textContent = player.score;
  }
};

p1.button.addEventListener("click", () => {
  updateScores(p1, p2);
});

p2.button.addEventListener("click", () => {
  updateScores(p2, p1);
});

const reset = () => {
  isGameOver = false;
  winningScore = parseInt(selectScore.value);
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = 0;
    p.display.classList.remove("has-text-success", "has-text-danger");

    // bulma built-in style
    p.button.disabled = false;
  }
};

resetButton.addEventListener("click", reset);

selectScore.addEventListener("change", () => {
  winningScore = parseInt(selectScore.value);
  reset();
});
