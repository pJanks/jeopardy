import $ from 'jquery';
import Game from './Game.js';
import Player from './Player.js'
import Round from './Round.js'
import Clue from './Clue.js'



const domUpdates = {
  printSingleQuestion: () => {
    $('.game-board').html(`
    <div class="question-area">
      <p class="question">What Sonya Fitzpatrick is, or the Animal Planet series on which she communicates with animals telepathically</p>
      <button type="button" class="answer-button answer-a">Lone Star Law</button>
      <button type="button" class="answer-button answer-b">Pit Bulls & Parolees</button>
      <button type="button" class="answer-button answer-c">The Pet Psychic</button>
      <button type="button" class="answer-button answer-d">Tanked</button>
      <button type="button" class="answer-button answer-e">My Cat from HELL</button>
    </div>`)
  },

  displayQuestionScreen: e => {
    if ($(e.target).hasClass('number')) {
      $('.game-board').text('')
      // console.log(domUpdates.printSingleQuestion);
      domUpdates.printSingleQuestion()
    }
  },

  startGame: dataInfo => {
    const game = new Game(dataInfo.categories, dataInfo.clues);
    console.log(game);
    game.instanstiatePlayers($('.player1-input').val(), $('.player2-input').val(), $('.player3-input').val());
    $('.intro-container').addClass('hidden');
    $('.bottom').removeClass('hidden');

    $('.player-1-name').text($('.player1-input').val().toUpperCase())
    $('.player-2-name').text($('.player2-input').val().toUpperCase())
    $('.player-3-name').text($('.player3-input').val().toUpperCase())

    $('.game-board').html(`
    <div class="board a1"><p>Catagory 1</p></div>
    <div class="board a2"><p class="number">100</p></div>
    <div class="board a3"><p class="number">200</p></div>
    <div class="board a4"><p class="number">300</p></div>
    <div class="board a5"><p class="number">400</p></div>
    <div class="board b1"><p >Catagory 2</p></div>
    <div class="board b2"><p class="number">100</p></div>
    <div class="board b3"><p class="number">200</p></div>
    <div class="board b4"><p class="number">300</p></div>
    <div class="board b5"><p class="number">400</p></div>
    <div class="board c1"><p>Catagory 3</p></div>
    <div class="board c2"><p class="number">100</p></div>
    <div class="board c3"><p class="number">200</p></div>
    <div class="board c4"><p class="number">300</p></div>
    <div class="board c5"><p class="number">400</p></div>
    <div class="board d1"><p>Catagory 4</p></div>
    <div class="board d2"><p class="number">100</p></div>
    <div class="board d3"><p class="number">200</p></div>
    <div class="board d4"><p class="number">300</p></div>
    <div class="board d5"><p class="number">400</p></div>`);
  },


}

export default domUpdates;
