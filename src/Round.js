class Round {
  constructor(categories, dailyDoubleCount) {
    this.categories = categories;
    this.cluesData = [];
    this.clues = []
    this.dailyDoubleCount = dailyDoubleCount;
  }

  assignDailyDouble() {
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let j, x, i;
    for (i = nums.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = nums[i];
      nums[i] = nums[j];
      nums[j] = x;
    }
    return nums;

  }
}

export default Round;
