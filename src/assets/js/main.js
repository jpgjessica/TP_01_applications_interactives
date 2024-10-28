import '../css/style.css'

// index.html JS

// Select the start button
const startButton = document.querySelector('.btn-start');

// Add event listener to redirect to jeu.html
if (startButton) {
    startButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior
        window.location.href = './assets/pages/_jeu.html'; // Redirect to jeu.html
    });
}

// _jeu.html JS

const questionHtml = document.querySelector('.question'); // Élément pour afficher la question
const optionsHtml = document.querySelector('.options'); // Élément pour afficher les options
let currentQuestionIndex = 0;
let questions = [];

// Fonction pour afficher une question et ses options
function showQuestion(question) {
    if (questionHtml) {
        questionHtml.textContent = question.question; // Affiche la question
    }

    if (optionsHtml) {
        optionsHtml.innerHTML = ''; // Réinitialise les options
        const answers = question.incorrect_answers.concat(question.correct_answer);
        answers.sort(() => Math.random() - 0.5); // Mélange les réponses

        answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('animate__animated', 'animate__bounceIn', 'w-full', 'mb-2', 'p-2', 'md:p-1', 
            'border-2', 'border-theme_01-noir', 'bg-theme_01-orange', 'text-theme_01-noir', 'font-normal', 
            'uppercase', 'text-xl', 'rounded-full', 'shadow-custom-black', 'md:shadow-none', 
            'md:hover:shadow-custom-black', 'hover:bg-theme_01-orange_fonce', 'active:bg-theme_01-orange_fonce', 
            'focus:bg-theme_01-orange_fonce');
            
            button.addEventListener('click', () => {
                // Vérifie si la réponse est correcte
                if (answer === question.correct_answer) {
                    alert('Correct!');
                } else {
                    alert('Wrong answer!');
                }
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion(questions[currentQuestionIndex]);
                } else {
                    alert('Quiz finished!');
                }
            });
            optionsHtml.appendChild(button);
        });
    }
}

// Fonction pour récupérer les questions depuis l'API
function fetchQuestions() {
    fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')
        .then(response => response.json())
        .then(data => {
            questions = data.results; // Stocke les questions récupérées
            currentQuestionIndex = 0;
            showQuestion(questions[currentQuestionIndex]); // Affiche la première question
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des questions:', error);
        });
}

// Démarrer le jeu en récupérant les questions lorsque la page est chargée
document.addEventListener('DOMContentLoaded', fetchQuestions);
