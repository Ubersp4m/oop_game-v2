/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }
/*
    gets UL element and assigns innerHTML to list elements of letters for phrase
*/
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
        phraseUL.innerHTML = html;
    }

    /*
        checks to see if letter is included in the array of phrase characters
        returns true or false for letter found
    */
    checkLetter(letter){
        let found = false;
        letter = letter.toLowerCase();  
        const arrPhrase = this.phrase.split('');
        if(arrPhrase.includes(letter)){
            this.showMatchedLetter(letter);
            found=true;
        }
        return found;
    }

    /*
        sets show class and removes hide for list elements where phrase letter was found
    */
    showMatchedLetter(letter){
        const showLI = document.querySelectorAll(`#phrase > .${letter}`);
        for(const LI of showLI){
            LI.classList.add('show');
            LI.classList.remove('hide');
        }
    }

}