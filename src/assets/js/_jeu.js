import '../css/style.css'
import etoilesRouge from '../img/icons/etoile_rouge.svg';
import etoilesVert from '../img/icons/etoile_vert-jaune.svg';
import etoilesOrange from '../img/icons/etoile_jaune.svg';

const questionHtml = document.querySelector('.question');
const optionsHtml = document.querySelector('.options');
const scoreCountHtml = document.querySelector('.countScore');
const questionCountHtml = document.querySelector('.questionCountHtml');
const minuteurHtml = document.querySelector('.minuteurHtml');
const pickItUpLaterHtml = document.querySelector('.pickItUpLaterHtml');
let currentQuestionIndex = 0;
let questions = [];
let scoreCount = 0;

function showQuestion(question) {
    questionCountHtml.textContent = currentQuestionIndex + 1 + '/' + questions.length;

    questionHtml.innerHTML = question.question;

    optionsHtml.innerHTML = '';
    const answers = question.incorrect_answers.concat(question.correct_answer);
    answers.sort(() => Math.random() - 0.5);

    let timer = initializeMinuteur();

    answers.forEach((answer, i) => {
        const button = document.createElement('button');
        button.innerHTML = (i + 1) + '. ' + answer;
        button.classList.add('animate__animated', 'animate__bounceIn', 'w-full', 'mb-2', 'p-2', 'md:px-3',
            'border-2', 'border-theme_01-noir', 'bg-theme_01-orange', 'text-theme_01-noir', 'font-normal',
            'text-xl', 'rounded-full', 'shadow-custom-black', 'md:shadow-none', 'flex', 'justify-start',
            'md:hover:shadow-custom-black', 'hover:bg-theme_01-orange_fonce');

        button.addEventListener('click', () => {
            clearInterval(timer);
            button.classList.remove('bg-theme_01-orange');
            if (answer === question.correct_answer) {
                scoreCount++;
                updateScore();
                button.classList.add('bg-theme_01-vert', 'hover:bg-theme_01-vert_fonce');
                disableButtons()
            } else {
                button.classList.add('bg-theme_01-rouge', 'hover:bg-theme_01-rouge_fonce');
                disableButtons()
            }
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion(questions[currentQuestionIndex]);
                } else {
                    button.classList.remove('bg-theme_01-vert', 'bg-theme_01-rouge');
                    button.classList.add('bg-theme_01-orange');
                    localStorage.setItem('finalScore', JSON.stringify(scoreCount));
                    window.location.href = './_scoreFinal.html';
                }
            }, 2000);
        });
        optionsHtml.appendChild(button);
    });
}

function fetchQuestions() {
    let nbQuestions = JSON.parse(localStorage.getItem('NbOfQuestions'));
    let categories = JSON.parse(localStorage.getItem('Categories'));
    let difficulty = JSON.parse(localStorage.getItem('Difficulty'));
    let type = JSON.parse(localStorage.getItem('Type'));
    let url = '';
    if (nbQuestions) {
        url = 'https://opentdb.com/api.php?amount=' + nbQuestions + '&category=' + categories + '&difficulty=' + difficulty + '&type=' + type
    }
    else {
        url = 'https://opentdb.com/api.php?amount=10';
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            questions = data.results;
            currentQuestionIndex = 0;
            localStorage.setItem('totalQuestions', JSON.stringify(questions.length));
            showQuestion(questions[currentQuestionIndex]);
        }).catch(error => {
            alert('Ohohh, il me semble que cette API ne fonctionne pas très bien quand on fait plusieurs requêtes');
        });
}

function updateScore() {
    scoreCountHtml.textContent = scoreCount;
    let percentage = (scoreCount / questions.length) * 100;

    let starImage;
    if (percentage < 40) {
        starImage = etoilesRouge;
    } else if (percentage >= 40 && percentage < 60) {
        starImage = etoilesOrange;
    } else {
        starImage = etoilesVert;
    }
    document.querySelector('.countScoreStar').src = starImage;
};

function disableButtons() {
    const allButtons = optionsHtml.querySelectorAll('button');
    allButtons.forEach(btn => {
        btn.setAttribute('disabled', true);
        if (!btn.classList.contains('bg-theme_01-vert') && !btn.classList.contains('bg-theme_01-rouge')) {
            btn.classList.remove('bg-theme_01-orange', 'shadow-custom-black', 'md:hover:shadow-custom-black', 'hover:bg-theme_01-orange_fonce');
            btn.classList.add('bg-theme_01-mauve_fonce');
        }
    });
}

function initializeMinuteur() {
    let sec = 30;
    minuteurHtml.innerHTML = '00:' + sec;
    let timer = setInterval(function () {
        sec--;
        minuteurHtml.innerHTML = '00:' + sec;
        if (sec < 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(questions[currentQuestionIndex]);
            } else {
                localStorage.setItem('finalScore', JSON.stringify(scoreCount));
                window.location.href = './_scoreFinal.html';
            }
        }
    }, 1000);
    return timer;
}

function pickItUpLater() {
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex));
    localStorage.setItem('scoreCount', JSON.stringify(scoreCount));
}

pickItUpLaterHtml.addEventListener('click', () => {
    pickItUpLater()
})

function startApp() {
    let itsContinueGame = JSON.parse(localStorage.getItem('continueGame'));
    if (itsContinueGame == true) {
        questions = JSON.parse(localStorage.getItem('questions'));
        currentQuestionIndex = JSON.parse(localStorage.getItem('currentQuestionIndex'));
        scoreCount = JSON.parse(localStorage.getItem('scoreCount'));
        showQuestion(questions[currentQuestionIndex]);
        updateScore();
    } else {
        fetchQuestions();
    }
}

startApp();