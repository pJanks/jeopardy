// Do not delete or rename this file ********

// import statements
import $ from 'jquery';
import './css/base.scss';
import domUpdates from './domUpdates.js';
import Game from './Game.js';
import Player from './Player.js'
import Round from './Round.js'
import Clue from './Clue.js'

// fetch dataset
const getData = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/jeopardy/data')
  .then(response => response.json())
  .then(info => {
    domUpdates.populateGameBoard(info.data);
  })
  .catch( () => {
    window.alert('There was an error.')
  })
}

// Event Listeners
$('.start-game-button').click(getData);
$('.game-board').click(domUpdates.displayQuestionScreen);
