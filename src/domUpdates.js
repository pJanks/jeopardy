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
    $('.game-board').addClass('hidden');
    $(`#${clueIndex}`).text('');
    $(`#${clueIndex}`).disabled = true;
    game.shuffleClues();
    $('.game-board').after(`
    <div class='question-area'>
      <p class='question'>${game.rounds[game.roundNumber].clues[clueIndex].question}</p>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">${game.allClues[0].answer}</button>
        <div class="light-saber-handle-image"></div>
      </div>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">${game.allClues[10].answer}</button>
        <div class="light-saber-handle-image"></div>
      </div>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">${game.allClues[20].answer}</button>
        <div class="light-saber-handle-image"></div>
      </div>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">${game.rounds[game.roundNumber].clues[clueIndex].answer}</button>
        <div class="light-saber-handle-image"></div>
      </div>
      <div type="button" class="light-saber-container">
        <button type="button" class="light-saber-sub-button">${game.allClues[30].answer}</button>
        <div class="light-saber-handle-image"></div>
      </div>
    </div>`);
    $('.light-saber-container').click( () => {
      $('.game-board').removeClass('hidden');
      $('.question-area').addClass('hidden');
    })
  },

  displayQuestionScreen: e => {
    if ($(e.target).closest('.board')) {
      console.log(e.target);
      // $('.game-board').text('');
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
    <button class='board a2' disabled='false' id='0' tabindex='0'><p class='number' id='0'>100</p></button>
    <button class='board a3' disabled='false' id='1' tabindex='0'><p class='number' id='1'>200</p></button>
    <button class='board a4' disabled='false' id='2' tabindex='0'><p class='number' id='2'>300</p></button>
    <button class='board a5' disabled='false' id='3' tabindex='0'><p class='number' id='3'>400</p></button>
    <div class='board b1'></div>
    <button class='board b2' disabled='false' id='4' tabindex='0'><p class='number' id='4'>100</p></button>
    <button class='board b3' disabled='false' id='5' tabindex='0'><p class='number' id='5'>200</p></button>
    <button class='board b4' disabled='false' id='6' tabindex='0'><p class='number' id='6'>300</p></button>
    <button class='board b5' disabled='false' id='7' tabindex='0'><p class='number' id='7'>400</p></button>
    <div class='board c1'></div>
    <button class='board c2' disabled='false' id='8' tabindex='0'><p class='number' id='8'>100</p></button>
    <button class='board c3' disabled='false' id='9' tabindex='0'><p class='number' id='9'>200</p></button>
    <button class='board c4' disabled='false' id='10' tabindex='0'><p class='number' id='10'>300</p></button>
    <button class='board c5' disabled='false' id='11' tabindex='0'><p class='number' id='11'>400</p></button>
    <div class='board d1'></div>
    <button class='board d2' disabled='false' id='12' tabindex='0'><p class='number' id='12'>100</p></button>
    <button class='board d3' disabled='false' id='13' tabindex='0'><p class='number' id='13'>200</p></button>
    <button class='board d4' disabled='false' id='14' tabindex='0'><p class='number' id='14'>300</p></button>
    <button class='board d5' disabled='false' id='15' tabindex='0'><p class='number' id='15'>400</p></button>`);
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
