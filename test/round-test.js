const chai = require("chai");
const expect = chai.expect;
import data from '../src/Round.js'
let rounds;

// const roundData = require("../data/users");

beforeEach(() => {
  rounds = new Round();
})

describe ('Round', () => {

  it('should be a function', () => {
    expect(Round).to.be.a('function');
  })

  it('should be an instance of a User', () => {
    expect(rounds).to.be.an.instanceof(Round);
  })
});
