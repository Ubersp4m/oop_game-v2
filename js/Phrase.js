/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay(){
        const phraseUL = document.getElementById('phrase');
        let html = '';
        const arrPhrase = this.phrase.split('');
        arrPhrase.forEach(character => {
            if(character===' '){
                html += `<li class='space'>${character}</li>`;
            }
            else{
                html += `<li class='hide letter ${character}'>${character}</li>`;
            }
        });
        //console.log(html);
        phraseUL.innerHTML = html;
    }

    checkLetter(letter){
        let found = false;
        letter = letter.toLowerCase();
        const arrPhrase = this.phrase.split('');
        //console.log(character+' '+ index);
        if(arrPhrase.includes(letter)){
            this.showMatchedLetter(letter);
            found=true;
        }
        return found;
    }

    showMatchedLetter(letter){
        const showLI = document.querySelectorAll(`#phrase > .${letter}`);
        for(const LI of showLI){
            LI.classList.add('show');
            LI.classList.remove('hide');
        }
    }

}

const phrase = new Phrase('testing this out');
phrase.checkLetter('t');