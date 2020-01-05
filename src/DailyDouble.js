import Clue from './Clue.js'
import Game from './Game.js'
class DailyDouble extends Clue {
  constructor(question, answer, id, pointValue) {
    super(question, answer, id, pointValue, true)
  }

  evaluateWager(wager, playerAnswer) {
    console.log(this.checkAnswer(playerAnswer));
    if (this.checkAnswer(playerAnswer)) {
      return true
    } else if (!this.checkAnswer(playerAnswer)) {
      return false
    }
  }
}


export default DailyDouble;
