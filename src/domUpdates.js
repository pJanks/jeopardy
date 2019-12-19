import $ from 'jquery';
import Game from './Game.js';
import Player from './Player.js'
import Round from './Round.js'
import Clue from './Clue.js'
import DailyDouble from './DailyDouble.js'

let game;

const domUpdates = {
  printSingleQuestion: () => {
    $('.game-board').html(`
    <div class='question-area'>
      <p class='question'>What Sonya Fitzpatrick is, or the Animal Planet series on which she communicates with animals telepathically</p>
      <button type='button' class='answer-button answer-a'>Lone Star Law</button>
      <button type='button' class='answer-button answer-b'>Pit Bulls & Parolees</button>
      <button type='button' class='answer-button answer-c'>The Pet Psychic</button>
      <button type='button' class='answer-button answer-d'>Tanked</button>
      <button type='button' class='answer-button answer-e'>My Cat from HELL</button>
    </div>`);
  },

  displayQuestionScreen: e => {
    if ($(e.target).closest('.board')) {
      console.log(e.target);
      $('.game-board').text('');
      domUpdates.printSingleQuestion();
    }
  },

  shuffle: () => {
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let j, x, i;
    for (i = nums.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = nums[i];
        nums[i] = nums[j];
        nums[j] = x;
    }
    return nums;
  },

  populateGameBoard: dataInfo => {
    let nums = domUpdates.shuffle();
    game = new Game(dataInfo.categories, dataInfo.clues, nums);
    game.startGame();
    console.log(game);
    $('.intro-container').addClass('hidden');
    $('.bottom').removeClass('hidden');

    $('.player-1-name').text($('.player1-input').val().toUpperCase())
    $('.player-2-name').text($('.player2-input').val().toUpperCase())
    $('.player-3-name').text($('.player3-input').val().toUpperCase())

    $('.game-board').html(`
    <div class='board a1'></div>
    <div class='board a2'><p class='number'>100</p></div>
    <div class='board a3'><p class='number'>200</p></div>
    <div class='board a4'><p class='number'>300</p></div>
    <div class='board a5'><p class='number'>400</p></div>
    <div class='board b1'></div>
    <div class='board b2'><p class='number'>100</p></div>
    <div class='board b3'><p class='number'>200</p></div>
    <div class='board b4'><p class='number'>300</p></div>
    <div class='board b5'><p class='number'>400</p></div>
    <div class='board c1'></div>
    <div class='board c2'><p class='number'>100</p></div>
    <div class='board c3'><p class='number'>200</p></div>
    <div class='board c4'><p class='number'>300</p></div>
    <div class='board c5'><p class='number'>400</p></div>
    <div class='board d1'></div>
    <div class='board d2'><p class='number'>100</p></div>
    <div class='board d3'><p class='number'>200</p></div>
    <div class='board d4'><p class='number'>300</p></div>
    <div class='board d5'><p class='number'>400</p></div>`);
    domUpdates.assignRoundCategories();
  },

  assignRoundCategories: () => {
    let keys = Object.keys(game.gameCategories)
    $('.a1').text((keys[game.rounds[game.roundNumber].categories[0]]).split(/(?=[A-Z])/).join(' ').toUpperCase())
    $('.b1').text((keys[game.rounds[game.roundNumber].categories[1]]).split(/(?=[A-Z])/).join(' ').toUpperCase())
    $('.c1').text((keys[game.rounds[game.roundNumber].categories[2]]).split(/(?=[A-Z])/).join(' ').toUpperCase())
    $('.d1').text((keys[game.rounds[game.roundNumber].categories[3]]).split(/(?=[A-Z])/).join(' ').toUpperCase())
  },

}

export default domUpdates;
