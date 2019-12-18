const chai = require("chai");
const expect = chai.expect;
import Game from '../src/Clue'

describe ('Game', () => {

let game;
let roundOne;
let roundTwo;
let roundThree;
let playerOne;
let playerTwo;
let playerThree;

beforeEach(() => {
  games = new Game();
  playerOne = new Player();
  playerTwo = new Player();
  playerThree = new Player();
  roundOne = new Round();
  roundTwo = new Round();
  roundThree = new Round();

})

  it.skip('should be a function', () => {
    expect(Game).to.be.a('function');
  })

  it.skip('should be an instance of a Game', () => {
    expect(game).to.be.an.instanceof(Game);
  })

  it.skip('should be have game categories', () => {
    expect(game.gameCategories).to.eqaul({'unitedStatesHistory': 1});
  })

  it.skip('should begin round 1 when players are instantiated', () => {
    expect(game.players).to.eqaul(3);


  })

  it.skip('should hold all clues', () => {
    expect(game.allClues).to.eqaul();
  })

  it.skip('should show who the currebnt player is', () => {
    expect(game.currentPlayer).to.eqaul();
  })

  it.skip('should show how many clues are remaining', () => {
    expect(game.cluesRemaining).to.eqaul();
  })

  it.skip('', () => {
    expect(game.randomNumbers).to.eqaul();
  })
});
