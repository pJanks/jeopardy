import chai from 'chai';
const expect = chai.expect;
import Clue from '../src/Clue'
import data from '../data/dataset.js'

describe('Clue', function() {

  let clue;

  beforeEach(() => {
    clue = new Clue('Sound a dog makes', 'bark!!!', 10, 100);
  });

  describe('default properties', function() {

    it('should have a question', function() {
      expect('Sound a dog makes');
    });

    it('should have an answer', function() {
      expect(clue.answer).to.equal('bark!!!');
    });

    it('should have a id', function() {
      expect(clue.id).to.equal(10);
    });

    it('should have a point value', function() {
      expect(clue.pointValue).to.equal(100);
    });


    it('should have a question', function() {
      expect(clue.question).to.equal(data.clues[0].question);
    });

    it('should have a daily double set to false by default', function() {
      expect(clue.dailyDouble).to.equal(false);
    });
  });

  describe('checkAnswer', function() {

    it('should evaluate to true if answer is correct', function() {
      expect(clue.checkAnswer('bark!!!')).to.equal(true);    });

    it('should evaluate to false if answer is not correct', function() {
       expect(clue.checkAnswer('oink')).to.equal(false);
    });

  });
});
