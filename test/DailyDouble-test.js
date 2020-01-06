const chai = require("chai");
const expect = chai.expect;
const spies = require('chai-spies');
import DailyDouble from '../src/DailyDouble';
import Clue from '../src/Clue';
chai.use(spies);

describe ('DailyDouble', () => {

let dailyDouble;
let clue;

beforeEach(() => {
  dailyDouble = new DailyDouble(question, answer, id, pointValue, true);
  clue = new Clue('Sound a dog makes', 'bark!!!', 10, 100);

})

describe ('default properties', () => {


  it('should be a function', () => {
    expect(DailyDouble).to.be.a('function');
  })

  it('should be an instance of a Daily Double', () => {
    expect(dailyDouble).to.be.an.instanceof(DailyDouble);
  })

  describe ('spie on clue.checkAnswer method', () => {

  chai.spy.on(clue, ['checkAnswer'], () => true);

  it('should be able to evaluate a wager and check player answer', () => {
    evaluateWager(100, 'bark!!!');
    expect(dailyDouble.checkAnswer).to.equal(true);
  })

  chai.spy.on(clue, ['checkAnswer'], () => false);

  it('should be able to evaluate a wager and check player answer', () => {
    evaluateWager(100, 'ruff ruff!!!');
    expect(dailyDouble.checkAnswer).to.eqaul(false);
  })
});
});
});
