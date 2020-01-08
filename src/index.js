// import statements
import $ from 'jquery';
import './css/base.scss';
import domUpdates from './domUpdates.js';

// fetch dataset
const getData = () => {
  fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/jeopardy/data')
    .then(response => response.json())
    .then(info => {
      domUpdates.populateGameBoard(info.data);
    })
    .catch(() => {
      window.alert('There was an error.')
    })
}

// Event Listeners
$('.start-game-button').click(getData);
$('.game-board').click(domUpdates.displayQuestionScreen);
