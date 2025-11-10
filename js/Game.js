/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    //receives .key class object from app.js as element in constructor to bind event listener instance 
    constructor(element){
        this.missed = 0;
        this.phrases = ["All clouds have souls", "The boat was like a pea floating in a great bowl of blue soup", "He embraced his new life as an eggplant", "Karen realized the only way she was getting into heaven was to cheat", "No my owl never paints"]
        this.activePhrase = null;
        this.keysElement = element;
        this.handleInteraction = this.handleInteraction.bind(this);   
    }
/*
    hides start screen
    sets phrase and instantiates Phrase class with random phrase
*/
    startGame(){
        let start = document.querySelector('.start');
        start.style.display = 'none';
        let phrase = this.getRandomPhrase().toLowerCase();
        this.activePhrase = new Phrase(phrase);
        console.log('the game phrase: '+this.activePhrase.phrase);
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase(){
        let randomNum = Math.floor(Math.random() * 4);
        return this.phrases[randomNum];
    }
    /*
        takes in event 'e' and checks for trigger element.
        if keyup converts the keyup toggle to a button for visual response

    */
    handleInteraction(e){
            if(e.target.tagName === 'BUTTON' && e.type === 'click') {
               var button = e.target;
            }
            else if (e.target.tagName==='DIV' && e.type === 'keyup'){
                let buttons = document.querySelectorAll(`.key`);
                buttons = [...buttons].filter(element => element.textContent.includes(e.key));
                var button = buttons[0];
            }
              //  console.log(button);
                let found = this.activePhrase.checkLetter(button.textContent.trim())
                if(found){
                    button.classList.add('chosen');
                    button.disabled = true;
                    let winlose = this.checkForWin();
                    if(winlose)this.gameOver(true);
                }
                else if(!found){
                    button.disabled=true;
                    button.classList.add('wrong');
                    this.removeLife();
                }
            

    }
    /*
        resets classes for keyboard and removes old event listener instances
    */
    resetKeyboard(){
        
        this.keysElement.forEach(key => {
        key.removeEventListener('click', this.handleInteraction);
         });
        
        const qwerty = document.getElementById('qwerty');
        qwerty.removeEventListener('keyup', this.handleInteraction);

        let resetChosen = document.querySelectorAll('.chosen');
        resetChosen.forEach(chosen => {
            chosen.classList.remove('chosen');
            chosen.disabled=false;
        });

        let resetWrong = document.querySelectorAll('.wrong');
        resetWrong  .forEach(wrong => {
            wrong.classList.remove('wrong');
            wrong.disabled=false;
        });
        
        let resetHeartIMG = document.querySelectorAll(`#scoreboard ol li img`);
        resetHeartIMG.forEach(img => {
            img.src='images/liveHeart.png';
        });

    }

    /*
        adds missed letter attempt to this and updates heart image with correct number of lives left
    */
    removeLife(){
        this.missed++;
        let removeHeartIMG = document.querySelector(`#scoreboard ol li:nth-child(${6-this.missed}) img`);
        removeHeartIMG.src='images/lostHeart.png';
        if(this.missed === 5){
            this.gameOver(false);
        }
    }

    /*
        -converts phrase to an array and checks DOM for hidden 
            character of the array letter class
        -keeps track of letters left to guess in lettersLeft[]
    */
    checkForWin(){
        let arrPhrase=this.activePhrase.phrase.split('');
        let win =false;
        const lettersLeft = [];
        for(let character of arrPhrase) {
            if(character!== ' '){
                let leftToGuess=document.querySelector(`.hide.letter.${character}`);
                if(leftToGuess !== null) lettersLeft.push(character);
            }
        }
        console.log('letters left ' + lettersLeft);
        if(lettersLeft.length===0){
            win = true;
        }
        return win;
    }
/*
    toggles appropriate overlay for win or lose, calls resetKeyboard and
    assigns focus to the start game button
*/
    gameOver(winlose){
        let overlay = document.getElementById('overlay');
        let winloseH1 = document.getElementById('game-over-message');
        if(winlose){
            let msg = `Congratulations you win!`;
            winloseH1.textContent = msg;
            overlay.classList.add('win');
            overlay.style.display = 'block';
            this.resetKeyboard();
            startButton.focus();

        }
        else{
            let msg = `Game Over! Try again!`;
            winloseH1.textContent = msg;
            overlay.classList.add('lose');
             overlay.style.display = 'block';
            this.resetKeyboard();
            startButton.focus();
        }
    }

}

