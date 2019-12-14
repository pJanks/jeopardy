class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  updateScore(value) {
    this.score += value;
  }
}
