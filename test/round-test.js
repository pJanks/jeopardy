const chai = require("chai");
const expect = chai.expect;
import Round from '../src/Round.js'
import Clue from '../src/Clue.js'

describe ('Round', () => {

let round;
let clue;

beforeEach(() => {
  clue = new Clue('Sound a dog makes', 'bark!!!', 10, 100);
  round = new Round({'unitedStatesHistory': 1}, 1);
})

describe ('default properties', () => {


  it('should be a function', () => {
    expect(Round).to.be.a('function');
  })

  it('should be an instance of a Round', () => {
    expect(round).to.be.an.instanceof(Round);
  })

  it('should have categories', () => {
    expect(round.categories).to.deep.equal({'unitedStatesHistory': 1});
  })

  it('should have clues', () => {
    round.clues.push(clue);
    expect(round.clues).to.deep.equal([clue]);
  })
});
});

