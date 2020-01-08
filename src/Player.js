class Player {
  constructor(name, answer) {
    this.name = name;
    this.answer = answer;
    this.score = 0;
  }

  updateScore(value) {
    this.score += value;
  }
}

export default Player;
