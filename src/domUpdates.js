import $ from 'jquery';
import Game from './Game.js';
import Player from './Player.js'
import Round from './Round.js'
import Clue from './Clue.js'
import DailyDouble from './DailyDouble.js'

let game;

const domUpdates = {

  messageFromYoda: (message) => {
    $('.game-board').after(`
      <div class='answer-validation-container'>
        <div class='lower-answer-validation-container'>
          <div class='yoda-image-container'></div>
        </div>
        <div class='answer-message-container'>
          <p class='answer-validation-message'>${message} your answer is!</p>
        </div>
      </div>`);
  },

  styleCurrentPlayer: (currentPlayer) => {
    let playerContainers = ['.player-0-index-container', '.player-1-index-container', '.player-2-index-container'];
    playerContainers.forEach(player => {
      $(`${player}`).removeClass('active-player-style');
    });
    $(`.player-${currentPlayer}-index-container`).addClass('active-player-style');
  },

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
    </div>
    `);
    domUpdates.evaluateAnswer(clueIndex);
  },

  displayDDorFJ: (isDDorFJ) => {
    $('.game-board').after(`
    <div class='dd-or-fj-container'>

      <p class='dd-or-fj-title'>${isDDorFJ}</p>

      <h4>catagory:</h4>

      <h4>Exotic French Foods</h4>

      <input class='wager-input' type='number' placeholder='enter a wager here'>
      <h4>wager may not exceed player's current score or</h4>
      <h4>highest point value on the game board</h4>
      <div type="button" class="start-game-button-container wager-button">
        <button type="button" class="start-game-sub-button">submit wager</button>
        <div class="light-saber-handle-image"></div>
      </div>
    </div>`);
  },

  evaluateAnswer: (i) => {
    $('.light-saber-container').click( (e) => {
      game.players[game.currentPlayer].answer = $(e.target).closest('.light-saber-sub-button').html();
      if (game.rounds[game.roundNumber].clues[i].checkAnswer(game.players[game.currentPlayer].answer)) {
        game.players[game.currentPlayer].updateScore(game.rounds[game.roundNumber].clues[i].pointValue);
        domUpdates.messageFromYoda('Correct,');
      } else if (!game.rounds[game.roundNumber].clues[i].checkAnswer(game.players[game.currentPlayer].answer)) {
        game.players[game.currentPlayer].updateScore((- game.rounds[game.roundNumber].clues[i].pointValue))
        domUpdates.messageFromYoda('Incorrect,');
      }

      setTimeout( () => {
        $('.answer-validation-container').remove();
        domUpdates.removeHidden();
        domUpdates.styleCurrentPlayer(game.currentPlayer);
      }, 2000);
      $('.p1-score').text(`${game.players[0].score}`)
      $('.p2-score').text(`${game.players[1].score}`)
      $('.p3-score').text(`${game.players[2].score}`)
      domUpdates.displayAnswerScreen();

      $('.question-area').remove();
    })
  },

  displayAnswerScreen: () => {
    game.cluesRemaining--;
    game.currentPlayer++;
    if (game.currentPlayer === 3) {
      game.currentPlayer = 0
    }
    else if (game.cluesRemaining === 0) {
      game.roundNumber++;
      game.cluesRemaing = 16;
      setTimeout(domUpdates.populateGameBoard(), 2000)

    }
    // setTimeout(domUpdates.removeHidden(), 5000)
  },

  removeHidden: () => {
    $('.game-board').removeClass('hidden')
  },

  displayQuestionScreen: e => {
    if ($(e.target).closest('.board')) {
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
      if (!game) {
        game = new Game(dataInfo.categories, dataInfo.clues, nums);
      }
      if (game.roundNumber === 0) {
      game.startGame();
      domUpdates.styleCurrentPlayer(game.currentPlayer);
      $('.intro-container').addClass('hidden');
      $('.bottom').removeClass('hidden');

      $('.player-1-name').text($('.player1-input').val().toUpperCase())
      $('.player-2-name').text($('.player2-input').val().toUpperCase())
      $('.player-3-name').text($('.player3-input').val().toUpperCase())
    }
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
        game.instanstiateClues();
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
