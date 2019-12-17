const chai = require("chai");
const expect = chai.expect;
let games;

const Game = require("../src/Game");
// const playerData = require("../data/players");

beforeEach(() => {
  games = new Game(gameData[0]);
})

describe ('Game', () => {

  it.skip('should be a function', () => {
    expect(Game).to.be.a('function');
  })

  it.skip('should be an instance of a Game', () => {
    expect(games).to.be.an.instanceof(Game);
  })

  it.skip('should be have game categories', () => {
    expect(game.gameCategories).to.eqaul(categoriesData[0].gameCategories);
  })

  it.skip('should begin round 1 when players are instantiated', () => {
    expect(game.gameCategories).to.eqaul(categoriesData[0].gameCategories);
  })

});
