/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let startButton = document.getElementById('btn__reset');
startButton.focus();
const qwerty = document.getElementById('qwerty');

/*
    the event listener for startButton
    instantiates new Game with key elements
    adds eventListeners for all keys in .key class
    sets focus and tabindex on qwerty div for keyup events
*/
startButton.addEventListener('click', (e) => {
    const game = new Game(document.querySelectorAll('.key'));
    game.startGame();
    game.keysElement.forEach(key => {
        key.addEventListener('click', game.handleInteraction);
    });
    //qwerty.setAttribute('tabindex', '0');
    //qwerty.focus();
    document.removeEventListener('keyup', game.handleInteraction);
    document.addEventListener('keyup', game.handleInteraction);
});

