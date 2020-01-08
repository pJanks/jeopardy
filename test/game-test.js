const chai = require("chai");
const expect = chai.expect;
import Game from '../src/Game';
import Clue from '../src/Clue';
import Player from '../src/Player';
import Round from '../src/Round';

describe('Game', () => {
  let clue;
  let game;
  let roundOne;
  let roundTwo;
  let roundThree;
  let playerOne;
  let playerTwo;
  let playerThree;

  beforeEach(() => {
    clue = new Clue('Sound a dog makes', 'bark!!!', 10, 100);
    game = new Game({
      'unitedStatesHistory': 1
    }, clue, [2, 5, 3, 6]);
    playerOne = new Player('Trond');
    playerTwo = new Player('Zack');
    playerThree = new Player('Johnny');
    roundOne = new Round({
      'unitedStatesHistory': 1
    });
    roundTwo = new Round({
      'lifeSciences': 2
    });
    roundThree = new Round({
      'publicHealth': 0
    });
  })

  describe('default properties', () => {

    it('should be a function', () => {
      expect(Game).to.be.a('function');
    })

    it('should be an instance of a Game', () => {
      expect(game).to.be.an.instanceof(Game);
    })

    it('should have game categories', () => {
      expect(game.gameCategories).to.deep.equal({
        'unitedStatesHistory': 1
      });
    })

    it('should start off at round 1', () => {
      expect(game.roundNumber).to.equal(1);
    })

    it('should have three players when game starts', () => {
      expect(game.players.length).to.equal(0);
      game.instanstiatePlayers(playerOne, playerTwo, playerThree);
      expect(game.players.length).to.equal(3);
    })

    it('should hold three rounds at start of game', () => {
      expect(game.rounds.length).to.equal(0);
      game.rounds.push(roundOne, roundTwo, roundThree);
      expect(game.rounds.length).to.equal(3);
    })

    it('should be able to hold clues', () => {
      expect(game.allClues.answer).to.equal('bark!!!');
    })

    it('should start at player index 0', () => {
      expect(game.currentPlayer).to.equal(0);
    })

    it('should start with 16 clues remaining', () => {
      expect(game.cluesRemaining).to.equal(16);
    })

    it('should start with an array of random numbers', () => {
      expect(game.randomNumbers).to.deep.equal([2, 5, 3, 6]);
    })

  });

});
