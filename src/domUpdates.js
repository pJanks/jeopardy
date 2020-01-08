import $ from 'jquery';
import Game from './Game.js';
import DailyDouble from './DailyDouble.js'

let game, possibleAnswers, clueIndex, keys;
const domUpdates = {

  messageFromYoda: (message) => {
    $('.game-board').after(`
      <div class='answer-validation-container'>
        <div class='lower-answer-validation-container'>
          <div class='yoda-image-container'></div>
        </div>
        <div class='answer-message-container'>
          <p class='answer-validation-message'>${message}!</p>
        </div>
      </div>`);
  },

  styleCurrentPlayer: (currentPlayer) => {
    let playerContainers = ['.player-0-index-container',
      '.player-1-index-container', '.player-2-index-container'
    ];
    playerContainers.forEach(player => {
      $(`${player}`).removeClass('active-player-style');
    });
    $(`.player-${currentPlayer}-index-container`)
      .addClass('active-player-style');
  },

  randomizeAnswers: (answers) => {
    let j, x, i;
    for (i = answers.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = answers[i];
      answers[i] = answers[j];
      answers[j] = x;
    }
    return answers;
  },

  printSingleQuestion: (clueIndex) => {
    if (!game.rounds[game.roundNumber].clues[clueIndex].dailyDouble) {
      $('.game-board').addClass('hidden');
      $(`#${clueIndex}`).text('');
      $(`#${clueIndex}`).disabled = true;
      game.shuffleClues();
      possibleAnswers = [`${game.allClues[0].answer}`,
        `${game.allClues[1].answer}`, `${game.allClues[2].answer}`,
        `${game.rounds[game.roundNumber].clues[clueIndex].answer}`
      ];
      domUpdates.randomizeAnswers(possibleAnswers);
      $('.game-board').after(`
        <div class='question-area'>
        <p class='question'>${(game.rounds[game.roundNumber]
          .clues[clueIndex].question).toLowerCase()}</p>
          <div type="button" class="light-saber-container">
          <button type="button" class="light-saber-sub-button">
          ${(possibleAnswers[0]).toLowerCase()}</button>
          <div class="light-saber-handle-image"></div>
          </div>
          <div type="button" class="light-saber-container">
          <button type="button" class="light-saber-sub-button">
          ${(possibleAnswers[1]).toLowerCase()}</button>
          <div class="light-saber-handle-image"></div>
          </div>
          <div type="button" class="light-saber-container">
          <button type="button" class="light-saber-sub-button">
          ${(possibleAnswers[2]).toLowerCase()}</button>
          <div class="light-saber-handle-image"></div>
          </div>
          <div type="button" class="light-saber-container">
          <button type="button" class="light-saber-sub-button">
          ${(possibleAnswers[3]).toLowerCase()}</button>
          <div class="light-saber-handle-image"></div>
          </div>
        </div>
          `);
      domUpdates.evaluateAnswer(clueIndex);
    } else {
      $(`#${clueIndex}`).text('');
      $(`#${clueIndex}`).disabled = true;
      domUpdates.displayDDorFJ('Daily Double', clueIndex);
    }

  },


  displayDDorFJ: (isDDorFJ, clueIndex) => {
    let categoryIndex = game.rounds[game.roundNumber].clues[clueIndex].id
    $('.game-board').addClass('hidden');
    $('.game-board').after(`
      <div class='dd-or-fj-container'>
      <p class='dd-or-fj-title'>${isDDorFJ}</p>
      <h4>catagory:</h4>
      <h4>${keys[(categoryIndex - 1)].split(/(?=[A-Z])/).join(' ').toLowerCase()}</h4>
      <input class='wager-input' type='number' placeholder='enter a wager here'>
      <h4>wager may not exceed player's current score or</h4>
      <h4>highest point value on the game board</h4>
      <div type="button" class="start-game-button-container wager-button">
      <button type="button" class="start-game-sub-button">submit wager</button>
      <div class="light-saber-handle-image"></div>
      </div>
      </div>`);
    if (isDDorFJ === 'Daily Double') {
      $('.wager-button').click(() => {
        let wager;
        if (game.roundNumber < 1 && game.players[game.currentPlayer].score <= 400 && 5 <= parseInt($('.wager-input').val()) && parseInt($('.wager-input').val()) <= 400) {
          wager = parseInt($('.wager-input').val());
        } else if (game.roundNumber < 1 && game.players[game.currentPlayer].score > 400 && parseInt($('.wager-input').val()) <= game.players[game.currentPlayer].score) {
          wager = parseInt($('.wager-input').val());
        } else if (game.roundNumber === 1 && game.players[game.currentPlayer].score <= 800 && 5 <= parseInt($('.wager-input').val()) && parseInt($('.wager-input').val()) <= 800) {
          wager = parseInt($('.wager-input').val());
        } else if (game.roundNumber === 1 && game.players[game.currentPlayer].score > 800 && parseInt($('.wager-input').val()) <= game.players[game.currentPlayer].score) {
          wager = parseInt($('.wager-input').val());
        } else {
          window.alert('You must enter a valid wager')
          return
        }
        $('.dd-or-fj-container').remove();
        $(`#${clueIndex}`).text('');
        $(`#${clueIndex}`).disabled = true;
        game.shuffleClues();
        possibleAnswers = [`${game.allClues[0].answer}`,
          `${game.allClues[1].answer}`, `${game.allClues[2].answer}`,
          `${game.rounds[game.roundNumber].clues[clueIndex].answer}`
        ];
        domUpdates.randomizeAnswers(possibleAnswers);
        $('.game-board').after(`
          <div class='question-area'>
          <p class='question'>${(game.rounds[game.roundNumber]
            .clues[clueIndex].question).toLowerCase()}</p>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[0]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[1]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[2]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[3]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            </div>
            `);
        $('.light-saber-container').click((e) => {
          game.players[game.currentPlayer].answer = $(e.target)
            .closest('.light-saber-container').text().toLowerCase().trim();
          if (game.rounds[game.roundNumber].clues[clueIndex]
            .evaluateWager(wager, game.players[game.currentPlayer].answer)) {
            domUpdates.messageFromYoda('Correct, your answer is')
            game.players[game.currentPlayer].updateScore(wager)
          } else if (!game.rounds[game.roundNumber].clues[clueIndex]
            .evaluateWager(wager, game.players[game.currentPlayer].answer)) {
            domUpdates.messageFromYoda('Incorrect, your answer is')
            game.players[game.currentPlayer].updateScore(-wager)
          }
          domUpdates.updateScore();
          $('.question-area').remove();
        });
      })
    } else if (game.currentPlayer < 1 && isDDorFJ === 'Final Jeopardy') {
      $('.game-board').css({ 'display' : 'none'})
      $('.game-board').html('')
      if (game.roundNumber === 2 && game.players[game.currentPlayer].score <= 0) {
        $('.question-area').remove();
        $('.dd-or-fj-container').remove();
       window.alert('You don\'t have enough to play Final Jeopardy');
       game.currentPlayer++;
       domUpdates.displayDDorFJ('Final Jeopardy', 1)
     }
      $('.wager-button').click(() => {
        let wager;
        if (game.roundNumber === 2 && game.players[game.currentPlayer].score > 0 && 5 <= parseInt($('.wager-input').val()) && parseInt($('.wager-input').val()) <= game.players[game.currentPlayer].score) {
          wager = parseInt($('.wager-input').val());
        } else {
          window.alert('You must enter a valid wager')
          return
        }
        $('.dd-or-fj-container').remove();
        game.shuffleClues();
        possibleAnswers = [`${game.allClues[0].answer}`,
          `${game.allClues[1].answer}`, `${game.allClues[2].answer}`,
          `${game.rounds[game.roundNumber].clues[clueIndex].answer}`
        ];
        domUpdates.randomizeAnswers(possibleAnswers);
        $('.game-board').after(`
          <div class='question-area'>
          <p class='question'>${(game.rounds[game.roundNumber]
            .clues[clueIndex].question).toLowerCase()}</p>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[0]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[1]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[2]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[3]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            </div>
            `);
        $('.light-saber-container').click((e) => {
          game.players[game.currentPlayer].answer = $(e.target)
            .closest('.light-saber-container').text().toLowerCase().trim();
          if (game.rounds[game.roundNumber].clues[clueIndex]
            .evaluateWager(wager, game.players[game.currentPlayer].answer)) {
            domUpdates.messageFromYoda('Correct, your answer is')
            game.players[game.currentPlayer].updateScore(wager)
          } else if (!game.rounds[game.roundNumber].clues[clueIndex]
            .evaluateWager(wager, game.players[game.currentPlayer].answer)) {
            domUpdates.messageFromYoda('Incorrect, your answer is')
            game.players[game.currentPlayer].updateScore(-wager)
          }
          domUpdates.updateScore();
          game.roundNumber = 2;
          $('.question-area').remove();
          domUpdates.displayDDorFJ('Final Jeopardy', 1)
        });
      })
    }  else if (game.currentPlayer === 1 && isDDorFJ === 'Final Jeopardy') {
      if (game.roundNumber === 2 && game.players[game.currentPlayer].score <= 0) {
        $('.question-area').remove();
        $('.dd-or-fj-container').remove();
       window.alert('You don\'t have enough to play Final Jeopardy');
       game.currentPlayer++
       domUpdates.displayDDorFJ('Final Jeopardy', 2)
     }
      $('.wager-button').click(() => {
        let wager;
        if (game.roundNumber === 2 && game.players[game.currentPlayer].score > 0 && 5 <= parseInt($('.wager-input').val()) && parseInt($('.wager-input').val()) <= game.players[game.currentPlayer].score) {
          wager = parseInt($('.wager-input').val());
        } else {
          window.alert('You must enter a valid wager')
          return
        }
        $('.dd-or-fj-container').remove();
        game.shuffleClues();
        possibleAnswers = [`${game.allClues[0].answer}`,
          `${game.allClues[1].answer}`, `${game.allClues[2].answer}`,
          `${game.rounds[game.roundNumber].clues[clueIndex].answer}`
        ];
        domUpdates.randomizeAnswers(possibleAnswers);
        $('.game-board').after(`
          <div class='question-area'>
          <p class='question'>${(game.rounds[game.roundNumber]
            .clues[clueIndex].question).toLowerCase()}</p>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[0]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[1]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[2]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[3]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            </div>
            `);
        $('.light-saber-container').click((e) => {
          game.players[game.currentPlayer].answer = $(e.target)
            .closest('.light-saber-container').text().toLowerCase().trim();
          if (game.rounds[game.roundNumber].clues[clueIndex]
            .evaluateWager(wager, game.players[game.currentPlayer].answer)) {
            domUpdates.messageFromYoda('Correct, your answer is')
            game.players[game.currentPlayer].updateScore(wager)
          } else if (!game.rounds[game.roundNumber].clues[clueIndex]
            .evaluateWager(wager, game.players[game.currentPlayer].answer)) {
            domUpdates.messageFromYoda('Incorrect, your answer is')
            game.players[game.currentPlayer].updateScore(-wager)
          }
          domUpdates.updateScore();
          $('.question-area').remove();
          domUpdates.displayDDorFJ('Final Jeopardy', 2)
        });
      })
    } else if (game.currentPlayer === 2 && isDDorFJ === 'Final Jeopardy') {
      if (game.roundNumber === 2 && game.players[game.currentPlayer].score <= 0) {
        $('.question-area').remove();
        $('.dd-or-fj-container').remove();
        domUpdates.displayWinner();
       window.alert('You don\'t have enough to play Final Jeopardy');
     }
      $('.wager-button').click(() => {
        let wager;
        if (game.roundNumber === 2 && game.players[game.currentPlayer].score > 0 && 5 <= parseInt($('.wager-input').val()) && parseInt($('.wager-input').val()) <= game.players[game.currentPlayer].score) {
          wager = parseInt($('.wager-input').val());
        } else {
          window.alert('You must enter a valid wager')
          return
        }
        $('.dd-or-fj-container').remove();
        game.shuffleClues();
        possibleAnswers = [`${game.allClues[0].answer}`,
          `${game.allClues[1].answer}`, `${game.allClues[2].answer}`,
          `${game.rounds[game.roundNumber].clues[clueIndex].answer}`
        ];
        domUpdates.randomizeAnswers(possibleAnswers);
        $('.game-board').after(`
          <div class='question-area'>
          <p class='question'>${(game.rounds[game.roundNumber]
            .clues[clueIndex].question).toLowerCase()}</p>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[0]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[1]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[2]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            <div type="button" class="light-saber-container">
            <button type="button" class="light-saber-sub-button">
            ${(possibleAnswers[3]).toLowerCase()}</button>
            <div class="light-saber-handle-image"></div>
            </div>
            </div>
            `);
        $('.light-saber-container').click((e) => {
          game.players[game.currentPlayer].answer = $(e.target)
            .closest('.light-saber-container').text().toLowerCase().trim();
          if (game.rounds[game.roundNumber].clues[clueIndex]
            .evaluateWager(wager, game.players[game.currentPlayer].answer)) {
            domUpdates.messageFromYoda('Correct, your answer is')
            game.players[game.currentPlayer].updateScore(wager)
          } else if (!game.rounds[game.roundNumber].clues[clueIndex]
            .evaluateWager(wager, game.players[game.currentPlayer].answer)) {
            domUpdates.messageFromYoda('Incorrect, your answer is')
            game.players[game.currentPlayer].updateScore(-wager)
          }
          domUpdates.displayWinner();
          domUpdates.updateScore();
          $('.question-area').remove();
          console.log('hi');
        });
      })
    }
  },

  evaluateAnswer: (i) => {
    $('.light-saber-container').click((e) => {
      game.players[game.currentPlayer].answer = $(e.target)
        .closest('.light-saber-container').text().toLowerCase().trim();
      if (game.rounds[game.roundNumber].clues[i]
        .checkAnswer(game.players[game.currentPlayer].answer)) {
        game.players[game.currentPlayer]
          .updateScore(game.rounds[game.roundNumber].clues[i].pointValue);
        domUpdates.messageFromYoda('Correct, your answer is');
      } else if (!game.rounds[game.roundNumber].clues[i]
        .checkAnswer(game.players[game.currentPlayer].answer)) {
        game.players[game.currentPlayer]
          .updateScore((-game.rounds[game.roundNumber].clues[i].pointValue))
        domUpdates.messageFromYoda('Incorrect, your answer is');
      }
      domUpdates.updateScore();
      $('.question-area').remove();
    })
  },

  updateScore: () => {
    if (game.roundNumber >= 2 && game.currentPlayer === 2) {
      setTimeout(() => {
        $('.answer-validation-container').remove();
        domUpdates.styleCurrentPlayer(game.currentPlayer);
      }, 1500);
      $('.p1-score').text(`${game.players[0].score}`)
      $('.p2-score').text(`${game.players[1].score}`)
      $('.p3-score').text(`${game.players[2].score}`)
      domUpdates.displayWinner();
    } else if (game.roundNumber >= 2 && game.currentPlayer !== 2){
      setTimeout(() => {
        $('.answer-validation-container').remove();
        domUpdates.styleCurrentPlayer(game.currentPlayer);
      }, 1500);
      $('.p1-score').text(`${game.players[0].score}`)
      $('.p2-score').text(`${game.players[1].score}`)
      $('.p3-score').text(`${game.players[2].score}`)
      domUpdates.displayAnswerScreen();

    } else {
      setTimeout(() => {
        $('.answer-validation-container').remove();
        domUpdates.removeHidden();
        domUpdates.styleCurrentPlayer(game.currentPlayer);
      }, 1500);
      $('.p1-score').text(`${game.players[0].score}`)
      $('.p2-score').text(`${game.players[1].score}`)
      $('.p3-score').text(`${game.players[2].score}`)
      domUpdates.displayAnswerScreen();
    }
  },

  displayAnswerScreen: () => {
    game.cluesRemaining--;
    game.currentPlayer++;
    if (game.currentPlayer === 3) {
      game.currentPlayer = 0
    } else if (game.cluesRemaining === 0) {
      game.roundNumber++;
      game.cluesRemaining = 16;
      setTimeout(domUpdates.populateGameBoard(), 1500)
    }
  },

  removeHidden: () => {
    $('.game-board').removeClass('hidden')
  },

  displayQuestionScreen: e => {
    if ($(e.target).closest('.board')) {
      domUpdates.printSingleQuestion(parseInt($(e.target).attr('id')));
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
    console.log(game);
    if (game.roundNumber === 0) {
      game.startGame();
      domUpdates.styleCurrentPlayer(game.currentPlayer);
      $('.intro-container').addClass('hidden');
      $('.bottom').removeClass('hidden');
      $('.player-1-name').text($('.player1-input').val().toUpperCase())
      $('.player-2-name').text($('.player2-input').val().toUpperCase())
      $('.player-3-name').text($('.player3-input').val().toUpperCase())
      let dailyDoubleIndex = game.rounds[game.roundNumber].assignDailyDouble();
      game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]] = new DailyDouble(game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]].question, game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]].answer, game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]].id, game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]].pointValue)
    } else if (game.roundNumber === 1) {
      game.instanstiateClues();
      game.rounds[game.roundNumber].clues.forEach(clue => {
        clue.pointValue *= 2;
      });
      let dailyDoubleIndex = game.rounds[game.roundNumber].assignDailyDouble();
      game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]] = new DailyDouble(game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]].question, game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]].answer, game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]].id, game.rounds[game.roundNumber].clues[dailyDoubleIndex[0]].pointValue)
      game.rounds[game.roundNumber].clues[dailyDoubleIndex[1]] = new DailyDouble(game.rounds[game.roundNumber].clues[dailyDoubleIndex[1]].question, game.rounds[game.roundNumber].clues[dailyDoubleIndex[1]].answer, game.rounds[game.roundNumber].clues[dailyDoubleIndex[1]].id, game.rounds[game.roundNumber].clues[dailyDoubleIndex[1]].pointValue)
    } else if (game.roundNumber === 2) {
      game.instanstiateClues();
      game.currentPlayer = 0;
      game.cluesRemaining = 3;
      domUpdates.displayDDorFJ('Final Jeopardy', 0);
      return
    }
    $('.game-board').html(`
        <div class='board a1'></div>
        <button class='board a2' disabled='false' id='0' tabindex='0'><p class='number' id='0'>${game.rounds[game.roundNumber].clues[0].pointValue}</p></button>
        <button class='board a3' disabled='false' id='1' tabindex='0'><p class='number' id='1'>${game.rounds[game.roundNumber].clues[1].pointValue}</p></button>
        <button class='board a4' disabled='false' id='2' tabindex='0'><p class='number' id='2'>${game.rounds[game.roundNumber].clues[2].pointValue}</p></button>
        <button class='board a5' disabled='false' id='3' tabindex='0'><p class='number' id='3'>${game.rounds[game.roundNumber].clues[3].pointValue}</p></button>
        <div class='board b1'></div>
        <button class='board b2' disabled='false' id='4' tabindex='0'><p class='number' id='4'>${game.rounds[game.roundNumber].clues[4].pointValue}</p></button>
        <button class='board b3' disabled='false' id='5' tabindex='0'><p class='number' id='5'>${game.rounds[game.roundNumber].clues[5].pointValue}</p></button>
        <button class='board b4' disabled='false' id='6' tabindex='0'><p class='number' id='6'>${game.rounds[game.roundNumber].clues[6].pointValue}</p></button>
        <button class='board b5' disabled='false' id='7' tabindex='0'><p class='number' id='7'>${game.rounds[game.roundNumber].clues[7].pointValue}</p></button>
        <div class='board c1'></div>
        <button class='board c2' disabled='false' id='8' tabindex='0'><p class='number' id='8'>${game.rounds[game.roundNumber].clues[8].pointValue}</p></button>
        <button class='board c3' disabled='false' id='9' tabindex='0'><p class='number' id='9'>${game.rounds[game.roundNumber].clues[9].pointValue}</p></button>
        <button class='board c4' disabled='false' id='10' tabindex='0'><p class='number' id='10'>${game.rounds[game.roundNumber].clues[10].pointValue}</p></button>
        <button class='board c5' disabled='false' id='11' tabindex='0'><p class='number' id='11'>${game.rounds[game.roundNumber].clues[11].pointValue}</p></button>
        <div class='board d1'></div>
        <button class='board d2' disabled='false' id='12' tabindex='0'><p class='number' id='12'>${game.rounds[game.roundNumber].clues[12].pointValue}</p></button>
        <button class='board d3' disabled='false' id='13' tabindex='0'><p class='number' id='13'>${game.rounds[game.roundNumber].clues[13].pointValue}</p></button>
        <button class='board d4' disabled='false' id='14' tabindex='0'><p class='number' id='14'>${game.rounds[game.roundNumber].clues[14].pointValue}</p></button>
        <button class='board d5' disabled='false' id='15' tabindex='0'><p class='number' id='15'>${game.rounds[game.roundNumber].clues[15].pointValue}</p></button>`);
    domUpdates.assignRoundCategories();
  },

  displayWinner: () => {
    let winner;
    if (game.players[0].score > game.players[1].score && game.players[0].score > game.players[2].score) {
      winner = 'Player 1'
    } else if (game.players[1].score > game.players[0].score && game.players[1].score > game.players[2].score) {
      winner = 'Player 2'
    } else {
      winner = 'Player 3'
    }
    $('.game-board').css({ 'display' : 'flex' })
    $('.winner-message-area').html(`<h1 class='winning-message'>${winner} wins!</h1>`);
    $('dd-or-fj-container').remove()
  },

  validateUserNames: () => {
    if (!$('.player1-input').val() &&
      !$('.player2-input').val() &&
      !$('.player3-input').val()) {
      window.alert('Enter three player names, you must!  -Yoda')
      return false;
    } else {
      return true;
    }
  },

  assignRoundCategories: () => {
    keys = Object.keys(game.gameCategories)
    $('.a1').text((keys[game.rounds[game.roundNumber].categories[0]])
      .split(/(?=[A-Z])/).join(' ').toUpperCase())
    $('.b1').text((keys[game.rounds[game.roundNumber].categories[1]])
      .split(/(?=[A-Z])/).join(' ').toUpperCase())
    $('.c1').text((keys[game.rounds[game.roundNumber].categories[2]])
      .split(/(?=[A-Z])/).join(' ').toUpperCase())
    $('.d1').text((keys[game.rounds[game.roundNumber].categories[3]])
      .split(/(?=[A-Z])/).join(' ').toUpperCase())
  },
}

export default domUpdates;
