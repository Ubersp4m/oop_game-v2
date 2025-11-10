/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let startButton = document.getElementById('btn__reset');
startButton.focus();
const qwerty = document.getElementById('qwerty');


startButton.addEventListener('click', (e) => {
    const game = new Game(document.querySelectorAll('.key'));
    game.startGame();
    game.keysElement.forEach(key => {
        key.addEventListener('click', game.handleInteraction);
    });
    qwerty.setAttribute('tabindex', '0');
    qwerty.focus();
    qwerty.removeEventListener('keyup', game.handleInteraction);
    qwerty.addEventListener('keyup', game.handleInteraction);
});

