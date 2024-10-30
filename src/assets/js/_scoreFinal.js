import '../css/style.css'

let finalScoreQuestionsHtml = document.querySelector('.finalScoreQuestionsHtml');
let finalScorePercentageHtml = document.querySelector('.finalScoreHtml');
class Ranking {
    constructor(percentage, date) {
        this.percentage = percentage;
        this.date = date;
    }
}

function getFormatedDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return year + '-' + month + '-' + day;
}

function finalScore() {
    let finalNbQuestions = JSON.parse(localStorage.getItem('totalQuestions')) || 0;
    let finalScore = JSON.parse(localStorage.getItem('finalScore')) || 0;
    let finalScorePercentage = finalScore / finalNbQuestions * 100;
    let finalScoreStarsHtml;

    if (finalScorePercentage < 40) {
        finalScoreStarsHtml = '/img/icons/trois_etoiles_rouge.png';
    } else if (finalScorePercentage >= 40 && finalScorePercentage < 60) {
        finalScoreStarsHtml = '/img/icons/trois_etoiles_orange.png';
    } else {
        finalScoreStarsHtml = '/img/icons/trois_etoile_vert-jaune.png';
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
};

finalScore()

const playAgainHtml = document.querySelector('.playAgainHtml');
playAgainHtml.addEventListener('click', (e) => {
    e.preventDefault();
    let itsContinueGame = false;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './_jeu.html';
});