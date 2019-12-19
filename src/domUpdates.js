import $ from 'jquery';
import Game from './Game.js';
import Player from './Player.js'
import Round from './Round.js'
import Clue from './Clue.js'
import DailyDouble from './DailyDouble.js'

let game;

const domUpdates = {
  printSingleQuestion: (specificCard) => {
    let clueIndex = parseInt($(specificCard).attr('id'));
    $('.game-board').html(`
    <div class='question-area'>
      <p class='question'>${game.rounds[game.roundNumber].clues[clueIndex].question}</p>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">Lone Star Law</button>
        <div class="light-saber-handle-image"></div>
      </div>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">Pit Bulls & Parolees</button>
        <div class="light-saber-handle-image"></div>
      </div>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">The Pet Psychic</button>
        <div class="light-saber-handle-image"></div>
      </div>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">Tanked</button>
        <div class="light-saber-handle-image"></div>
      </div>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">My Cat from HELL</button>
        <div class="light-saber-handle-image"></div>
      </div>
    </div>`);
  },

  displayQuestionScreen: e => {
    if ($(e.target).closest('.board')) {
      console.log(e.target);
      $('.game-board').text('');
      domUpdates.printSingleQuestion(e.target);
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
    <div class='board' a2 id='0'><p class='number' id='0'>100</p></div>
    <div class='board a3' id='1'><p class='number' id='1'>200</p></div>
    <div class='board a4' id='2'><p class='number' id='2'>300</p></div>
    <div class='board a5' id='3'><p class='number' id='3'>400</p></div>
    <div class='board b1'></div>
    <div class='board b2' id='4'><p class='number' id='4'>100</p></div>
    <div class='board b3' id='5'><p class='number' id='5'>200</p></div>
    <div class='board b4' id='6'><p class='number' id='6'>300</p></div>
    <div class='board b5' id='7'><p class='number' id='7'>400</p></div>
    <div class='board c1'></div>
    <div class='board c2' id='8'><p class='number' id='8'>100</p></div>
    <div class='board c3' id='9'><p class='number' id='9'>200</p></div>
    <div class='board c4' id='10'><p class='number' id='10'>300</p></div>
    <div class='board c5' id='11'><p class='number' id='11'>400</p></div>
    <div class='board d1'></div>
    <div class='board d2' id='12'><p class='number' id='12'>100</p></div>
    <div class='board d3' id='13'><p class='number' id='13'>200</p></div>
    <div class='board d4' id='14'><p class='number' id='14'>300</p></div>
    <div class='board d5' id='15'><p class='number' id='15'>400</p></div>`);
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
