import '../css/style.css';

/**
 * @type {HTMLElement}
 */
const categoryDropdown = document.querySelector('.categoryHtml');
const toggleButton = document.querySelector('.toggleQuestionsHtml');
const numQuestionsDisplay = document.querySelector('.numQuestionsDisplayHtml');
const startConfig = document.querySelector('.startConfigHtml');
const difficulty = document.querySelector('.difficultyHtml');
const type = document.querySelector('.typeHtml');

/**
 * Récupère les catégories de questions depuis l'API et les ajoute au menu déroulant
 */
function fetchCategories() {
    fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => {
            let categories = data.trivia_categories;
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categoryDropdown.appendChild(option);
            });
        });
}

/**
 * Exécute les fonctions d'initialisation une fois le DOM chargé
 * Récupère les catégories et initialise le nombre de questions
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    let numQuestions = 10;

    const updateDisplay = () => {
        numQuestionsDisplay.textContent = numQuestions;
    };

    /**
     * Écouteur d'événement pour ajuster le nombre de questions
     * 
     * @param {MouseEvent} event - Événement de clic
     */
    toggleButton.addEventListener('click', (event) => {
        const clickY = event.offsetY;

        if (clickY < toggleButton.clientHeight / 2) {
            if (numQuestions < 50) {
                numQuestions += 1;
            }
        } else {
            if (numQuestions > 10) {
                numQuestions -= 1;
            }
        }
        updateDisplay();
    });

    updateDisplay();
});

/**
 * Écouteur d'événement pour le bouton de démarrage de configuration du jeu
 * Enregistre les configurations dans le localStorage et redirige vers la page du jeu
 * 
 * @param {Event} e - Événement de clic
 */
startConfig.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('NbOfQuestions', JSON.stringify(numQuestionsDisplay.textContent));
    localStorage.setItem('Categories', JSON.stringify(categoryDropdown.options[categoryDropdown.selectedIndex].value));
    localStorage.setItem('Difficulty', JSON.stringify(difficulty.options[difficulty.selectedIndex].value));
    localStorage.setItem('Type', JSON.stringify(type.options[type.selectedIndex].value));
    let itsContinueGame = false;
    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './_jeu.html';
});