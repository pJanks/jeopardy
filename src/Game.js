import Player from './Player.js'

class Game {
  constructor(categories, clues, randomNumbers) {
    this.gameCategories = categories;
    this.roundNumber = 0;
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
    let firstClues;
    let sortedQuestions;
    this.rounds[this.roundNumber].categories.forEach(category => {
      firstClues = this.allClues.find(clue => {
        if (category + 1 === clue.categoryId && clue.pointValue === 100)
        return clue
      })
      this.rounds[this.roundNumber].clues.push(firstClues);
    });
    this.rounds[this.roundNumber].categories.forEach(category => {
      firstClues = this.allClues.find(clue => {
        if (category + 1 === clue.categoryId && clue.pointValue === 200)
        return clue
      })
      this.rounds[this.roundNumber].clues.push(firstClues);
    });
    this.rounds[this.roundNumber].categories.forEach(category => {
      firstClues = this.allClues.find(clue => {
        if (category + 1 === clue.categoryId && clue.pointValue === 300)
        return clue
      })
      this.rounds[this.roundNumber].clues.push(firstClues);
    });
    this.rounds[this.roundNumber].categories.forEach(category => {
      firstClues = this.allClues.find(clue => {
        if (category + 1 === clue.categoryId && clue.pointValue === 400)
        return clue
      })
      this.rounds[this.roundNumber].clues.push(firstClues);
    });
    sortedQuestions = this.rounds[this.roundNumber].clues.sort((a, b) => {
      return a.categoryId - b.categoryId;
    })
    this.rounds[this.roundNumber].clues = sortedQuestions;
    console.log(this.rounds[this.roundNumber].clues);
  }
}

export default Game;
