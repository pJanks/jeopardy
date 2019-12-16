const chai = require("chai");
const expect = chai.expect;
let players;

const Player = require("../src/Player");
const playerData = require("../data/users");

beforeEach(() => {
  players = new Player(playerData[0]);
})

describe ('Users', () => {

  it('should be a function', () => {
    expect(Player).to.be.a('function');
  })

  it('should be an instance of a User', () => {
    expect(players).to.be.an.instanceof(Player);
  })
});
