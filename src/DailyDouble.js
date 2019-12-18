import Clue from './Clue.js'
class DailyDouble extends Clue {
  constructor(question, pointValue, answer, id) {
    super(question, pointValue, answer, id, true)
  }
}


export default DailyDouble;
