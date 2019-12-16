const chai = require("chai");
const expect = chai.expect;
let rounds;

const Round = require("../Round");
// const roundData = require("../data/users");

beforeEach(() => {
  rounds = new Round();
})

describe ('Users', () => {

  it('should be a function', () => {
    expect(Round).to.be.a('function');
  })

  it('should be an instance of a User', () => {
    expect(rounds).to.be.an.instanceof(Round);
  })
});
