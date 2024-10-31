import '../css/style.css'
import troisEtoilesVerts from '../img/icons/trois_etoile_vert-jaune.png';
import troisEtoilesRouges from '../img/icons/trois_etoiles_rouge.png';
import troisEtoilesOranges from '../img/icons/trois_etoiles_orange.png';

/**
 * @type {HTMLElement}
 */
let finalScoreQuestionsHtml = document.querySelector('.finalScoreQuestionsHtml');
let finalScorePercentageHtml = document.querySelector('.finalScoreHtml');

/**
 * Classe représentant un classement basé sur le pourcentage et la date du score.
 */
class Ranking {
    /**
     * @param {number} percentage - Le pourcentage du score final.
     * @param {string} date - La date du score.
     */
    constructor(percentage, date) {
        this.percentage = percentage;
        this.date = date;
    }
}

/**
 * Formate la date actuelle.
 * @returns {string}
 */
function getFormatedDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return year + '-' + month + '-' + day;
}

/**
 * Calcule et affiche le score final, le pourcentage et les étoiles en fonction du résultat.
 * Met à jour le ranking des meilleurs scores et l'enregistre dans le localStorage.
 */
function finalScore() {
    let finalNbQuestions = JSON.parse(localStorage.getItem('totalQuestions')) || 0;
    let finalScore = JSON.parse(localStorage.getItem('finalScore')) || 0;
    let finalScorePercentage = finalScore / finalNbQuestions * 100;
    let finalScoreStarsHtml;

    if (finalScorePercentage < 40) {
        finalScoreStarsHtml = troisEtoilesRouges;
    } else if (finalScorePercentage >= 40 && finalScorePercentage < 60) {
        finalScoreStarsHtml = troisEtoilesOranges;
    } else {
        finalScoreStarsHtml = troisEtoilesVerts;
    }
    document.querySelector('.finalScoreStarsHtml').src = finalScoreStarsHtml;

    finalScoreQuestionsHtml.textContent = finalScore + '/' + finalNbQuestions;
    finalScorePercentageHtml.textContent = finalScorePercentage + '%';

    let bestRankings = JSON.parse(localStorage.getItem('bestsRankings')) || [];

    let newRanking = new Ranking(finalScorePercentage, getFormatedDate());
    bestRankings.push(newRanking);

    bestRankings.sort((r1, r2) => (r1.percentage < r2.percentage) ? 1 : (r1.percentage > r2.percentage) ? -1 : 0);
    localStorage.setItem('bestsRankings', JSON.stringify(bestRankings.slice(0, 10)));
    console.log(bestRankings);
}

finalScore()

/**
 * Élément HTML pour le bouton "Play again".
 * @type {HTMLElement}
 */
const playAgainHtml = document.querySelector('.playAgainHtml');

/**
 * Ajoute un événement de clic sur le bouton "Play again" pour réinitialiser la partie
 * et rediriger vers la page du jeu.
 */
playAgainHtml.addEventListener('click', (e) => {
    e.preventDefault();
    let itsContinueGame = false;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './_jeu.html';
});