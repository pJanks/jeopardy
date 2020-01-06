const chai = require("chai");
const expect = chai.expect;
import Clue from '../src/Clue';

describe ('Clue', () => {

let clue;

beforeEach(() => {
  clue = new Clue('Sound a dog makes', 'bark!!!', 10, 100);
})

describe ('default properties', () => {


  it('should be a function', () => {
    expect(Clue).to.be.a('function');
  })

  it('should be an instance of a clue', () => {
    expect(clue).to.be.an.instanceof(Clue);
  })

  it('should have a question', () => {
    expect(clue.question).to.equal('Sound a dog makes');
  })

  it('should have a correct answer', () => {
    expect(clue.answer).to.equal('bark!!!');
  })

  it('should have a unique id', () => {
    expect(clue.id).to.equal(10);
  })

  it('should have a point value', () => {
    expect(clue.pointValue).to.equal(100);
  })

  it('should be able to check to if the players answer is correct', () => {
    checkAnswer();
    expect().to.equal();
  })
});
});
