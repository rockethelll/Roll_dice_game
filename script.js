// Buttons
const newGame = document.querySelector(".btn--new")
const rollDice = document.querySelector(".btn--roll")
const holdButton = document.querySelector(".btn--hold")

// Dice display
const diceImg = document.querySelector(".dice")

// Player 1 elements
const player1 = document.querySelector(".player--1")
const roundScoreP1 = document.getElementById("round--1")
const globalScoreP1 = document.getElementById("global--1")

// Player 2 elements
const player2 = document.querySelector(".player--2")
const roundScoreP2 = document.getElementById("round--2")
const globalScoreP2 = document.getElementById("global--2")

let playing, activePlayer, roundScore, scores

// Initialize game board
const init = () => {
  scores = [0, 0]
  playing = true

  activePlayer = 1
  roundScoreP1.textContent = 0
  roundScoreP2.textContent = 0
  globalScoreP1.textContent = 0
  globalScoreP2.textContent = 0
  roundScore = 0

  diceImg.classList.add("hidden")

  player1.classList.add("player--active")
  player2.classList.remove("player--active")
  player1.classList.remove("player--winner")
  player2.classList.remove("player--winner")
}

init()

const switchPlayer = () => {
  document.getElementById(`round--${activePlayer}`).textContent = 0
  roundScore = 0
  activePlayer = activePlayer === 1 ? 2 : 1
  player1.classList.toggle("player--active")
  player2.classList.toggle("player--active")
}

rollDice.addEventListener("click", () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1
    diceImg.src = `./images/dice-${dice}.png`

    // Display dice result
    diceImg.classList.remove("hidden")

    // Checked if dice result = 1
    if (dice !== 1) {
      roundScore += dice
      document.getElementById(`round--${activePlayer}`).textContent = roundScore
    } else {
      switchPlayer()
    }
  }
})

// Hold scores
holdButton.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer - 1] += roundScore
    document.getElementById(`global--${activePlayer}`).textContent =
      scores[activePlayer - 1]

    // Check if score's player >= 100
    if (scores[activePlayer - 1] >= 100) {
      playing = false
      diceImg.classList.add("hidden")

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner")
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active")
    } else {
      switchPlayer()
    }
  }
})

newGame.addEventListener("click", init)
