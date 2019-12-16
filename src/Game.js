import Player from './Player.js'

class Game {
  constructor(categories, clues, randomNumbers) {
    this.gameCategories = categories;
    this.roundNumber = 1;
    this.players = [];
    this.rounds = [];
    this.allClues = clues;
    this.currentPlayer = 0;
    this.cluesRemaining = 16;
    this.randomNumbers = randomNumbers;
  }

  instanstiatePlayers(playerOne, playerTwo, playerThree) {
    this.players.push(new Player(playerOne))
    this.players.push(new Player(playerTwo))
    this.players.push(new Player(playerThree))
  }

  instanstiateClues() {
    allClues.push()
  }
}

export default Game;
