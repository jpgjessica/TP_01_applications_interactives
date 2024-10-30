import '../css/style.css'

let finalScoreQuestionsHtml = document.querySelector('.finalScoreQuestionsHtml');
let finalScorePercentageHtml = document.querySelector('.finalScoreHtml');

function finalScore() {
    let finalNbQuestions = JSON.parse(localStorage.getItem('totalQuestions')) || 0;
    let finalScore = JSON.parse(localStorage.getItem('finalScore')) || 0;

    let finalScoreStarsHtml;
    if ((finalScore / finalNbQuestions) * 100 < 40) {
        finalScoreStarsHtml = '/img/icons/trois_etoiles_rouge.png';
    } else if ((finalScore / finalNbQuestions) * 100 >= 40 && (finalScore / finalNbQuestions) * 100 < 60) {
        finalScoreStarsHtml = '/img/icons/trois_etoiles_orange.png';
    } else {
        finalScoreStarsHtml = '/img/icons/trois_etoile_vert-jaune.png';
    }
    document.querySelector('.finalScoreStarsHtml').src = finalScoreStarsHtml;


    finalScoreQuestionsHtml.textContent = finalScore + '/' + finalNbQuestions;
    finalScorePercentageHtml.textContent = (finalScore / finalNbQuestions) * 100 + '%';
};

finalScore()

const playAgainHtml = document.querySelector('.playAgainHtml');
playAgainHtml.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './_jeu.html';
})
