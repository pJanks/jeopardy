const startGame = () => {
  document.querySelector('.intro-container').classList.add('hidden');
}

// Event Listeners
document.querySelector('.start-game-button').addEventListener('click', startGame)
