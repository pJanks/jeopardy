import Clue from './Clue.js'
class DailyDouble extends Clue {
  constructor(question, answer, id, pointValue) {
    super(question, answer, id, pointValue, true)
  }

  evaluateWager(wager, playerAnswer) {
    if (this.checkAnswer(playerAnswer)) {
      return true
    } else if (!this.checkAnswer(playerAnswer)) {
      return false
    }
  }
}


export default DailyDouble;
