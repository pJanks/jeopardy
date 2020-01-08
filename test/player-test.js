const chai = require("chai");
const expect = chai.expect;
import Player from '../src/Player';
let player;

describe('Player', () => {


  beforeEach(() => {
    player = new Player('Trond', 'bark!!!', 0);
  })

  describe('default properties', () => {

    it('should be a function', () => {
      expect(Player).to.be.a('function');
    })

    it('should be an instance of a User', () => {
      expect(player).to.be.an.instanceof(Player);
    })

    it('should have a name', () => {
      expect(player.name).to.equal('Trond');
    })

    it('should be able to answer questions', () => {
      expect(player.answer).to.equal('bark!!!');
    })

    describe('update score', () => {

      it('player.score should increase by 100', () => {
        expect(player.score).to.equal(0);
        player.updateScore(100);
        expect(player.score).to.equal(100);
      })

      it('player.score should decrease score if answer is incorrect', () => {
        expect(player.score).to.equal(0);
        player.updateScore(-100);
        expect(player.score).to.equal(-100);
      })
    });
  });
});
