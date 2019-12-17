const chai = require("chai");
const expect = chai.expect;
let clues;

const Clue = require("../src/Clue");
// const playerData = require("../data/players");

beforeEach(() => {
  clues = new Clue(gameData[0]);
})

describe ('Clues', () => {

  it('should be a function', () => {
    expect(Clue).to.be.a('function');
  })

  it('should be an instance of a User', () => {
    expect(clues).to.be.an.instanceof(Clue);
  })
});
