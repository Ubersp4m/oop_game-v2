/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    constructor(){
        this.missed = 0;
        this.phrases = ["All clouds have souls", "The boat was like a pea floating in a great bowl of blue soup", "He embraced his new life as an eggplant", "Karen realized the only way she was getting into heaven was to cheat", "No my owl never paints"]
        this.activePhrase = null;
    }

    startGame(){
        let start = document.querySelector('.start');
        start.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        let gamePhrase = new Phrase(this.activePhrase);
        console.log('the game phrase: '+gamePhrase.phrase);
        gamePhrase.addPhraseToDisplay();
        this.resetKeyboard();
        return gamePhrase;
    }

    getRandomPhrase(){
        let randomNum = Math.floor(Math.random() * 4);
      //  console.log('the random number is: '+randomNum);
        return this.phrases[randomNum];
    }

    handleInteraction(gamePhrase){
        let keyboard = document.getElementById('qwerty');
        keyboard.addEventListener('click', (e) => {
            //console.log(e.target.tagName);
            if(e.target.tagName === 'BUTTON'){
                let button = e.target;
                //console.log(button);
                if(gamePhrase.checkLetter(button.textContent)){
                   console.log('button text content: '+button.textContent);
                    button.classList.add('chosen');
                    button.disabled = true;
                    let winlose = this.checkForWin();
                    if(winlose){
                        alert('Congratulations! You win!');
                        this.gameOver(true);
                    }
                }
                else{
                    console.log('entered wrong button');
                    button.disabled=true;
                    button.classList.add('wrong');
                    this.removeLife();
                }
            }
        });
    }

    resetKeyboard(){
        let resetChosen = document.querySelectorAll('.chosen');
        resetChosen.forEach(chosen => {
            chosen.classList.remove('chosen');
        });

        let resetWrong = document.querySelectorAll('.wrong');
        resetWrong.forEach(wrong => {
            wrong.classList.remove('wrong');
        });
        
        let resetHeartIMG = document.querySelectorAll(`#scoreboard ol li img`);
        resetHeartIMG.forEach(img => {
            img.src='images/liveHeart.png';
        });
    }

    removeLife(){
        this.missed++;
        let removeHeartIMG = document.querySelector(`#scoreboard ol li:nth-child(${6-this.missed}) img`);
        //console.log('missed attempts: '+this.missed);
        removeHeartIMG.src='images/lostHeart.png';
        if(this.missed === 5){
           // console.log('entered missed = 5');
            this.gameOver(false);
        }
    }

    checkForWin(){
        let arrPhrase=this.activePhrase.split('');
        let win =false;
        const lettersLeft = [];
        console.log('letters left ' + lettersLeft);
        for(let character of arrPhrase) {
            if(character!== ' '){
                //console.log('check for win character: '+character);
                let leftToGuess=document.querySelector(`.hide.letter.${character}`);
                //console.log('left to guess: '+leftToGuess)
                if(leftToGuess !== null) lettersLeft.push(character);
            }
        }
        console.log('letters left ' + lettersLeft);
        if(lettersLeft.length===0){
            console.log('entered lettersLeft win....');
            win = true;
        }
        return win;
    }

    gameOver(winlose){
        console.log('entered gameOver');
        let overlay = document.getElementById('overlay');
        let winloseH1 = document.getElementById('game-over-message');
        if(winlose){
            let msg = `Congratulations you win!`;
            winloseH1.textContent = msg;
            overlay.classList.add('win');
             overlay.style.display = 'block';
        }
        else{
            let msg = `Game Over! Try again!`;
            winloseH1.textContent = msg;
            overlay.classList.add('lose');
             overlay.style.display = 'block';
        }
    }

}

let startButton = document.getElementById('btn__reset');

startButton.addEventListener('click', (e) => {
    let game = new Game();
    const gamePhrase = game.startGame();
    game.handleInteraction(gamePhrase);
});