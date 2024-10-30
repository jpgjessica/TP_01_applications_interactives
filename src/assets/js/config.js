import '../css/style.css';
/**
 * @type {HTMLElement}
 */
const categoryDropdown = document.querySelector('.categoryHtml');

/**
 * @type {HTMLElement}
 */
const toggleButton = document.querySelector('.toggleQuestionsHtml');

/**
 * @type {HTMLElement}
 */
const numQuestionsDisplay = document.querySelector('.numQuestionsDisplayHtml');

/**
 * @type {HTMLElement}
 */
const startConfig = document.querySelector('.startConfigHtml');

/**
 * @type {HTMLElement}
 */
const difficulty = document.querySelector('.difficultyHtml');

/**
 * @type {HTMLElement}
 */
const type = document.querySelector('.typeHtml');

function fetchCategories() {
    fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => {
            /**
             * @type {Array<{id: number, name: string}>}
             */
            let categories = data.trivia_categories;

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categoryDropdown.appendChild(option);
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();

    /**
     * @type {number}
     */
    let numQuestions = 10;

    const updateDisplay = () => {
        numQuestionsDisplay.textContent = numQuestions;
    };

    /**
     * @param {MouseEvent} event
     */
    toggleButton.addEventListener('click', (event) => {
        /**
         * @type {number}
         */
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
 * @param {MouseEvent} e
 */
startConfig.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.setItem('NbOfQuestions', JSON.stringify(numQuestionsDisplay.textContent));
    localStorage.setItem('Categories', JSON.stringify(categoryDropdown.options[categoryDropdown.selectedIndex].value));
    localStorage.setItem('Difficulty', JSON.stringify(difficulty.options[difficulty.selectedIndex].value));
    localStorage.setItem('Type', JSON.stringify(type.options[type.selectedIndex].value));

    /**
     * @type {boolean}
     */
    let itsContinueGame = false;

    localStorage.setItem('continueGame', JSON.stringify(itsContinueGame));
    window.location.href = './_jeu.html';
});
