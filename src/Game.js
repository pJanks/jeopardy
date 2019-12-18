import Player from './Player.js'
import Round from './Round.js'
import Clue from './Clue.js'
import $ from 'jquery'

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

  startGame() {
    let round1, round2, round3;
    const round1Nums = this.randomNumbers.splice(0, 4);
    const round2Nums = this.randomNumbers.splice(0, 4);
    const round3Nums = this.randomNumbers.splice(0, 1);
    round1 = new Round(round1Nums, 1);
    round2 = new Round(round2Nums, 2);
    round3 = new Round(round3Nums, 0);
    this.rounds.push(round1, round2, round3);
    this.instanstiatePlayers($('.player1-input').val(), $('.player2-input').val(), $('.player3-input').val());
    this.instanstiateClues();
  }

  instanstiatePlayers(playerOne, playerTwo, playerThree) {
    this.players.push(new Player(playerOne))
    this.players.push(new Player(playerTwo))
    this.players.push(new Player(playerThree))
  }

  findClues(pointValue) {
    let firstClues;
    this.rounds[this.roundNumber].categories.forEach(category => {
      firstClues = this.allClues.find(clue => {
        if (category + 1 === clue.categoryId && clue.pointValue === pointValue)
        return clue
      })
      this.rounds[this.roundNumber].cluesData.push(firstClues);
    }
  )}

  instanstiateClues() {
    let sortedQuestions;
    let clueObject;
    this.findClues(100);
    this.findClues(200);
    this.findClues(300);
    this.findClues(400);
    sortedQuestions = this.rounds[this.roundNumber].cluesData.sort((a, b) => {
      return a.categoryId - b.categoryId;
    });
    this.rounds[this.roundNumber].cluesData.forEach(clue => {
      clueObject = new Clue(clue.question, clue.answer, clue.categoryId, clue.pointValue);
      this.rounds[this.roundNumber].clues.push(clueObject);
    })
  }
}

export default Game;
