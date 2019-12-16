import $ from 'jquery'

const printSingleQuestion = () => {
  $('.game-board').html(`
  <div class="question-area">
    <p class="question">What Sonya Fitzpatrick is, or the Animal Planet series on which she communicates with animals telepathically</p>
    <button type="button" class="answer-button answer-a">Lone Star Law</button>
    <button type="button" class="answer-button answer-b">Pit Bulls & Parolees</button>
    <button type="button" class="answer-button answer-c">The Pet Psychic</button>
    <button type="button" class="answer-button answer-d">Tanked</button>
    <button type="button" class="answer-button answer-e">My Cat from HELL</button>
  </div>`);
}

const startGame = () => {
  $('.intro-container').addClass('hidden');
  $('.bottom').removeClass('hidden');
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
}

const displayQuestionScreen = e => {
  if ($(e.target).hasClass('number')) {
    $('.game-board').text('')
    printSingleQuestion();
  }
}

// Event Listeners
$('.start-game-button').click(startGame)
$('.game-board').click(displayQuestionScreen)
