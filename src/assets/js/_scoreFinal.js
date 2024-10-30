import '../css/style.css'

/**
 * @type {HTMLElement}
 */
let finalScoreQuestionsHtml = document.querySelector('.finalScoreQuestionsHtml');

/**
 * @type {HTMLElement}
 */
let finalScorePercentageHtml = document.querySelector('.finalScoreHtml');

function finalScore() {
    /**
     * @type {number}
     */
    let finalNbQuestions = JSON.parse(localStorage.getItem('totalQuestions')) || 0;

    /**
     * @type {number}
     */
    let finalScore = JSON.parse(localStorage.getItem('finalScore')) || 0;

    /**
     * @type {string}
     */
    let finalScoreStarsHtml;
    
    if ((finalScore / finalNbQuestions) * 100 < 40) {
        finalScoreStarsHtml = '/img/icons/trois_etoiles_rouge.png';
    } else if ((finalScore / finalNbQuestions) * 100 >= 40 && (finalScore / finalNbQuestions) * 100 < 60) {
        finalScoreStarsHtml = '/img/icons/trois_etoiles_orange.png';
    } else {
        finalScoreStarsHtml = '/img/icons/trois_etoile_vert-jaune.png';
    }

    document.querySelector('.finalScoreStarsHtml').src = finalScoreStarsHtml;

    finalScoreQuestionsHtml.textContent = `${finalScore}/${finalNbQuestions}`;
    finalScorePercentageHtml.textContent = `${(finalScore / finalNbQuestions) * 100}%`;
}

finalScore();

/**
 * @type {HTMLElement}
 */
const playAgainHtml = document.querySelector('.playAgainHtml');

/**
 * @param {MouseEvent} e
 */
playAgainHtml.addEventListener('click', (e) => {
    e.preventDefault();

    /**
     * @type {boolean}
     */
    let itsContinueGame = false;

    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './_jeu.html';
});
