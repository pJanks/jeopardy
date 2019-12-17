const chai = require("chai");
const expect = chai.expect;
let games;

const Game = require("../src/Game");
// const playerData = require("../data/players");

beforeEach(() => {
  games = new Game(gameData[0]);
})

describe ('Game', () => {

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  })

  it('should be an instance of a User', () => {
    expect(games).to.be.an.instanceof(Game);
  })
});
