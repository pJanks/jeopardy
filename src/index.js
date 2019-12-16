// Do not delete or rename this file ********

// import statements
import $ from 'jquery';
import './css/base.scss';
import './main.js';
import domUpdates from './domUpdates.js';

// fetch dataset
const getData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/jeopardy/data')
  .then(response => response.json())
  .then(info => {
    domUpdates.startGame(info.data);
  })
}

// Event Listeners
$('.start-game-button').click(getData);
$('.game-board').click(domUpdates.displayQuestionScreen);
